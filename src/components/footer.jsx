import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2023 KulturaGuide.</p>
    </footer>
  );
};

const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem',
    width: '96%',
    textAlign: 'center',
    marginTop: '20px',
    marginLeft: '60px',  
  };
  

export default Footer;
