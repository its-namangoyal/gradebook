import React from 'react';
import './FooterStyle.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="signature">
        <p>EPAM</p>
        {/* <p>{new Date().getFullYear()}</p> */}
        <p id="date">{new Date().toLocaleDateString()}</p>
      </div>
      <div className="made-by">
        <p>Made by:</p>
        <p>Naman Goyal</p>
      </div>
    </footer>
  );
}

export default Footer;
