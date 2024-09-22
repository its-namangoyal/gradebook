import React from 'react';
import './HeaderStyle.css';
import Image from '../../image/Icon.jpg';

function Header(
    {
        title = 'GradeBook',
        full_title = 'Grading digital book for the exam',
        university = 'Lovely Professional University',
        professorName = 'Mir Junaid Rasool',
        school = 'Computer Science and Engineering',
        department = 'Computer Science',
        semester = 'Spring 2023',
        group = 'A',
    }) {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    return (
        <>
            <div className='head'>
                <div className="header">
                    <img src={Image} alt='' />
                    <h3 id='title'>{title}</h3>
                    <h3 id='fulltitle'>{full_title}</h3>
                    <h3 id='date'>&#128197; {date}</h3>
                </div>

                <div className="flex-container">
                    <div>
                        <p>&#127976; &nbsp;University : </p> &nbsp;
                        <p>{university}</p>
                    </div>

                    <div>
                        <p>&#128100; &nbsp;Professor Name : </p> &nbsp;
                        <p>{professorName}</p>
                    </div>

                    <div>
                        <p> &#127891; &nbsp;School : </p> &nbsp;
                        <p>{school}</p>
                    </div>

                    <div>
                        <p>&#128092; &nbsp;Department : </p> &nbsp;
                        <p>{department}</p>
                    </div>

                    <div>
                        <p>&#128213; &nbsp;Semester : </p> &nbsp;
                        <p>{semester}</p>
                    </div>

                    <div>
                        <p>&#128101; &nbsp;Group : </p> &nbsp;
                        <p>{group}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;