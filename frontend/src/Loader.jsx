import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Generating your AI response...</p>
    </div>
  );
};

export default Loader;
