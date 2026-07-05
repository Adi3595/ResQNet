from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = "Citizen"

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Incident Schemas
class IncidentCreate(BaseModel):
    title: str
    type: str
    severity: str
    latitude: float
    longitude: float
    description: Optional[str] = None

class IncidentResponse(IncidentCreate):
    id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

# Resource Schemas
class ResourceCreate(BaseModel):
    name: str
    type: str
    capacity: int
    current_load: int
    latitude: float
    longitude: float

class ResourceResponse(ResourceCreate):
    id: int
    class Config:
        from_attributes = True
