import React from 'react';
import { Pie } from 'react-chartjs-2';
import StudentData from '../../StudentData';

const calculateFinalGrade = (examGrade, ratingGrade) => {
  return 0.6 * examGrade + 0.4 * ratingGrade;
};

const finalGrades = StudentData.map((student) => {
  return {
    id: student.id,
    name: student.name,
    finalGrade: calculateFinalGrade(student.exam_grade, student.rating_grade)
  };
});

const gradesCount = {
  "0-5": 0,
  "5-6": 0,
  "6-7": 0,
  "7-8": 0,
  "8+": 0
};

finalGrades.forEach((student) => {
  const gradeRange = Math.floor(student.finalGrade);
  if (gradeRange < 5) {
    gradesCount["0-5"]++;
  } else if (gradeRange === 5) {
    gradesCount["5-6"]++;
  } else if (gradeRange === 6) {
    gradesCount["6-7"]++;
  } else if (gradeRange === 7) {
    gradesCount["7-8"]++;
  } else {
    gradesCount["8+"]++;
  }
});

const data = {
  labels: ['Grade:0-5', 'Grade:5-6', 'Grade: 6-7', 'Grade: 7-8', 'Grade: 8+'],
  datasets: [
    {
      label: 'No. of student',
      data: [
        gradesCount["0-5"],
        gradesCount["5-6"],
        gradesCount["6-7"],
        gradesCount["7-8"],
        gradesCount["8+"]
      ],
      backgroundColor: [
        '#023047',
        '#219ebc',
        '#8ecae6',
        '#205a7a',
        '#3c7f9c'
      ],
      hoverBackgroundColor: [
        '#023047',
        '#219ebc',
        '#8ecae6',
        '#205a7a',
        '#3c7f9c'
      ]
    }
  ]
};
const FinalGrade = () => {
  return (
    <div>
      <div style={{ width: '400px' }}>
        <h2>Final Grades</h2>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default FinalGrade