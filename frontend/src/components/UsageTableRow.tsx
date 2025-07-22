import type { UsageRecord } from "../hooks/useUsageData";

export function UsageTableRow({
  rec,
  index,
}: {
  rec: UsageRecord;
  index: number;
}) {
  return (
    <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="p-3 border-b text-left">{rec.message_id}</td>
      <td className="p-3 border-b text-left">{rec.timestamp}</td>
      <td className="p-3 border-b text-left">{rec.report_name ?? ""}</td>
      <td className="p-3 border-b text-left">{rec.credits_used.toFixed(2)}</td>
    </tr>
  );
}
