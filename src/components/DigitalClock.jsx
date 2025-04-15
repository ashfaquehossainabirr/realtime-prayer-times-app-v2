import React, { useState, useEffect } from 'react';
import { formatClockTime } from '../utils/timeUtils';

const DigitalClock = ({ is12HourFormat }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: '2rem', textAlign: 'center', fontFamily: 'monospace' }}>
      🕒 {formatClockTime(currentTime, is12HourFormat)}
    </div>
  );
};

export default DigitalClock;