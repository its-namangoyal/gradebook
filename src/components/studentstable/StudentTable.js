import React, { useState } from 'react';
import './StudentTableStyle.css';

const StudentTable = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredData, setFilteredData] = useState(props.data);
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [buttonContent, setButtonContent] = useState("0-9");
  const [searchTerm, setSearchTerm] = useState("");

  const calculateFinalGrade = (examGrade, ratingGrade) => {
    return 0.6 * examGrade + 0.4 * ratingGrade;
  };

  const getStatus = (finalGrade) => {
    return finalGrade > 4 ? "Passed" : "Failed";
  };

  const handleShowDetails = (event, student) => {
    event.stopPropagation();
    setSelectedStudent(student);
    setShowDetails(true);
  };

  const handleFilterAll = () => {
    setFilteredData(props.data);
  };

  const handleFilterPassed = () => {
    const passedData = props.data.filter((student) => {
      return calculateFinalGrade(student.exam_grade, student.rating_grade) > 4;
    });
    setFilteredData(passedData);
  };

  const handleFilterFailed = () => {
    const failedData = props.data.filter((student) => {
      return calculateFinalGrade(student.exam_grade, student.rating_grade) <= 4;
    });
    setFilteredData(failedData);
  };

  const handleSort = () => {
    if (sortOrder === "A-Z") {
      const sortedData = [...filteredData].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setFilteredData(sortedData);
      setSortOrder("Z-A");
    } else {
      const sortedData = [...filteredData].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      setFilteredData(sortedData);
      setSortOrder("A-Z");
    }
  };

  const handleButton = () => {
    if (buttonContent === "0-9") {
      const sortedData = [...filteredData].sort((a, b) => {
        return calculateFinalGrade(a.exam_grade, a.rating_grade) - calculateFinalGrade(b.exam_grade, b.rating_grade);
      });
      setFilteredData(sortedData);
      setButtonContent("9-0");
    } else {
      const sortedData = [...filteredData].sort((a, b) => {
        return calculateFinalGrade(b.exam_grade, b.rating_grade) - calculateFinalGrade(a.exam_grade, a.rating_grade);
      });
      setFilteredData(sortedData);
      setButtonContent("0-9");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredData(props.data);
    } else {
      const searchData = props.data.filter((student) => {
        return student.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      setFilteredData(searchData);
    }
  }
  const [selectedRows, setSelectedRows] = useState([]);
  const toggleSelectedRow = (id) => {
    const rowIdIndex = selectedRows.indexOf(id);
    if (rowIdIndex === -1) {
      setSelectedRows([...selectedRows, id]);
    } else {
      const updatedSelectedRows = [
        ...selectedRows.slice(0, rowIdIndex),
        ...selectedRows.slice(rowIdIndex + 1),
      ];
      setSelectedRows(updatedSelectedRows);
    }
  };

  let isNameUppercase = false;
  const handleClick = (student) => {
    isNameUppercase = !isNameUppercase;
    if (isNameUppercase) {
      student.name = student.name.toUpperCase();
    } else {
      student.name = student.name.toLowerCase();
    }
    toggleSelectedRow(student.id);
  }

  return (
    <div>
      <div>
        <div className='btn-left'>
          <button onClick={handleFilterAll}>All</button>
          <button onClick={handleFilterPassed}>Passed</button>
          <button onClick={handleFilterFailed}>Failed</button>
          <button onClick={handleSort}>{sortOrder}</button>
          <button onClick={handleButton}>{buttonContent}</button>
        </div>
        <input type='text' id='filter' value={searchTerm} onChange={handleSearch} placeholder="&#128270; Filtered by Name" />
      </div>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Ticket Number</th>
            <th>Exam Grade</th>
            <th>Rating Grade</th>
            <th>Final Grade</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student, index) => (
            <tr key={student.id} style={{ backgroundColor: selectedRows.includes(student.id) ? "lightblue" : "" }} onClick={() => { handleClick(student); }}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.ticket_number}</td>
              <td>{student.exam_grade}</td>
              <td>{student.rating_grade}</td>
              <td>{calculateFinalGrade(student.exam_grade, student.rating_grade).toFixed(2)}</td>
              <td>{getStatus(calculateFinalGrade(student.exam_grade, student.rating_grade))}</td>
              <td>
                <button className="details-column" onClick={(event) => handleShowDetails(event, student)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && showDetails && (
        <div className="student-card">
          <h2>{selectedStudent.name}</h2>
          <p>Ticket Number: {selectedStudent.ticket_number}</p>
          <p>Ticket Course: {selectedStudent.ticket_topic}</p>
          <p>Exam Grade: {selectedStudent.exam_grade}</p><br></br>
          <p>Rating Grade: {selectedStudent.rating_grade}</p><br></br>
          <p>Final Grade: {calculateFinalGrade(selectedStudent.exam_grade, selectedStudent.rating_grade).toFixed(2)}</p><br />
          <p>Status: {getStatus(calculateFinalGrade(selectedStudent.exam_grade, selectedStudent.rating_grade))}</p><br />
          <p>Comment: {selectedStudent.comment}</p><br />
          <button onClick={() => {
            setSelectedStudent(null);
            setShowDetails(false);
          }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
