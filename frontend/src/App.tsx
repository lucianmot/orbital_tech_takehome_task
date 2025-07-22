import { UsageTable } from "./components/UsageTable";
import { CreditChart } from "./components/CreditChart";

function App() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Usage Dashboard</h1>
      <div className="mb-8">
        <CreditChart />
      </div>
      <UsageTable />
    </div>
  );
}

export default App;
