import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UsageTableRow } from "./UsageTableRow";
import { mockUsageResponse } from "./mocks";

test("renders all columns when report_name exists", () => {
  const rec = mockUsageResponse.usage[0];
  render(
    <table>
      <tbody>
        <UsageTableRow rec={rec} index={0} />
      </tbody>
    </table>
  );
  expect(screen.getByText(rec.message_id.toString())).toBeInTheDocument();
  expect(screen.getByText(rec.timestamp)).toBeInTheDocument();
  expect(screen.getByText(rec.report_name!)).toBeInTheDocument();
  expect(screen.getByText(rec.credits_used.toFixed(2))).toBeInTheDocument();
});

test("renders all columns when report_name is null", () => {
  const rec = mockUsageResponse.usage[1];
  render(
    <table>
      <tbody>
        <UsageTableRow rec={rec} index={1} />
      </tbody>
    </table>
  );
  expect(screen.getByText(rec.message_id.toString())).toBeInTheDocument();
  expect(screen.getByText(rec.timestamp)).toBeInTheDocument();
  expect(screen.getByText(rec.credits_used.toFixed(2))).toBeInTheDocument();
  const cells = screen.getAllByRole("cell");
  expect(cells[2]).toHaveTextContent("");
});
