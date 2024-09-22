import React, { useEffect, useRef } from 'react';
import StudentData from '../../StudentData';
import Chart from 'chart.js/auto';

const calculateFinalGrade = (examGrade, ratingGrade) => {
  return 0.6 * examGrade + 0.4 * ratingGrade;
};

const getStatus = (finalGrade) => {
  return finalGrade > 4 ? 'Passed' : 'Failed';
};

const studentsWithGradeAndStatus = StudentData.map((student) => {
  const finalGrade = calculateFinalGrade(student.exam_grade, student.rating_grade);
  const status = getStatus(finalGrade);
  return {
    ...student,
    final_grade: finalGrade,
    status: status,
  };
});

const allStudents = studentsWithGradeAndStatus.length;
const passedStudents = studentsWithGradeAndStatus.filter((student) => student.status === 'Passed').length;
const failedStudents = allStudents - passedStudents;

const Result = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['All Students', 'Passed Students', 'Failed Students'],
        datasets: [
          {
            label: 'Number of Students',
            data: [allStudents, passedStudents, failedStudents],
            backgroundColor: ['rgba(2,48,71,1.00)', 'rgba(72,159,206,1.00)', 'rgba(142,202,230,1.00)'],
            borderColor: ['rgba(2,48,71,1.00)', 'rgba(72,159,206,1.00)', 'rgba(142,202,230,1.00)'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div style={{ width: '400px', height: '380px' }}>
      <h2>Result</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Result;