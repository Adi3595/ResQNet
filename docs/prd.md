# Product Requirements Document (PRD)

## 1. Project Overview
**Name:** ResQNet – Multi-Agent Disaster Response Command Center
**Purpose:** Provide a fully functional AI-powered emergency response platform to coordinate rescue operations during disasters such as earthquakes, floods, hurricanes, wildfires, landslides, and tsunamis.
**Target Audience:** Emergency Response Operators, Volunteer Coordinators, Medical Dispatchers, Administrators.
**Hackathon:** Kaggle Google Agents Hackathon.

## 2. Core Objectives
- Implement a 12-agent Google ADK system.
- Provide a modern, intuitive Command Center Dashboard with map-based visualizations.
- Enable a Simulation Mode to emulate disaster scenarios.
- Support real-time communication between agents and the dashboard via WebSockets.
- Deliver an architecturally sound, secure, and easily deployable codebase (Dockerized).

## 3. Features & Requirements

### 3.1 AI Agents (Google ADK)
The platform must implement the following 12 specialized agents, communicating via a shared memory/message bus (e.g., Redis/Celery):
1. **Commander Agent:** Coordinates and delegates tasks, resolves conflicts, and aggregates the final strategy.
2. **Satellite Agent:** Analyzes satellite images (Gemini Vision) to detect floods, fires, collapsed buildings, and damage.
3. **Weather Agent:** Uses external weather MCP to predict risks (flood, rain, storm, etc.).
4. **Infrastructure Agent:** Analyzes power grids, cell towers, water, and gas lines.
5. **Road Agent:** Calculates routes, blocked roads, and evacuation paths.
6. **Shelter Agent:** Monitors shelter capacity and resources.
7. **Medical Agent:** Tracks hospitals, ICU beds, ambulances, and blood/medicine supply.
8. **Volunteer Agent:** Matches volunteers by skills, optimizes routing.
9. **Supply Chain Agent:** Predicts and monitors shortages (food, medicine, fuel, water).
10. **Social Media Agent:** Monitors emergency reports, detects SOS, filters spam.
11. **Risk Prediction Agent:** Predicts disaster spread (fire, flood, disease).
12. **Decision Intelligence Agent:** Produces the final prioritized emergency plan.

### 3.2 Dashboard UI
- **Landing Page:** Hero section, animated world map, live incident ticker, stats.
- **Command Center:** Sidebar, Interactive Map (Leaflet/MapLibre), Mission Queue, Agent Status, Notifications, Settings, Dark Mode.
- **Map Overlays:** Incident locations, hospitals, shelters, blocked roads, heatmaps.

### 3.3 Simulation Mode
- Emulate Earthquake, Flood, Cyclone, Wildfire, Landslide, Tsunami.
- Adjustable parameters: Magnitude, Location, Population, Time, Weather.
- Real-time display of agents collaborating to resolve the simulation.

### 3.4 MCP Servers
- Provide contextual data integration for agents: Weather, Maps, Hospitals, Shelters, Traffic, Satellite, Email, SMS, Database, Filesystem.

### 3.5 Security & Backend
- **Auth:** JWT authentication, RBAC (Admin, Operator, Volunteer, Doctor).
- **Backend Framework:** FastAPI (Python).
- **Database:** PostgreSQL (Incidents, Users, Resources, Logs).
- **Cache/Queue:** Redis and Celery.
- **Live Updates:** WebSockets.

## 4. Non-Functional Requirements
- **Performance:** Sub-second dashboard rendering, real-time WebSocket latency <200ms.
- **Deployability:** Single command deployment via `docker-compose up`.
- **Quality:** High test coverage (Unit, Integration, E2E), Linting, CI/CD pipeline.
