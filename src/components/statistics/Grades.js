import React, { useEffect, useRef } from 'react';
import StudentData from '../../StudentData';
import Chart from 'chart.js/auto';

const calculateFinalGrade = (examGrade, ratingGrade) => {
  return 0.6 * examGrade + 0.4 * ratingGrade;
};

const Grades = () => {
  const chartCanvasRef = useRef(null);

  useEffect(() => {
    const examGrades = [];
    const ratingGrades = [];
    const finalGrades = [];

    StudentData.forEach((student) => {
      examGrades.push(student.exam_grade);
      ratingGrades.push(student.rating_grade);
      finalGrades.push(calculateFinalGrade(student.exam_grade, student.rating_grade));
    });

    const minExamGrade = Math.min(...examGrades);
    const maxExamGrade = Math.max(...examGrades);
    const minRatingGrade = Math.min(...ratingGrades);
    const maxRatingGrade = Math.max(...ratingGrades);
    const minFinalGrade = Math.min(...finalGrades);
    const maxFinalGrade = Math.max(...finalGrades);

    const chartData = {
      labels: ['Exam Grade', 'Rating Grade', 'Final Grade'],
      datasets: [
        {
          label: 'Minimum',
          backgroundColor: 'rgba(72,159,206,1.00)',
          borderColor: 'rgba(72,159,206,1.00)',
          borderWidth: 1,
          data: [minExamGrade, minRatingGrade, minFinalGrade],
        },
        {
          label: 'Maximum',
          backgroundColor: 'rgba(2,48,71,1.00)',
          borderColor: 'rgba(2,48,71,1.00)',
          borderWidth: 1,
          data: [maxExamGrade, maxRatingGrade, maxFinalGrade],
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      maintainAspectRatio: false,
    };

    const chartCanvas = chartCanvasRef.current;

    const myChart = new Chart(chartCanvas, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas ref={chartCanvasRef} width={400} height={400} />;
};

export default Grades;
