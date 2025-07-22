#!/bin/bash

# Activate virtual environment if not already activated
if [[ "$VIRTUAL_ENV" == "" ]]; then
  echo "Activating virtual environment..."
  source venv/bin/activate
fi

echo "Running black (formatting check)..."
black .

echo "Running mypy (type check)..."
mypy .

echo "Running pytest (unit tests)..."
pytest

echo "All checks completed!"