import { useState } from 'react';

function InputForm({ onCalculate, onCompare }) {
    const [inputs, setInputs] = useState({
        loanAmount: 500000,
        interestRate: 7,
        tenure: 20,
        sipAmount: 1000,
        sipReturnRate: 10,
    });

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        if (inputs.loanAmount <= 0 || inputs.sipAmount <= 0) {
            alert('Loan and SIP amounts must be positive.');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        console.log('Calculate button clicked', inputs); // Debug log
        if (validateInputs()) {
            onCalculate(inputs); // Ensure this is called
        }
    };

    const handleCompareSubmit = () => {
        if (validateInputs()) onCompare(inputs);
    };

    return (
        <div className="card glassmorphic-card mb-4">
            <div className="card-body">
                <div className="row g-3">
                    {['loanAmount', 'interestRate', 'tenure', 'sipAmount', 'sipReturnRate'].map((field) => (
                        <div key={field} className="col-12">
                            <label htmlFor={field} className="form-label">
                                {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                <span
                                    className="ms-2"
                                    data-bs-toggle="tooltip"
                                    data-bs-title={field === 'loanAmount' ? 'Principal amount of the home loan' : `Annual ${field.replace('Rate', '')} rate in %`}
                                >
                                    ℹ️
                                </span>
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                id={field}
                                name={field}
                                min={field === 'loanAmount' ? 100000 : field === 'tenure' ? 5 : 1}
                                max={field === 'loanAmount' ? 1000000 : field === 'tenure' ? 30 : 15}
                                value={inputs[field]}
                                onChange={handleChange}
                                aria-label={field}
                            />
                            <div className="text-light">{field.includes('Amount') ? `$${inputs[field]}` : `${inputs[field]}%`}</div>
                        </div>
                    ))}
                    <div className="col-12">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary neumorphic-btn w-100 mb-2"
                            aria-label="Calculate financial outcomes"
                        >
                            Calculate
                        </button>
                        <button
                            onClick={handleCompareSubmit}
                            className="btn btn-outline-light w-100"
                            aria-label="Add to comparison"
                        >
                            Add to Compare
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputForm;