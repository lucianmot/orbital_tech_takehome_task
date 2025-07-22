from typing import Optional
from pydantic import BaseModel


class Message(BaseModel):
    id: int
    timestamp: str
    text: str
    report_id: Optional[int] = None


class Report(BaseModel):
    id: int
    name: str
    credit_cost: float
