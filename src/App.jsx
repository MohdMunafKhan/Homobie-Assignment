import { useState } from 'react';
import InputForm from './components/InputForm';
import LoanGraph from './components/LoanGraph';
import SIPGraph from './components/SIPGraph';
import NetPositionGraph from './components/NetPositionGraph';
import SummaryCards from './components/SummaryCards';
import AmortizationTable from './components/AmortizationTable';
import SIPTable from './components/SIPTable';
import ExportOptions from './components/ExportOptions';
import DarkModeToggle from './components/DarkModeToggle';
import { calculateLoan, calculateSIP, calculateNetPosition } from './utils/calculations';
import './index.css';

function App() {
  const [results, setResults] = useState(null);
  const [compareCases, setCompareCases] = useState([]);

  const handleCalculate = (inputs) => {
    console.log('Calculating with inputs:', inputs);
    const loanData = calculateLoan(inputs);
    const sipData = calculateSIP(inputs);
    const netPosition = calculateNetPosition(loanData, sipData);
    console.log('Calculated results:', { loanData, sipData, netPosition });
    setResults({ loanData, sipData, netPosition });
    setCompareCases([{ ...inputs, loanData, sipData, netPosition }]);
  };

  const handleCompare = (newInputs) => {
    const loanData = calculateLoan(newInputs);
    const sipData = calculateSIP(newInputs);
    const netPosition = calculateNetPosition(loanData, sipData);
    setCompareCases([...compareCases, { ...newInputs, loanData, sipData, netPosition }]);
  };

  return (
    <div className="bg-dark text-light min-vh-100" data-bs-theme="dark">
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container">
          <h1 className="navbar-brand">SIP + Home Loan Calculator</h1>
          <DarkModeToggle />
        </div>
      </nav>
      <div className="container my-4">
        <InputForm onCalculate={handleCalculate} onCompare={handleCompare} />
        {results && (
          <div className="row g-3">
            <LoanGraph data={results.loanData} compareData={compareCases.map(c => c.loanData)} />
            <SIPGraph data={results.sipData} compareData={compareCases.map(c => c.sipData)} />
            <NetPositionGraph data={results.netPosition} compareData={compareCases.map(c => c.netPosition)} />
            <SummaryCards results={results} compareCases={compareCases} />
            <AmortizationTable data={results.loanData.data} />
            <SIPTable data={results.sipData.data} />
            <ExportOptions results={results} compareCases={compareCases} />
            {console.log('Rendering results:', results)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;