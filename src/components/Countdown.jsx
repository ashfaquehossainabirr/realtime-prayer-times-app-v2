// src/components/Countdown.js
import React from 'react';

const Countdown = ({ nextPrayer, remainingTime }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        ⏳ Time until <span style={styles.highlight}>{nextPrayer}</span> prayer
      </h2>
      <div style={styles.timer}>{remainingTime}</div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '1.5rem',
    padding: '5px 10px',
    border: '2px dashed #ccc',
    borderRadius: '12px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  highlight: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  timer: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default Countdown;