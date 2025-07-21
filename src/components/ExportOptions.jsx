import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExportOptions({ results, compareCases }) {
    const handleExportPDF = () => {
        const input = document.getElementById('export-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('sip-loan-report.pdf');
        });
    };

    const handleShareLink = () => {
        const params = new URLSearchParams({
            loan: results.loanData.loanAmount,
            rate: results.loanData.interestRate,
            tenure: results.loanData.tenure,
            sip: results.sipData.sipAmount,
            sipRate: results.sipData.sipReturnRate,
        }).toString();
        prompt('Share this link:', `${window.location.origin}?${params}`);
    };

    return (
        <div className="col-12" id="export-content">
            <div className="card glassmorphic-card">
                <div className="card-body">
                    <button className="btn btn-outline-light me-2" onClick={handleExportPDF}>
                        Download PDF
                    </button>
                    <button className="btn btn-outline-light" onClick={handleShareLink}>
                        Share Link
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExportOptions;