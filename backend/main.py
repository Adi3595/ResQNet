from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to ResQNet API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(incidents.router, prefix="/api/incidents", tags=["Incidents"])
app.include_router(resources.router, prefix="/api/resources", tags=["Resources"])

# Mount Socket.IO App
app.mount("/socket.io", socket_app)
