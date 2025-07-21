export function calculateLoan({ loanAmount, interestRate, tenure }) {
    console.log('Calculating loan with:', { loanAmount, interestRate, tenure }); // Debug log
    const monthlyRate = interestRate / 1200;
    const months = tenure * 12;
    if (monthlyRate === 0) return { monthlyPayment: 0, data: [], totalInterest: 0, loanAmount, interestRate, tenure };
    const monthlyPayment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    const data = [];
    let balance = loanAmount;

    for (let i = 0; i < months; i++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        balance -= principal;
        data.push({ month: i + 1, balance, interest, principal });
    }

    return { monthlyPayment, data, totalInterest: data.reduce((sum, d) => sum + d.interest, 0), loanAmount, interestRate, tenure };
}

export function calculateSIP({ sipAmount, sipReturnRate, tenure }) {
    console.log('Calculating SIP with:', { sipAmount, sipReturnRate, tenure }); // Debug log
    const monthlyRate = sipReturnRate / 1200;
    const months = tenure * 12;
    let totalValue = 0;
    const data = [];

    for (let i = 0; i < months; i++) {
        totalValue = (totalValue + sipAmount) * (1 + monthlyRate);
        data.push({ month: i + 1, value: totalValue });
    }

    return { totalValue, data, sipAmount, sipReturnRate, tenure };
}

export function calculateNetPosition(loanData, sipData) {
    console.log('Calculating net position with:', { loanData, sipData }); // Debug log
    const data = loanData.data.map((loan, i) => ({
        month: loan.month,
        net: sipData.data[i]?.value - loan.balance || 0,
    }));
    return data;
}