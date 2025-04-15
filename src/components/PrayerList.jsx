// src/components/PrayerList.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
    listContainer: {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    prayerItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      borderRadius: '10px',
      transition: '0.3s ease-in-out',
    },
    name: {
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    time: {
      fontSize: '0.95rem',
      color: '#555',
    },
};

const PrayerList = ({ prayerTimes, currentPrayer, prayerInfo, is12HourFormat }) => {
  const convertTo12Hour = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const hourNum = parseInt(hour, 10);
    const suffix = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${suffix}`;
  };

  return (
    <div style={styles.listContainer}>
      {Object.keys(prayerInfo).map((name) => {
        const isCurrent = name === currentPrayer;
        return (
          <div
            key={name}
            style={{
              ...styles.prayerItem,
              backgroundColor: isCurrent ? '#e3f2fd' : '#fff',
              border: isCurrent ? `2px solid ${prayerInfo[name].color}` : '1px solid #ddd',
            }}
          >
            <FontAwesomeIcon icon={['fas', prayerInfo[name].icon]} style={{ color: prayerInfo[name].color, marginRight: 8 }} />
            <span style={styles.name}>{name}</span>
            <span style={styles.time}>
              {is12HourFormat ? convertTo12Hour(prayerTimes[name]) : prayerTimes[name]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PrayerList;