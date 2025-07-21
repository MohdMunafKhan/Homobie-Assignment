import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function LoanGraph({ data, compareData }) {
    const combinedData = data.data.map((d, i) => ({
        ...d,
        ...compareData.reduce((acc, c, idx) => ({ ...acc, [`compare${idx + 1}`]: c.data[i]?.balance }), {}),
    }));

    return (
        <div className="col-12 col-md-6">
            <div className="card glassmorphic-card">
                <div className="card-body">
                    <h2 className="card-title h5">Loan Repayment Journey</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={combinedData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="balance" stroke="#26A69A" name="Base Balance" />
                            {compareData.map((_, idx) => (
                                <Line key={idx} type="monotone" dataKey={`compare${idx + 1}`} stroke={`#${['EF5350', 'FFCA28', 'AB47BC'][idx]}`} name={`Compare ${idx + 1}`} />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default LoanGraph;