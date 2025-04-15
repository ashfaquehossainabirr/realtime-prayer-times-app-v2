import React from 'react';

const ProgressBar = ({ progress, nextPrayer }) => (
  <div style={{ margin: '1em 0' }}>
    <h3>Time until <strong>{nextPrayer}</strong></h3>
    <div style={{ 
      width: '100%', 
      backgroundColor: '#e0e0e0', 
      borderRadius: '10px', 
      height: '20px' 
    }}>
      <div style={{ 
        width: `${progress}%`, 
        backgroundColor: '#4caf50', 
        height: '100%', 
        transition: 'width 0.5s' 
      }}></div>
    </div>
  </div>
);

export default ProgressBar;