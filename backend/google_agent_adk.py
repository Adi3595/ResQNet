import os
import asyncio
from google import genai
from google.genai import types
from socket_server.server import broadcast_agent_update

class ResQNetAgent:
    def __init__(self, name: str, role: str, model: str = "gemini-2.5-flash"):
        self.name = name
        self.role = role
        self.model = model
        
        # Initialize client here to avoid global init issues if ENV varies
        api_key = os.getenv("GEMINI_API_KEY")
        self.client = genai.Client(api_key=api_key) if api_key else None

    async def execute(self, incident_id: int, context: str):
        if not self.client:
            await broadcast_agent_update(incident_id, self.name, "ERROR", "GEMINI_API_KEY not configured.")
            return "Error: API Key missing."

        await broadcast_agent_update(incident_id, self.name, "STARTED", f"Initializing {self.role} protocols...")
        await asyncio.sleep(1) # Visual pacing
        
        prompt = f"You are the {self.name} for ResQNet. Your role is: {self.role}.\n\nCurrent Context: {context}\n\nProvide a brief, tactical assessment (max 3 sentences) of the situation based on your specific role."
        
        await broadcast_agent_update(incident_id, self.name, "PROCESSING", "Analyzing neural telemetry...")
        
        try:
            # Run the blocking call in an executor
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None, 
                lambda: self.client.models.generate_content(
                    model=self.model, 
                    contents=prompt,
                    config=types.GenerateContentConfig(temperature=0.2)
                )
            )
            
            result = response.text
            await broadcast_agent_update(incident_id, self.name, "COMPLETED", result)
            return result
        except Exception as e:
            await broadcast_agent_update(incident_id, self.name, "ERROR", f"Agent failure: {str(e)}")
            return f"Error: {str(e)}"

class SwarmOrchestrator:
    def __init__(self):
        self.agents = [
            ResQNetAgent("CommanderAgent", "Coordinator. Parse the raw incident report and define the primary emergency zones and delegation instructions."),
            ResQNetAgent("SatelliteAgent", "Analyze satellite imagery for collapsed infrastructure."),
            ResQNetAgent("WeatherAgent", "Analyze weather patterns and predict storm paths."),
            ResQNetAgent("InfrastructureAgent", "Monitor grid stability, water systems, and comms."),
            ResQNetAgent("CommunicationAgent", "Detect SOS signals, process public communications, and filter noise."),
            ResQNetAgent("RoadAgent", "Detect blocked routes and generate evacuation paths."),
            ResQNetAgent("ShelterAgent", "Track shelter occupancy, food, and water."),
            ResQNetAgent("MedicalAgent", "Monitor hospital capacity, ambulances, and blood supply."),
            ResQNetAgent("VolunteerAgent", "Match civilian volunteers to safe, skill-based tasks."),
            ResQNetAgent("LogisticsAgent", "Predict shortages and coordinate supply chain for rescue equipment."),
            ResQNetAgent("DecisionIntelligenceAgent", "Synthesize all data into the final tactical dashboard output.")
        ]
        
    async def process_incident(self, incident_id: int, initial_context: str):
        # 1. Commander Agent processes raw report
        commander = next(a for a in self.agents if a.name == "CommanderAgent")
        cmd_result = await commander.execute(incident_id, f"Raw Incident Report:\n{initial_context}")
        
        base_context = f"Incident Report:\n{initial_context}\n\nCommander Delegation:\n{cmd_result}"
        
        # 2. Layer 1: Assessors
        layer_1 = ["SatelliteAgent", "WeatherAgent", "InfrastructureAgent", "CommunicationAgent"]
        l1_results = await asyncio.gather(*[a.execute(incident_id, base_context) for a in self.agents if a.name in layer_1])
        
        layer_1_context = base_context + "\n\nLayer 1 Findings:\n" + "\n".join(l1_results)
        
        # 3. Layer 2: Responders
        layer_2 = ["RoadAgent", "ShelterAgent", "MedicalAgent", "VolunteerAgent"]
        l2_results = await asyncio.gather(*[a.execute(incident_id, layer_1_context) for a in self.agents if a.name in layer_2])
        
        layer_2_context = layer_1_context + "\n\nLayer 2 Resource Needs:\n" + "\n".join(l2_results)
        
        # 4. Layer 3: Logistics
        logistics = next(a for a in self.agents if a.name == "LogisticsAgent")
        log_result = await logistics.execute(incident_id, layer_2_context)
        
        final_context = layer_2_context + "\n\nLogistics Plan:\n" + log_result
        
        # 5. Final Node: Decision Intelligence
        decision = next(a for a in self.agents if a.name == "DecisionIntelligenceAgent")
        dec_result = await decision.execute(incident_id, final_context)
        
        return dec_result
