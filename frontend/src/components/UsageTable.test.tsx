import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UsageTable } from "./UsageTable";
import { mockUsageResponse } from "./mocks";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockUsageResponse),
    })
  ) as jest.Mock;
});

test("renders table headers", async () => {
  render(
    <MemoryRouter>
      <UsageTable />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Message ID/i)).toBeInTheDocument();
  expect(await screen.findByText(/Timestamp/i)).toBeInTheDocument();
  expect(await screen.findByText(/Report Name/i)).toBeInTheDocument();
  expect(await screen.findByText(/Credits Used/i)).toBeInTheDocument();
});

test("renders table with mock data", async () => {
  render(
    <MemoryRouter>
      <UsageTable />
    </MemoryRouter>
  );
  const reportCells = await screen.findAllByText("Tenant Obligations Report");
  expect(reportCells.length).toBe(2);

  const creditsCells = await screen.findAllByText("79.00");
  expect(creditsCells.length).toBe(2);

  const creditsCells2 = await screen.findAllByText("5.50");
  expect(creditsCells2.length).toBeGreaterThan(0);
});

test("sorts rows by report name when header is clicked", async () => {
  render(
    <MemoryRouter>
      <UsageTable />
    </MemoryRouter>
  );
  await screen.findByText(/Message ID/i);

  const reportNameHeader = screen.getByText(/Report Name/i);
  await userEvent.click(reportNameHeader);

  const allRows = screen.getAllByRole("row").slice(1);
  const firstNonEmptyReportRow = allRows.find((row) =>
    row.textContent?.includes("Maintenance Responsibilities Report")
  );
  expect(firstNonEmptyReportRow).toBeDefined();

  await userEvent.click(reportNameHeader);
  const allRowsDesc = screen.getAllByRole("row").slice(1);
  const firstWithTenant = allRowsDesc.find((row) =>
    row.textContent?.includes("Tenant Obligations Report")
  );
  expect(firstWithTenant).toBeDefined();

  await userEvent.click(reportNameHeader);
});

test("sort state is reflected in URL", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <UsageTable />
    </Router>
  );

  await screen.findByText(/Report Name/i);

  const reportNameHeader = screen.getByText(/Report Name/i);
  await userEvent.click(reportNameHeader);

  expect(history.location.search).toMatch(/sortBy=report_name/);
  expect(history.location.search).toMatch(/sortDir=asc/);

  await userEvent.click(reportNameHeader);
  expect(history.location.search).toMatch(/sortDir=desc/);
});

test("table reads sort state from initial URL", async () => {
  render(
    <MemoryRouter initialEntries={["/?sortBy=credits_used&sortDir=desc"]}>
      <UsageTable />
    </MemoryRouter>
  );

  await screen.findByText(/Message ID/i);

  const allRows = screen.getAllByRole("row").slice(1);

  expect(allRows[0]).toHaveTextContent("94.00");
});
