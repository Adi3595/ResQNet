#!/bin/bash

# Start FastAPI server in the foreground
uvicorn main:app --host 0.0.0.0 --port 8000
