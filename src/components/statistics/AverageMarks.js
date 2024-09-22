import React, { useEffect, useRef } from 'react';
import StudentData from '../../StudentData';
import Chart from 'chart.js/auto';

const calculateFinalGrade = (examGrade, ratingGrade) => {
  return 0.6 * examGrade + 0.4 * ratingGrade;
};

const AverageMarks = () => {
  const canvasRef = useRef(null);

  const examGradeSum = StudentData.reduce((acc, curr) => acc + curr.exam_grade, 0);
  const ratingGradeSum = StudentData.reduce((acc, curr) => acc + curr.rating_grade, 0);
  const finalGradeSum = StudentData.reduce((acc, curr) => acc + calculateFinalGrade(curr.exam_grade, curr.rating_grade), 0);

  const numStudents = StudentData.length;

  const examGradeAvg = examGradeSum / numStudents;
  const ratingGradeAvg = ratingGradeSum / numStudents;
  const finalGradeAvg = finalGradeSum / numStudents;

  useEffect(() => {
    let myChart = null;
    const ctx = canvasRef.current.getContext('2d');

    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Exam Grade', 'Rating Grade', 'Final Grade'],
        datasets: [{
          label: 'Average Grade',
          data: [examGradeAvg, ratingGradeAvg, finalGradeAvg],
          backgroundColor: [
            'rgba(72,159,206,1.00)', 'rgba(142,202,230,1.00)', 'rgba(2,48,71,1.00)',
          ],
          borderColor: [
            'rgba(72,159,206,1.00)', 'rgba(142,202,230,1.00)', 'rgba(2,48,71,1.00)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            suggestedMin: 0,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [examGradeAvg, ratingGradeAvg, finalGradeAvg]);

  return (
    <div>
      <h2>Average Grades</h2>
      <canvas ref={canvasRef} id="myChart" width={400} height={400}></canvas>
    </div>
  );
};

export default AverageMarks;
