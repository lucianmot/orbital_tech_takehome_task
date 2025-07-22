> **See [`backend/README.md`](backend/README.md) for detailed backend setup, architecture, and developer proof screenshots.**

## 1. Installing Backend dependecies to run locally

Navigate to the backend directory:

```bash
cd backend
```

Create and activate your virtual environment (if you haven’t already):

```bash
python3 -m venv venv
source venv/bin/activate
```

Install all required dependencies:

```bash
pip install -r requirements.txt
```

---

## 2. Running the Backend Server

Use the provided script to activate your environment and start the FastAPI server:

```bash
./run-dev.sh
```

This will launch the API at [http://127.0.0.1:8000](http://127.0.0.1:8000).  
You can also access interactive docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---


# Orbital Tech Takehome Task

This repository contains my solution to the Orbital Copilot take-home assignment.  
**Orbital Copilot** is an AI assistant for Real Estate lawyers, designed to automate legal tasks in property transactions.  
Below you’ll find project context, data API information, requirements, and guidance on how to run and evaluate this solution.

---

## Context

Orbital Copilot enables users (e.g. real estate lawyers) to query and generate reports about legal documents.  
Usage is tracked and billed on a credit system, where each message or report consumes credits based on its estimated token usage (see API below).  
The goal is to accurately calculate, aggregate, and present this usage data in a dashboard UI.

---

## The Data

You have access to two public API endpoints (no authentication required):

1. **Get raw message data for the current billing period**
   - `GET https://owpublic.blob.core.windows.net/tech-task/messages/current-period`
   - Returns all messages sent to Orbital Copilot. Each message has:
     - `id`, `timestamp` (ISO), `text`, and optionally `report_id`.

2. **Get report name and cost by ID**
   - `GET https://owpublic.blob.core.windows.net/tech-task/reports/:id`
   - Returns `{ id, name, credit_cost }` for the given `report_id`.

---

## The Challenge

### Backend

- Implement a single API endpoint `/usage` (GET) that:
  - Returns all usage data in a strict JSON contract (see example in the JD).
  - Looks up report cost via `report_id` (if present); otherwise, calculates credits using
  - Only include the report name field if available.

### Frontend

- Build a dashboard UI (React) that:
  - Queries your backend `/usage` endpoint and displays results in a table.
  - Columns: Message ID, Timestamp, Report Name, Credits Used (formatted to 2 decimals).
  - Table supports sorting (ascending, descending, none) by Report Name and Credits Used.
  - Table is shareable (URL contains sorting state).
  - Above the table, show a bar chart: date on X axis, total credits used on Y axis.
  - Ensure the UI is clear, usable, and responsive.

---

## Implementation & Guidelines

- Please provide a README with clear instructions for running both backend and frontend, any setup steps, and any design/engineering decisions you made.
- Comment your code and document any tradeoffs or shortcuts due to time constraints.
- You may use any modern frameworks/libraries (Python, FastAPI, React, etc).
- Be prepared to discuss the code you implemented
- Try to spend no more than 3-4 hours on this exercise; you may leave partial implementations with TODOs if needed.

---

**Good luck! If you have any questions or would like to discuss tradeoffs, be ready to explain your choices in an interview session.**
