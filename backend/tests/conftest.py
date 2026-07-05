import pytest
from fastapi.testclient import TestClient
import os
import sys

# Add the parent directory to sys.path so we can import the backend package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import app

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c
