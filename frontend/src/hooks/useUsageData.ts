import { useEffect, useState } from "react";

const USAGE_API_URL = "http://127.0.0.1:8000/usage";

export type UsageRecord = {
  message_id: number;
  timestamp: string;
  report_name?: string | null;
  credits_used: number;
};

export function useUsageData() {
  const [data, setData] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(USAGE_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json.usage);
        setError(null);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
