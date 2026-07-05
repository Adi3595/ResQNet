#!/bin/bash

# Start Celery worker in the background
celery -A core.celery_app worker --loglevel=info &

# Start FastAPI server in the foreground
uvicorn main:app --host 0.0.0.0 --port 8000
