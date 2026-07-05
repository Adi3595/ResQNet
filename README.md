# 🌍 ResQNet – Google ADK Multi-Agent Disaster Response Command Center

<div align="center">
  <img src="https://img.shields.io/badge/Status-Live_Prototype-brightgreen" alt="Status Active" />
  <img src="https://img.shields.io/badge/Python-3.11-blue?logo=python" alt="Python 3.11" />
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?logo=google" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Render-Deployed-000000?logo=render" alt="Render" />
</div>

<br />

> **ResQNet** is a fully functional, autonomous AI-powered emergency response platform built for the **Kaggle Google Agents Hackathon**. It uses a highly-optimized 12-Agent Neural Swarm to coordinate rescue operations, route ambulances, track weather, and dispatch notifications in real-time.

---

<details open>
<summary><b>✨ View Swarm Architecture Diagram</b></summary>
<br/>

```mermaid
graph TD
    User([Dashboard Operator]) --> |HTTPS / WSS| Frontend[React + Vite Command Center]
    Frontend --> |REST / Socket.io| Backend[FastAPI Backend]
    
    Backend --> |asyncio Task Queue| Commander[Commander Agent]
    
    subgraph 🧠 Google Gemini AI Swarm
        Commander --> Layer1[Assessors: Satellite, Weather, Infrastructure, Social Media, Risk]
        Layer1 --> Layer2[Responders: Road, Shelter, Medical, Volunteer]
        Layer2 --> Layer3[Logistics: Supply Chain]
        Layer3 --> Decision[Final Node: Decision Intelligence]
    end
    
    Layer1 --> MCP[Live Real-World APIs]
    Layer2 --> MCP
    
    subgraph 🌍 MCP Real-World Data Integrations
        MCP -.-> |Live Weather| OpenMeteo[Open-Meteo API]
        MCP -.-> |Live Routing| OSRM[OSRM Driving Routes]
        MCP -.-> |Terrain/Flood Risk| Altimetry[Open-Meteo Elevation]
        MCP -.-> |Historical Database| ReliefWeb[UN ReliefWeb API]
        MCP -.-> |Push Notifications| NTFY[ntfy.sh Webhooks]
    end
```
</details>

<details open>
<summary><b>🚀 Why ResQNet is Unique (Core Features)</b></summary>
<br/>

- 🧠 **12-Agent Waterfall Delegation:** Unlike chat-bots, ResQNet runs 12 highly specialized Gemini Agents autonomously in an `asyncio` parallel waterfall. The *Assessors* gather intelligence, the *Responders* build the rescue plan, and the *Logistics* agent secures the supply chain without stepping on each other's toes.
- 🌍 **100% Live Real-World Data (No Mocks!):** Through Google's Native Function Calling (MCP logic), the agents dynamically connect to Live HTTP APIs. When a hurricane strikes, the agents fetch *actual* windspeeds from **Open-Meteo**, route ambulances using live **OSRM**, and research historical precedents using the **United Nations ReliefWeb API**.
- ⚡ **Blazing Fast Architecture:** We ripped out heavy message brokers (like Celery) in favor of FastAPI's native background tasks to ensure the 12-agent swarm can execute and stream live websocket updates instantly on free-tier infrastructure.
- 📱 **Real-Time Push Notifications:** The Communications Agent executes real HTTP POST requests to `ntfy.sh` to send live push notifications directly to civilians (and hackathon judges!)
- 🎨 **NASA Command Center UI:** A stunning, CRT-scanline infused dark-mode dashboard built in React that tracks the "Decision Pathway" of the swarm in real-time.
</details>

---

## 💻 Try the Live Prototype!

**Frontend Dashboard**: [https://res-q-net-phi.vercel.app](https://res-q-net-phi.vercel.app)

1. Open the Dashboard link above.
2. Click the glowing red **SIMULATE DISASTER** button in the top right corner.
3. Keep your eyes on the **Decision Pathway** terminal on the right. You will see the 12 AI Agents wake up in parallel, connect to real-world APIs, and formulate a tactical rescue plan live on screen!
4. Check out [ntfy.sh/resqnet_alerts](https://ntfy.sh/resqnet_alerts) to see the live push notifications dispatched by the AI!

---

<details>
<summary><b>🤖 The 12-Agent Roster</b></summary>
<br/>

| Agent Name | Role & Responsibility | Live API Integration |
|---|---|---|
| **Commander Agent** | 🎯 Parses the raw incident report and delegates tasks. | None (Coordinator) |
| **Weather Agent** | 🌪️ Analyzes storm patterns and predicts danger. | `api.open-meteo.com/v1/forecast` |
| **Satellite Agent** | 🛰️ Calculates flood risk based on terrain height. | `api.open-meteo.com/v1/elevation` |
| **Road Agent** | 🛣️ Maps evacuation routes avoiding blocked roads. | `router.project-osrm.org` |
| **Decision Agent** | 🧠 Synthesizes all data and dispatches push alerts. | `ntfy.sh/resqnet_alerts` |
| *(And 7 more...)* | Infrastructure, Social Media, Shelter, Medical, etc. | UN ReliefWeb |
</details>

---
<p align="center">Built with ❤️ for the Kaggle Google Agents Hackathon.</p>
