#!/bin/bash

# Activate venv if not already activated
if [[ "$VIRTUAL_ENV" == "" ]]; then
  echo "Activating virtual environment..."
  source venv/bin/activate
fi

# Run the FastAPI app with uvicorn (with hot reload)
echo "Starting FastAPI development server on http://127.0.0.1:8000 ..."
uvicorn main:app --reload