from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

app = FastAPI(
    title="HAVEN OPS API",
    description="Backend API for the HAVEN OPS campus service controller",
    version="1.0.0",
)

# Development CORS configuration.
# Restrict this to your deployed frontend origin before production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "name": "HAVEN OPS",
        "message": "Backend is running",
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "haven-ops-backend",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }