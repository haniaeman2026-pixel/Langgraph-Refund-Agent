
import os
import uuid
from pathlib import Path
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import Command

from database import seed_db
from graph import build_graph
from schemas import CustomerRequest, ReviewRequest

load_dotenv()

# Project paths
BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
INDEX_FILE = STATIC_DIR / "index.html"


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not os.getenv("GROQ_API_KEY"):
        raise RuntimeError(
            "GROQ_API_KEY is missing. Add it to your .env file."
        )

    seed_db()
    app.state.graph = build_graph(InMemorySaver())

    yield


app = FastAPI(
    title="LangGraph Refund Agent",
    description="AI-powered customer support and refund workflow",
    version="1.0.0",
    lifespan=lifespan,
)


# Serve frontend files such as CSS, JavaScript and images
if STATIC_DIR.is_dir():
    app.mount(
        "/static",
        StaticFiles(directory=str(STATIC_DIR)),
        name="static",
    )


# Home endpoint: show the dashboard UI
@app.get("/", include_in_schema=False)
def home():
    if INDEX_FILE.is_file():
        return FileResponse(INDEX_FILE)

    return {
        "message": "Welcome to LangGraph Refund Agent",
        "status": "running",
        "docs": "/docs",
        "setup": (
            "Create a static/index.html file to display your dashboard UI."
        ),
    }


# Health endpoint
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "LangGraph Refund Agent",
    }


# Shared response formatter
def format_result(graph, thread_id, result):
    config = {"configurable": {"thread_id": thread_id}}
    snapshot = graph.get_state(config)

    interrupts = [
        item.value for item in result.get("__interrupt__", ())
    ]

    return {
        "thread_id": thread_id,
        "status": (
            "awaiting_approval" if interrupts else "completed"
        ),
        "interrupts": interrupts,
        "decision": snapshot.values.get("decision"),
        "response": (
            None
            if interrupts
            else snapshot.values.get("response")
        ),
    }


# Submit a new customer support request
@app.post("/support")
def support(body: CustomerRequest):
    graph = app.state.graph

    config = {
        "configurable": {
            "thread_id": body.thread_id
        }
    }

    existing = graph.get_state(config)

    if existing.values:
        raise HTTPException(
            status_code=409,
            detail=(
                "Thread already exists. "
                "Use a new thread_id for a new request."
            ),
        )

    result = graph.invoke(
        {
            "message": body.message,
            "request_id": str(uuid.uuid4()),
        },
        config=config,
    )

    return format_result(graph, body.thread_id, result)


# Approve or reject a pending human review
@app.post("/review/{thread_id}")
def review(thread_id: str, body: ReviewRequest):
    graph = app.state.graph

    config = {
        "configurable": {
            "thread_id": thread_id
        }
    }

    snapshot = graph.get_state(config)

    if (
        not snapshot.next
        or "human_review" not in snapshot.next
    ):
        raise HTTPException(
            status_code=409,
            detail="No pending human review for this thread.",
        )

    result = graph.invoke(
        Command(resume={"approved": body.approved}),
        config=config,
    )

    return format_result(graph, thread_id, result)
