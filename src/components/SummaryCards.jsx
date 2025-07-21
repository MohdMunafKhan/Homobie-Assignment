import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function SummaryCards({ results, compareCases }) {
    const [showEarlyClosure, setShowEarlyClosure] = useState(false);

    return (
        <div className="col-12">
            <div className="row g-3">
                <div className="col-6 col-md-3">
                    <div className="card glassmorphic-card">
                        <div className="card-body">
                            <h5>Total Interest Paid</h5>
                            <p>${results.loanData.totalInterest.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card glassmorphic-card">
                        <div className="card-body">
                            <h5>Total SIP Returns</h5>
                            <p>${results.sipData.totalValue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card glassmorphic-card">
                        <h5>Net Gain/Loss</h5>
                        <p>${(results.sipData.totalValue - results.loanData.totalInterest).toFixed(2)}</p>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card glassmorphic-card">
                        <h5>Early Closure</h5>
                        <button
                            className="btn btn-link"
                            onClick={() => setShowEarlyClosure(!showEarlyClosure)}
                        >
                            {showEarlyClosure ? 'Hide' : 'Show'}
                        </button>
                        {showEarlyClosure && <p>Months Saved: {calculateEarlyClosure(results)}</p>}
                    </div>
                </div>
                {compareCases.map((c, idx) => (
                    <div key={idx} className="col-12">
                        <div className="card glassmorphic-card">
                            <div className="card-body">
                                <h5>Compare {idx + 1} Summary</h5>
                                <p>Interest: ${c.loanData.totalInterest.toFixed(2)}</p>
                                <p>SIP: ${c.sipData.totalValue.toFixed(2)}</p>
                                <p>Net: ${(c.sipData.totalValue - c.loanData.totalInterest).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function calculateEarlyClosure(results) {
    // Simplified logic: assume SIP returns can offset loan balance
    const monthlySIP = results.sipData.data[0].value / 12; // Rough estimate
    const remainingBalance = results.loanData.data[results.loanData.data.length - 1].balance;
    return Math.ceil(remainingBalance / monthlySIP);
}

export default SummaryCards;