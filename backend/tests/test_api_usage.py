from fastapi.testclient import TestClient
from main import app
from models.schemas import UsageResponse

client = TestClient(app)


def test_usage_api_contract():
    response = client.get("/usage")
    assert response.status_code == 200
    usage_response = UsageResponse(**response.json())
    usage = usage_response.usage
    assert isinstance(usage, list)
    assert len(usage) > 0

    for record in usage:
        assert isinstance(record.message_id, int)
        assert isinstance(record.timestamp, str)
        assert isinstance(record.credits_used, float)
        if record.report_name is not None:
            assert isinstance(record.report_name, str)
            assert record.report_name.strip() != ""
        else:
            assert record.report_name is None

    ids = [rec.message_id for rec in usage]
    assert len(ids) == len(set(ids)), "Duplicate message_ids found!"
