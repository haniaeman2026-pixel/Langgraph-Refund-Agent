
import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from pymongo import MongoClient, DESCENDING

load_dotenv()

_client = None


def get_collection():
    global _client

    uri = os.getenv("MONGODB_URI")

    if not uri:
        raise RuntimeError(
            "MONGODB_URI is missing from .env"
        )

    if _client is None:
        _client = MongoClient(
            uri,
            serverSelectionTimeoutMS=3000,
        )

    database_name = os.getenv(
        "MONGODB_DATABASE",
        "refund_agent",
    )

    return _client[database_name]["refund_requests"]


def save_refund_request(data: dict) -> dict:
    collection = get_collection()

    document = {
        **data,
        "created_at": datetime.now(timezone.utc),
    }

    result = collection.insert_one(document)

    return {
        "id": str(result.inserted_id),
        "message": "Refund request saved to MongoDB",
    }


def list_refund_requests(limit: int = 20) -> list:
    collection = get_collection()

    documents = collection.find().sort(
        "created_at", DESCENDING
    ).limit(limit)

    records = []

    for document in documents:
        document["_id"] = str(document["_id"])

        if document.get("created_at"):
            document["created_at"] = (
                document["created_at"].isoformat()
            )

        records.append(document)

    return records


def check_mongodb() -> bool:
    collection = get_collection()

    collection.database.client.admin.command("ping")

    return True
