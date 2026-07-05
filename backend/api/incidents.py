from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database.db import get_db
from database.models import Incident
from schemas import IncidentCreate, IncidentResponse
from auth.deps import get_current_user
# from core.celery_app import process_incident_task

router = APIRouter()

@router.post("/", response_model=IncidentResponse)
def create_incident(
    incident_in: IncidentCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    incident = Incident(**incident_in.dict())
    db.add(incident)
    db.commit()
    db.refresh(incident)
    
    # Trigger Celery Task to process the incident using Agents
    # process_incident_task.delay(incident.id)
    
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
