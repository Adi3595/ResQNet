import json
import random

# Mock Tools for MCP Servers

def get_weather(location: str) -> str:
    """Returns weather information for a given location."""
    weathers = ["Sunny", "Rain", "Thunderstorm", "Cloudy", "Snow"]
    temp = random.randint(-10, 40)
    risk = "High" if temp > 35 or temp < 0 else "Low"
    return json.dumps({
        "location": location,
        "condition": random.choice(weathers),
        "temperature": f"{temp}°C",
        "risk_level": risk
    })

def get_hospital_capacity(location: str) -> str:
    """Returns capacity of nearby hospitals."""
    capacity = random.randint(10, 100)
    return json.dumps({
        "location": location,
        "hospitals_available": 3,
        "total_beds_available": capacity,
        "icu_beds": max(0, capacity - 50)
    })

def get_traffic_status(location: str) -> str:
    """Returns road blocks and traffic status."""
    blocked = random.choice([True, False])
    return json.dumps({
        "location": location,
        "major_roads_blocked": blocked,
        "estimated_delay": "45 mins" if blocked else "5 mins"
    })

def get_shelter_capacity(location: str) -> str:
    """Returns available shelter beds."""
    capacity = random.randint(100, 1000)
    return json.dumps({
        "location": location,
        "shelters_open": 5,
        "beds_available": capacity
    })

def notify_emergency_contacts(message: str) -> str:
    """Sends SMS/Email to emergency contacts."""
    return json.dumps({
        "status": "success",
        "message_sent": message,
        "recipients_reached": random.randint(1000, 5000)
    })
