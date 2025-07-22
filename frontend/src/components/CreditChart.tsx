import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { type UsageRecord, useUsageData } from "../hooks/useUsageData";

function groupCreditsByDate(
  data: UsageRecord[]
): { date: string; credits: number }[] {
  const dateMap: Record<string, number> = {};
  data.forEach((rec) => {
    const date = rec.timestamp.split("T")[0];
    if (!dateMap[date]) dateMap[date] = 0;
    dateMap[date] += rec.credits_used;
  });

  return Object.entries(dateMap).map(([date, credits]) => ({
    date,
    credits: Number(credits.toFixed(2)),
  }));
}

export function CreditChart() {
  const { data, loading, error } = useUsageData();

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data || !data.length) return <div>No data</div>;

  const chartData = groupCreditsByDate(data);

  return (
    <div
      className="w-full h-64 bg-gray-100 rounded mb-8 p-4"
      data-testid="credit-chart-container"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            label={{
              value: "Credits Used",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Bar dataKey="credits" fill="#d27b17ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
