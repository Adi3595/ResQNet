import socketio

# Create a Socket.IO server
# async_mode='asgi' is needed for FastAPI
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')

# Wrap with ASGI application
socket_app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def join_incident_room(sid, incident_id):
    room = f"incident_{incident_id}"
    sio.enter_room(sid, room)
    print(f"Client {sid} joined room {room}")
    await sio.emit("room_joined", {"room": room}, to=sid)

async def broadcast_agent_update(incident_id: int, agent_name: str, status: str, details: str):
    """
    Called by Celery tasks or main API to broadcast agent reasoning to the frontend.
    """
    room = f"incident_{incident_id}"
    await sio.emit("agent_update", {
        "agent": agent_name,
        "status": status,
        "details": details
    }, room=room)
