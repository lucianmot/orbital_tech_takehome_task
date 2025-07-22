from typing import List, Dict
from models.models import Report, Message

mock_messages: List[Message] = [
    Message(
        text="How are property taxes handled?",
        timestamp="2024-05-01T14:17:28.020Z",
        id=1043,
    ),
    Message(
        text="Please list all the specific maintenance responsibilities that fall on the tenant as per the lease agreement.",
        timestamp="2024-05-01T15:06:29.597Z",
        id=1044,
    ),
    Message(
        text="Can you generate a Retail Lease Report for the quarterly review?",
        timestamp="2024-05-01T15:58:04.287Z",
        report_id=3952,
        id=1045,
    ),
    Message(
        text="Please generate a Maintenance Responsibilities Report.",
        timestamp="2024-05-01T16:25:37.311Z",
        report_id=8806,
        id=1046,
    ),
    Message(
        text="What is the process for requesting repairs?",
        timestamp="2024-05-01T18:47:14.227Z",
        id=1047,
    ),
    Message(
        text="Explain the circumstances and process for the tenant to sublease the property to another party.",
        timestamp="2024-05-01T20:55:40.301Z",
        id=1048,
    ),
    Message(
        text="Are there any clauses related to health and safety?",
        timestamp="2024-05-01T21:31:23.772Z",
        id=1049,
    ),
]

messages_api_response: Dict[str, List[Message]] = {"messages": mock_messages}

mock_report_8806: Report = Report(
    id=8806, name="Maintenance Responsibilities Report", credit_cost=94
)

mock_report_3952: Report = Report(id=3952, name="Retail Lease Report", credit_cost=52)
