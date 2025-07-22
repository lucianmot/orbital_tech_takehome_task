from fastapi import APIRouter
from services.usage_service import get_usage
from models.schemas import UsageResponse

router = APIRouter()


@router.get("/usage", response_model=UsageResponse)
async def usage_endpoint():
    return await get_usage()
