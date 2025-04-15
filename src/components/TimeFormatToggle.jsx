import React from 'react';

const TimeFormatToggle = ({ is12HourFormat, setIs12HourFormat }) => (
  <label style={{ display: 'block', marginBottom: '1em' }}>
    <input
      type="checkbox"
      checked={is12HourFormat}
      onChange={() => setIs12HourFormat(!is12HourFormat)}
    />{' '}
    Show time in 12-hour format
  </label>
);

export default TimeFormatToggle;