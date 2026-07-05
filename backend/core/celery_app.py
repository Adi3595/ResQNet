import os
from celery import Celery

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")

celery_app = Celery(
    "resqnet",
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

import asyncio
from socket_server.server import broadcast_agent_update
import sys
import os

# To allow imports from agents package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from agents.commander import run_multi_agent_workflow

def sync_broadcast(incident_id, agent_name, status, details):
    # This is a hack for Celery to call async websocket broadcast
    # In a real production app, we would use Redis pub/sub directly
    # from celery and have the ASGI server consume it.
    pass

@celery_app.task
def process_incident_task(incident_id: int):
    print(f"Starting to process incident {incident_id}")
    
    incident_data = {
        "id": incident_id,
        "title": f"Incident #{incident_id}",
        "location": "City Center",
        "severity": "High"
    }
    
    def agent_callback(agent, status, details):
        print(f"[{agent}] {status}: {details}")
        # Here we would publish to Redis for WebSockets to pick up
        
    final_plan = run_multi_agent_workflow(incident_data, callback=agent_callback)
    return {"status": "completed", "plan": final_plan}
