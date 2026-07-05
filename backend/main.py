import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.middleware.base import BaseHTTPMiddleware
from database import models
from database.db import engine
from api import auth, incidents, resources
from socket_server.server import socket_app

# Create database tables (using Alembic is preferred in prod, but this is a fallback)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ResQNet API",
    description="Multi-Agent Disaster Response Command Center API",
    version="1.0.0"
)

# --- SECURITY: Rate Limiting ---
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# --- SECURITY: Custom Security Headers ---
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = "default-src 'self'; connect-src 'self' *;"
        return response

app.add_middleware(SecurityHeadersMiddleware)

# --- SECURITY: Audit Logging Middleware ---
import logging
logger = logging.getLogger("audit_logger")
logger.setLevel(logging.INFO)

class AuditLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Log the incoming request details for auditing
        logger.info(f"AUDIT LOG: User IP {request.client.host} accessed {request.method} {request.url.path}")
        response = await call_next(request)
        logger.info(f"AUDIT LOG: Response status {response.status_code} for {request.url.path}")
        return response

app.add_middleware(AuditLoggingMiddleware)

# --- SECURITY: Strict CORS Configuration ---
# Allow specific origins in production, fallback to generic for dev
allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,https://resqnet.vercel.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
@limiter.limit("10/minute")
def read_root(request: Request):
    return {"message": "Welcome to ResQNet API"}

@app.get("/health")
@limiter.limit("60/minute")
def health_check(request: Request):
    return {"status": "healthy"}

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(incidents.router, prefix="/api/incidents", tags=["Incidents"])
app.include_router(resources.router, prefix="/api/resources", tags=["Resources"])

# Mount Socket.IO App
app.mount("/socket.io", socket_app)
