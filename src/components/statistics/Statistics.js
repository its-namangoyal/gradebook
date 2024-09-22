import React, { useState } from 'react';
import StatisticsTable from './StatisticsTable';
import Result from './Result';
import FinalGrade from './FinalGrade';
import AverageMarks from './AverageMarks';
import Grades from './Grades';
import './StatisticsStyle.css'

const Statistics = () => {
  const [showCharts, setShowCharts] = useState(false);

  const toggleCharts = () => {
    setShowCharts(!showCharts);
  };
  return (
    <div>
      <button onClick={toggleCharts}>{showCharts ? 'Hide Statistics' : 'Show Statistics'}</button>
      {showCharts && (
        <div>
          <StatisticsTable className='table' />
          <div className='rows'>
            <Result className='chart' />
            <FinalGrade className='chart' />
            <AverageMarks className='chart' />
            <div className='row'>
              <Grades />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
