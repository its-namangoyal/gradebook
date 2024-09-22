import React, { useState, useEffect } from "react";
import StudentData from '../../StudentData';
import './StatisticsStyle.css';

const calculateFinalGrade = (examGrade, ratingGrade) => {
    return 0.6 * examGrade + 0.4 * ratingGrade;
};

const StatisticsTable = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(StudentData);
    }, []);

    const numStudents = students.length;
    const maxExamGrade = numStudents > 0 ? Math.max(...students.map(student => student.exam_grade)) : 0;
    const minExamGrade = numStudents > 0 ? Math.min(...students.map(student => student.exam_grade)) : 0;
    const maxRatingGrade = numStudents > 0 ? Math.max(...students.map(student => student.rating_grade)) : 0;
    const minRatingGrade = numStudents > 0 ? Math.min(...students.map(student => student.rating_grade)) : 0;

    const finalGrades = students.map(student => calculateFinalGrade(student.exam_grade, student.rating_grade));
    const maxFinalGrade = Math.max(...finalGrades);
    const minFinalGrade = Math.max(...finalGrades);

    const maxOfAllGrades = Math.max(maxExamGrade, maxRatingGrade, maxFinalGrade);
    const minOfAllGrades = Math.min(minExamGrade, minRatingGrade, minFinalGrade);

    const examGradeSum = StudentData.reduce((acc, curr) => acc + curr.exam_grade, 0);
    const ratingGradeSum = StudentData.reduce((acc, curr) => acc + curr.rating_grade, 0);
    const finalGradeSum = StudentData.reduce((acc, curr) => acc + calculateFinalGrade(curr.exam_grade, curr.rating_grade), 0);

    const examGradeAvg = examGradeSum / numStudents;
    const ratingGradeAvg = ratingGradeSum / numStudents;
    const finalGradeAvg = finalGradeSum / numStudents;

    const avgAllGrades = ((examGradeAvg + ratingGradeAvg + finalGradeAvg) / 3).toFixed(2);


    const grade0to4 = finalGrades.filter(grade => grade >= 0 && grade < 4).length;
    const grade4to5 = finalGrades.filter(grade => grade >= 4 && grade <= 5).length;
    const grade5to6 = finalGrades.filter(grade => grade > 5 && grade <= 6).length;
    const grade6to7 = finalGrades.filter(grade => grade > 6 && grade <= 7).length;
    const grade7to8 = finalGrades.filter(grade => grade > 7 && grade <= 8).length;
    const gradeAbove8 = finalGrades.filter(grade => grade > 8).length;


    return (
        <table>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>All Students</td>
                    <td>{numStudents}</td>
                </tr>
                <tr>
                    <td>Average of All Grades</td>
                    <td>{avgAllGrades}</td>
                </tr>
                <tr>
                    <td>Maximum of All Grades</td>
                    <td>{maxOfAllGrades}</td>
                </tr>
                <tr>
                    <td>Minimum of All Grades</td>
                    <td>{minOfAllGrades}</td>
                </tr>
                <tr>
                    <td>Final Grade 0-4</td>
                    <td>{grade0to4}</td>
                </tr>
                <tr>
                    <td>Final Grade 4-5</td>
                    <td>{grade4to5}</td>
                </tr>
                <tr>
                    <td>Final Grade 5-6</td>
                    <td>{grade5to6}</td>
                </tr>
                <tr>
                    <td>Final Grade 6-7</td>
                    <td>{grade6to7}</td>
                </tr>
                <tr>
                    <td>Final Grade 7-8</td>
                    <td>{grade7to8}</td>
                </tr>
                <tr>
                    <td>Final Grade above 8</td>
                    <td>{gradeAbove8}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default StatisticsTable