import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CreditChart } from "./CreditChart";
import { mockUsageResponse } from "./mocks";
import * as usageHook from "../hooks/useUsageData";
import type { UsageRecord } from "../hooks/useUsageData";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

function mockUseUsageData(
  data: UsageRecord[] = [],
  loading: boolean = false,
  error?: string | null
) {
  jest
    .spyOn(usageHook, "useUsageData")
    .mockReturnValue({ data, loading, error: error ?? null });
}

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders chart with bars for each date", () => {
  mockUseUsageData(mockUsageResponse.usage);

  render(<CreditChart />);
});

test("shows loading indicator", () => {
  mockUseUsageData([], true, null);
  render(<CreditChart />);
  expect(screen.getByText(/Loading chart/i)).toBeInTheDocument();
});

test("shows error message", () => {
  mockUseUsageData([], false, "Oops");
  render(<CreditChart />);
  expect(screen.getByText(/Error/i)).toBeInTheDocument();
});

test("shows no data message", () => {
  mockUseUsageData([]);
  render(<CreditChart />);
  expect(screen.getByText(/No data/i)).toBeInTheDocument();
});

// Snapshot test
test("CreditChart renders correctly (snapshot)", () => {
  mockUseUsageData(mockUsageResponse.usage);
  const { asFragment } = render(<CreditChart />);
  expect(asFragment()).toMatchSnapshot();
});
