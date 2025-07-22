import httpx
from typing import List, Dict, Any, Optional
from models.models import Report

MESSAGES_URL = (
    "https://owpublic.blob.core.windows.net/tech-task/messages/current-period"
)
BASE_REPORT_URL = "https://owpublic.blob.core.windows.net/tech-task/reports/"


async def fetch_messages() -> List[Dict[str, Any]]:
    async with httpx.AsyncClient() as client:
        resp = await client.get(MESSAGES_URL)
        resp.raise_for_status()
        data = resp.json()
        return data.get("messages", [])


async def fetch_report(report_id: int) -> Optional[Report]:
    url = f"{BASE_REPORT_URL}{report_id}"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        if resp.status_code == 200:
            data = resp.json()
            return Report(**data)
        elif resp.status_code == 404:
            return None
        else:
            resp.raise_for_status()
    return None
