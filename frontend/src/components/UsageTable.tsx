import { useUsageData } from "../hooks/useUsageData";
import { UsageTableRow } from "./UsageTableRow";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type SortColumn = "report_name" | "credits_used" | null;
type SortDir = "asc" | "desc" | null;

export function UsageTable() {
  const { data, loading, error } = useUsageData();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSortBy = (searchParams.get("sortBy") as SortColumn) || null;
  const urlSortDir = (searchParams.get("sortDir") as SortDir) || null;

  const [sortBy, setSortBy] = useState<SortColumn>(urlSortBy);
  const [sortDir, setSortDir] = useState<SortDir>(urlSortDir);

  useEffect(() => {
    if (sortBy && sortDir) {
      setSearchParams({ sortBy, sortDir });
    } else {
      setSearchParams({});
    }
    // eslint-disable-next-line
  }, [sortBy, sortDir]);

  function getSortedData() {
    if (!data) return [];
    if (!sortBy || !sortDir) return data;
    const sorted = [...data].sort((a, b) => {
      if (sortBy === "credits_used") {
        return sortDir === "asc"
          ? a.credits_used - b.credits_used
          : b.credits_used - a.credits_used;
      }
      if (sortBy === "report_name") {
        const aVal = a.report_name || "";
        const bVal = b.report_name || "";
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });
    return sorted;
  }

  const toggleSort = (col: SortColumn) => {
    if (sortBy !== col) {
      setSortBy(col);
      setSortDir("asc");
    } else {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortBy(null);
        setSortDir(null);
      } else setSortDir("asc");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-auto max-h-[35rem] border rounded">
      <table className="min-w-full text-sm border-collapse">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            <th className="p-3 font-semibold border-b text-left">Message ID</th>
            <th className="p-3 font-semibold border-b text-left">Timestamp</th>
            <th
              className="p-3 font-semibold border-b text-left cursor-pointer select-none"
              onClick={() => toggleSort("report_name")}
            >
              Report Name{" "}
              <span
                className={
                  "inline-block ml-1 transition-colors " +
                  (sortBy === "report_name" ? "text-gray-800" : "text-gray-500")
                }
              >
                {sortBy === "report_name"
                  ? sortDir === "asc"
                    ? "▲"
                    : sortDir === "desc"
                      ? "▼"
                      : "⇅"
                  : "⇅"}
              </span>
            </th>
            <th
              className="p-3 font-semibold border-b text-left cursor-pointer select-none"
              onClick={() => toggleSort("credits_used")}
            >
              Credits Used{" "}
              <span
                className={
                  "inline-block ml-1 transition-colors " +
                  (sortBy === "credits_used"
                    ? "text-gray-800"
                    : "text-gray-500")
                }
              >
                {sortBy === "credits_used"
                  ? sortDir === "asc"
                    ? "▲"
                    : sortDir === "desc"
                      ? "▼"
                      : "⇅"
                  : "⇅"}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {getSortedData().map((rec, i) => (
            <UsageTableRow key={rec.message_id} rec={rec} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
