from fastapi import FastAPI
from api.usage import router as usage_router
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 FastAPI app is running at http://127.0.0.1:8000")
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(usage_router)