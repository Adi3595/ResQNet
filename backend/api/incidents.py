from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from database.db import get_db
from database.models import Incident
from schemas import IncidentCreate, IncidentResponse
from auth.deps import get_current_user
from google_agent_adk import SwarmOrchestrator
import asyncio

router = APIRouter()

def run_swarm_in_background(incident_id: int, description: str):
    # This runs in a background thread, so we create a new event loop for the async orchestrator
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    orchestrator = SwarmOrchestrator()
    loop.run_until_complete(orchestrator.process_incident(incident_id, description))
    loop.close()

@router.post("/", response_model=IncidentResponse)
def create_incident(
    incident_in: IncidentCreate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    incident = Incident(**incident_in.dict())
    db.add(incident)
    db.commit()
    db.refresh(incident)
    
    # Trigger the Multi-Agent Swarm Orchestrator
    background_tasks.add_task(
        run_swarm_in_background, 
        incident.id, 
        f"{incident.type} at Lat: {incident.latitude}, Lng: {incident.longitude}. Severity: {incident.severity}. Details: {incident.description}"
    )
    
    return incident

@router.get("/", response_model=List[IncidentResponse])
def get_incidents(
    skip: int = 0, limit: int = 100, 
    db: Session = Depends(get_db)
):
    incidents = db.query(Incident).offset(skip).limit(limit).all()
    return incidents

@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident(
    incident_id: int, 
    db: Session = Depends(get_db)
):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident
