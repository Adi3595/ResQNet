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

def sync_broadcast(incident_id, agent_name, status, details):
    pass

@celery_app.task
def process_incident_task(incident_id: int):
    print(f"Starting to process incident {incident_id}")
    return {"status": "completed", "plan": {}}
