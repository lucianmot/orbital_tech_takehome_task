import type { UsageRecord } from "../hooks/useUsageData";

export const mockUsageResponse: { usage: UsageRecord[] } = {
  usage: [
    {
      message_id: 1000,
      timestamp: "2024-04-29T02:08:29.375Z",
      report_name: "Tenant Obligations Report",
      credits_used: 79.0,
    },
    {
      message_id: 1001,
      timestamp: "2024-04-29T03:25:03.613Z",
      report_name: null,
      credits_used: 5.5,
    },
    {
      message_id: 1002,
      timestamp: "2024-04-29T07:27:34.985Z",
      report_name: null,
      credits_used: 3.65,
    },
    {
      message_id: 1003,
      timestamp: "2024-04-29T10:22:13.926Z",
      report_name: null,
      credits_used: 2.9,
    },
    {
      message_id: 1004,
      timestamp: "2024-04-29T11:54:18.493Z",
      report_name: null,
      credits_used: 3.4,
    },
    {
      message_id: 1005,
      timestamp: "2024-04-29T12:31:00.539Z",
      report_name: "Tenant Obligations Report",
      credits_used: 79.0,
    },
    {
      message_id: 1006,
      timestamp: "2024-04-29T12:57:04.853Z",
      report_name: null,
      credits_used: 9.35,
    },
    {
      message_id: 1007,
      timestamp: "2024-04-29T13:43:23.382Z",
      report_name: null,
      credits_used: 5.5,
    },
    {
      message_id: 1008,
      timestamp: "2024-04-29T14:33:22.741Z",
      report_name: null,
      credits_used: 3.45,
    },
    {
      message_id: 1009,
      timestamp: "2024-04-29T16:02:31.649Z",
      report_name: "Maintenance Responsibilities Report",
      credits_used: 94.0,
    },
  ],
};
