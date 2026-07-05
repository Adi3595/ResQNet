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
        
        prompt = f"You are the {self.name} for ResQNet. Your role is: {self.role}.\n\nCurrent Incident Context: {context}\n\nProvide a brief, tactical assessment (max 3 sentences) of the situation based on your specific role."
        
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
            ResQNetAgent("WeatherAgent", "Analyze weather patterns and predict storm paths."),
            ResQNetAgent("SatelliteAgent", "Analyze satellite imagery for collapsed infrastructure."),
            ResQNetAgent("InfrastructureAgent", "Monitor grid stability, water systems, and comms."),
            ResQNetAgent("RoadAgent", "Detect blocked routes and generate evacuation paths."),
            ResQNetAgent("MedicalAgent", "Monitor hospital capacity, ambulances, and blood supply."),
            ResQNetAgent("ShelterAgent", "Track shelter occupancy, food, and water."),
            ResQNetAgent("SupplyChainAgent", "Predict shortages and coordinate rescue equipment."),
            ResQNetAgent("VolunteerAgent", "Match civilian volunteers to safe, skill-based tasks."),
            ResQNetAgent("SocialMediaAgent", "Detect SOS signals from public feeds and filter noise."),
            ResQNetAgent("RiskPredictionAgent", "Predict secondary disasters like landslides or disease."),
            ResQNetAgent("CommanderAgent", "Synthesize all agent reports into a final rescue strategy."),
            ResQNetAgent("DecisionIntelligenceAgent", "Allocate final resources based on commander strategy.")
        ]
        
    async def process_incident(self, incident_id: int, initial_context: str):
        # We process in logical waves to build context
        wave_1_context = initial_context
        
        # Wave 1: Data Gatherers
        gatherers = ["WeatherAgent", "SatelliteAgent", "SocialMediaAgent"]
        gather_results = await asyncio.gather(*[a.execute(incident_id, wave_1_context) for a in self.agents if a.name in gatherers])
        
        # Wave 2: Analysts
        wave_2_context = initial_context + "\nData Gathered:\n" + "\n".join(gather_results)
        analysts = ["InfrastructureAgent", "RoadAgent", "RiskPredictionAgent"]
        analyst_results = await asyncio.gather(*[a.execute(incident_id, wave_2_context) for a in self.agents if a.name in analysts])
        
        # Wave 3: Resource Managers
        wave_3_context = wave_2_context + "\nAnalysis:\n" + "\n".join(analyst_results)
        managers = ["MedicalAgent", "ShelterAgent", "SupplyChainAgent", "VolunteerAgent"]
        manager_results = await asyncio.gather(*[a.execute(incident_id, wave_3_context) for a in self.agents if a.name in managers])
        
        # Wave 4: Command and Decision
        final_context = wave_3_context + "\nResource Status:\n" + "\n".join(manager_results)
        
        commander = next(a for a in self.agents if a.name == "CommanderAgent")
        cmd_result = await commander.execute(incident_id, final_context)
        
        decision = next(a for a in self.agents if a.name == "DecisionIntelligenceAgent")
        dec_result = await decision.execute(incident_id, cmd_result)
        
        return dec_result
