import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SIPTable({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="col-12">
            <button
                className="btn btn-outline-light w-100 mb-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {isOpen ? 'Hide' : 'Show'} SIP Growth Table
            </button>
            <div className={`collapse ${isOpen ? 'show' : ''}`}>
                <div className="card glassmorphic-card">
                    <div className="card-body">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.slice(0, 12).map((row) => (
                                    <tr key={row.month}>
                                        <td>{row.month}</td>
                                        <td>${row.value.toFixed(2)}</td>
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

export default SIPTable;