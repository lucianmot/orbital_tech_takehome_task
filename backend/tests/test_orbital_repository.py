import pytest
from tests.mocks import mock_messages
from models.models import Message


@pytest.mark.parametrize("msg", mock_messages)
def test_mock_message_fields(msg: Message):
    assert isinstance(msg.id, int)
    assert isinstance(msg.timestamp, str) and msg.timestamp
    assert isinstance(msg.text, str) and msg.text
    if msg.report_id is not None:
        assert isinstance(msg.report_id, int)


def test_mock_message_ids_unique():
    ids = [msg.id for msg in mock_messages]
    assert len(ids) == len(set(ids)), "Mock message IDs should be unique"
