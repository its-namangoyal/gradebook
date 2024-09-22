import React, { useState } from 'react';
import './DownloadsStyle.css';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const calculateFinalGrade = (examGrade, ratingGrade) => {
    return (0.6 * examGrade + 0.4 * ratingGrade).toFixed(2);
};

const getStatus = (finalGrade) => {
    return finalGrade > 4 ? 'Passed' : 'Failed';
};

const Downloads = (props) => {
    const [showDownload, setShowDownload] = useState(false);
    const sortedData = [...props.data].map((item) => ({
        ...item,
        finalGrade: calculateFinalGrade(item.exam_grade, item.rating_grade),
        status: getStatus(calculateFinalGrade(item.exam_grade, item.rating_grade)),
    })).sort((a, b) => a.finalGrade - b.finalGrade);

    const downloadCSV = () => {
        const header = ['Name', 'Ticket Number', 'Exam Grade', 'Rating Grade', 'Final Grade', 'Status'];
        const rows = sortedData.map((item) => [item.name, item.ticket_number, item.exam_grade, item.rating_grade, item.finalGrade, item.status]);
        let csv = header.join(',') + '\n';
        csv += rows.map((row) => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'student_data.csv');
    };

    const downloadJSON = () => {
        const json = JSON.stringify(sortedData);
        const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
        saveAs(blob, 'student_data.json');
    };

    const downloadPDF = () => {
        const header = ['Name', 'Ticket Number', 'Exam Grade', 'Rating Grade', 'Final Grade', 'Status'];
        const rows = sortedData.map((item) => [item.name, item.ticket_number, item.exam_grade, item.rating_grade, item.finalGrade, item.status]);
        const doc = new jsPDF();
        doc.text('Student Data', 10, 10);
        doc.autoTable({
            head: [header],
            body: rows,
        });
        doc.save('student_data.pdf');
    };

    return (
        <div>
            <button onClick={() => setShowDownload(true)}>Download</button>
            {showDownload && (
                <div className="card">
                    <button id="close-btn" onClick={() => setShowDownload(false)}>X</button>
                    <button onClick={downloadCSV}>Download CSV</button>
                    <button onClick={downloadJSON}>Download JSON</button>
                    <button onClick={downloadPDF}>Download PDF</button>
                </div>
            )}
        </div>
    );
};

export default Downloads;