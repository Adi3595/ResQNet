from google_agent_adk import Agent, Tool, Task
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from mcp.tools import get_weather, get_hospital_capacity, get_traffic_status, get_shelter_capacity, notify_emergency_contacts
from database.db import SessionLocal
from database.models import Incident
import json

# Define Tools
weather_tool = Tool(name="Weather", func=get_weather, description="Get weather for a location")
hospital_tool = Tool(name="HospitalCapacity", func=get_hospital_capacity, description="Get hospital bed capacity")
traffic_tool = Tool(name="Traffic", func=get_traffic_status, description="Get road conditions and traffic")
shelter_tool = Tool(name="ShelterCapacity", func=get_shelter_capacity, description="Get shelter capacity")
notify_tool = Tool(name="Notify", func=notify_emergency_contacts, description="Notify emergency contacts")

# Define Specialized Agents
weather_agent = Agent(
    name="WeatherAgent",
    role="Weather and Risk Predictor",
    goal="Predict weather risks and lightning/flood danger for an area.",
    backstory="Expert meteorologist analyzing storm patterns.",
    tools=[weather_tool]
)

medical_agent = Agent(
    name="MedicalAgent",
    role="Medical Coordinator",
    goal="Ensure hospitals have capacity for casualties.",
    backstory="Senior medical officer handling hospital beds and triage.",
    tools=[hospital_tool]
)

road_agent = Agent(
    name="RoadAgent",
    role="Logistics and Routing Specialist",
    goal="Calculate fastest routes avoiding blocked roads.",
    backstory="Traffic engineer with real-time access to city maps.",
    tools=[traffic_tool]
)

shelter_agent = Agent(
    name="ShelterAgent",
    role="Evacuation Coordinator",
    goal="Find available shelters for displaced citizens.",
    backstory="Emergency management shelter coordinator.",
    tools=[shelter_tool]
)

decision_agent = Agent(
    name="DecisionIntelligenceAgent",
    role="Final Plan Generator",
    goal="Synthesize all reports into a priority ranking and timeline.",
    backstory="Strategic operations leader.",
    tools=[notify_tool]
)
