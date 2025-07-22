import logging
import time
from typing import Dict, List, Optional
from repositories.orbital_api_repository import fetch_messages, fetch_report
from models.models import Message, Report
from models.schemas import UsageRecord, UsageResponse
from utils.credit_calc import calculate_credits


logger = logging.getLogger(__name__)


async def get_usage() -> UsageResponse:
    """
    Fetch all messages for the current billing period, and for each message:
    - If it has a valid report_id and report is found, use the report's credit_cost and name.
    - If the report_id is missing or not found, calculate credits based on the message text.
    Return a UsageResponse with a list of UsageRecords matching the required contract.
    """
    logger.info("Starting usage aggregation")
    start_fetch = time.monotonic()
    messages = await fetch_messages()
    fetch_duration = time.monotonic() - start_fetch
    logger.info(f"Fetched {len(messages)} messages in {fetch_duration:.2f}s")
    usage: List[UsageRecord] = []
    report_cache: Dict[int, Optional[Report]] = {}

    for message_dict in messages:
        message = Message(**message_dict)
        if message.report_id is not None:
            if message.report_id not in report_cache:
                logger.debug(f"Fetching report for report_id {message.report_id}")
                report_cache[message.report_id] = await fetch_report(message.report_id)
            report = report_cache[message.report_id]
            if report:
                usage_record = UsageRecord(
                    message_id=message.id,
                    timestamp=message.timestamp,
                    report_name=report.name,
                    credits_used=float(report.credit_cost),
                )
                logger.info(
                    f"Message {message.id}: Used report '{report.name}', cost {float(report.credit_cost)}"
                )
            else:
                credits_used = calculate_credits(message.text)
                usage_record = UsageRecord(
                    message_id=message.id,
                    timestamp=message.timestamp,
                    credits_used=credits_used,
                )
                logger.warning(
                    f"Message {message.id}: Report {message.report_id} not found, calculated credits: {credits_used}"
                )
        else:
            credits_used = calculate_credits(message.text)
            usage_record = UsageRecord(
                message_id=message.id,
                timestamp=message.timestamp,
                credits_used=credits_used,
            )
            logger.info(
                f"Message {message.id}: No report_id, calculated credits: {credits_used}"
            )
        usage.append(usage_record)
    logger.info(f"Usage calculation finished for {len(usage)} messages")
    return UsageResponse(usage=usage)
