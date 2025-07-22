import pytest
from models.schemas import UsageResponse
from tests.mocks import mock_messages, mock_report_8806
from services.usage_service import get_usage
from _pytest.monkeypatch import MonkeyPatch


@pytest.mark.asyncio
async def test_usage_with_report(monkeypatch: MonkeyPatch):
    message_with_8806 = next(m for m in mock_messages if m.report_id == 8806)

    async def fake_fetch_messages():
        return [message_with_8806.model_dump()]

    async def fake_fetch_report(report_id: int):
        return mock_report_8806 if report_id == 8806 else None

    monkeypatch.setattr("services.usage_service.fetch_messages", fake_fetch_messages)
    monkeypatch.setattr("services.usage_service.fetch_report", fake_fetch_report)

    response = await get_usage()
    assert isinstance(response, UsageResponse)
    assert response.usage[0].report_name == mock_report_8806.name
    assert response.usage[0].credits_used == mock_report_8806.credit_cost


@pytest.mark.asyncio
async def test_usage_without_report(monkeypatch: MonkeyPatch):
    message_no_report = next(m for m in mock_messages if m.report_id is None)

    async def fake_fetch_messages():
        return [message_no_report.model_dump()]

    async def fake_fetch_report(report_id: int):
        assert False, "Should not be called"

    monkeypatch.setattr("services.usage_service.fetch_messages", fake_fetch_messages)
    monkeypatch.setattr("services.usage_service.fetch_report", fake_fetch_report)

    response = await get_usage()
    assert response.usage[0].report_name is None
