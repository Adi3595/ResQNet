# System Architecture

## 1. High-Level Architecture

ResQNet is structured as a monorepo containing multiple microservices, orchestrated via Docker Compose. The architecture is designed for scalability, real-time updates, and asynchronous multi-agent processing.

### Components:
- **Frontend (React + Vite):** The user interface providing the Dashboard, Map, and Simulation controls.
- **Backend (FastAPI):** The core REST API and WebSocket server.
- **Agent Workers (Celery + Google ADK):** Background workers running the AI agents.
- **Message Broker & Cache (Redis):** Handles Celery task queues, WebSocket pub/sub, and agent shared memory.
- **Database (PostgreSQL):** Persistent storage for users, incidents, resources, and logs.
- **MCP Servers:** Context providers interfacing with external APIs (Weather, Maps, etc.).

## 2. Data Flow

1. **User Interaction:** A user triggers a simulation or real-time incident via the Frontend.
2. **API Request:** The request is sent to the FastAPI Backend.
3. **Task Delegation:** FastAPI creates an Incident record in PostgreSQL and dispatches an asynchronous task to Celery via Redis.
4. **Agent Processing:** 
   - The **Commander Agent** (running in a Celery worker) picks up the task.
   - It delegates sub-tasks to specialized agents (Weather, Road, Medical, etc.).
   - Agents query **MCP Servers** for real-time context and use the **Gemini API** for reasoning.
5. **Real-time Feedback:** As agents process information, they publish status updates to Redis Pub/Sub.
6. **WebSocket Delivery:** The FastAPI server listens to Redis Pub/Sub and streams updates to the Frontend via WebSockets.
7. **Final Plan:** The Decision Intelligence Agent finalizes the response plan, saves it to PostgreSQL, and pushes the final state to the client.

## 3. Technology Stack
- **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Leaflet, Socket.io-client.
- **Backend:** Python 3.11+, FastAPI, SQLAlchemy, Alembic, Pydantic, python-socketio.
- **Agents:** Google ADK, Google Gemini API, Celery.
- **Infra:** Docker, Docker Compose, PostgreSQL, Redis, GitHub Actions.

## 4. Database Schema (High-Level)
- **Users:** id, email, password_hash, role (Admin, Operator, etc.).
- **Incidents:** id, type (Earthquake, Flood, etc.), location, severity, status, created_at.
- **Resources:** id, type (Hospital, Shelter, Ambulance), location, capacity, current_load.
- **Missions:** id, incident_id, assigned_agents, status, plan_details.
- **Logs:** id, agent_name, action, timestamp.

## 5. Security & Authentication
- All API routes (except login/register) are protected by JWT.
- Role-Based Access Control (RBAC) ensures operators can only trigger simulations, and admins can manage users.
- Secrets (API Keys, DB Credentials) are loaded via `.env` files and never committed to version control.
