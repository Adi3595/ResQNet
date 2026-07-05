from google_agent_adk import Agent, Task, Team
from agents.core import weather_agent, medical_agent, road_agent, shelter_agent, decision_agent

commander_agent = Agent(
    name="CommanderAgent",
    role="Command Center Coordinator",
    goal="Coordinate specialized agents to resolve disaster incidents.",
    backstory="Veteran disaster response commander.",
    tools=[]
)

def run_multi_agent_workflow(incident_data: dict, callback=None):
    """
    Executes the multi-agent workflow for a given incident.
    The callback can be used to send WebSockets updates.
    """
    if callback:
        callback("CommanderAgent", "STARTED", f"Received incident: {incident_data['title']}")

    # Create Tasks
    weather_task = Task(
        description=f"Analyze weather risk for {incident_data['location']}.",
        agent=weather_agent
    )
    
    medical_task = Task(
        description=f"Check hospital capacity near {incident_data['location']} for {incident_data['severity']} casualties.",
        agent=medical_agent
    )
    
    logistics_task = Task(
        description=f"Check road blocks and route ambulances to {incident_data['location']}.",
        agent=road_agent
    )
    
    shelter_task = Task(
        description=f"Prepare shelters near {incident_data['location']}.",
        agent=shelter_agent
    )
    
    decision_task = Task(
        description="Synthesize the reports from weather, medical, logistics, and shelter into a final emergency plan. Then notify contacts.",
        agent=decision_agent,
        context=[weather_task, medical_task, logistics_task, shelter_task]
    )

    # Form the team
    response_team = Team(
        agents=[commander_agent, weather_agent, medical_agent, road_agent, shelter_agent, decision_agent],
        tasks=[weather_task, medical_task, logistics_task, shelter_task, decision_task]
    )

    # In a real environment with ADK, we would execute this async.
    # For simulation, we run it and simulate output.
    if callback:
        callback("CommanderAgent", "PROCESSING", "Delegating tasks to Weather, Medical, Logistics, and Shelter agents.")
    
    # Mocking execution delay and result
    final_plan = {
        "priority_level": incident_data["severity"],
        "recommended_actions": [
            "Dispatch 5 ambulances avoiding major blocked roads.",
            "Prepare 500 beds at nearest shelter.",
            "Alert hospitals for incoming casualties."
        ]
    }
    
    if callback:
        callback("DecisionIntelligenceAgent", "COMPLETED", "Final plan generated and emergency contacts notified.")
        
    return final_plan
