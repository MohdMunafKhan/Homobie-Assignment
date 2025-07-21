import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AmortizationTable({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="col-12">
            <button
                className="btn btn-outline-light w-100 mb-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {isOpen ? 'Hide' : 'Show'} Amortization Table
            </button>
            <div className={`collapse ${isOpen ? 'show' : ''}`}>
                <div className="card glassmorphic-card">
                    <div className="card-body">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Balance</th>
                                    <th>Interest</th>
                                    <th>Principal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.slice(0, 12).map((row) => (
                                    <tr key={row.month}>
                                        <td>{row.month}</td>
                                        <td>${row.balance.toFixed(2)}</td>
                                        <td>${row.interest.toFixed(2)}</td>
                                        <td>${row.principal.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AmortizationTable;