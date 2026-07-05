from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database.db import get_db
from database.models import Resource
from schemas import ResourceCreate, ResourceResponse

router = APIRouter()

@router.post("/", response_model=ResourceResponse)
def create_resource(
    resource_in: ResourceCreate, 
    db: Session = Depends(get_db)
):
    resource = Resource(**resource_in.dict())
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

@router.get("/", response_model=List[ResourceResponse])
def get_resources(
    skip: int = 0, limit: int = 100, 
    db: Session = Depends(get_db)
):
    resources = db.query(Resource).offset(skip).limit(limit).all()
    return resources
