// Modules and Components
import React, { useState, useEffect } from 'react';
import DigitalClock from './components/DigitalClock';
import PrayerList from './components/PrayerList';
import TimeFormatToggle from './components/TimeFormatToggle';
import Countdown from './components/Countdown';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon, faCloudSun, faCloudMoon, faPrayingHands } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

// For Local Prayer Times Data
// import localPrayerTimes from './data/prayerTimes.json';

// CSS Source
import './App.css'

library.add(faSun, faMoon, faCloudSun, faCloudMoon, faPrayingHands);

const styles = {
  appContainer: {
    // padding: '15px 2rem',
    maxWidth: '700px',
    margin: 'auto',
    background: '#f7f9fc',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  soundButton: {
    marginTop: '1rem',
    padding: '0.5rem 1.25rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },  
};

const prayerInfo = {
  Fajr: { icon: 'praying-hands', color: '#2196f3' },
  Dhuhr: { icon: 'sun', color: '#fbc02d' },
  Asr: { icon: 'cloud-sun', color: '#ff9800' },
  Maghrib: { icon: 'cloud-moon', color: '#ff5722' },
  Isha: { icon: 'moon', color: '#673ab7' },
};

function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState('');
  const [currentPrayer, setCurrentPrayer] = useState('');
  const [is12HourFormat, setIs12HourFormat] = useState(true);
  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState('');

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // console.log(Notification.permission)

  const showPrayerNotification = (prayerName) => {
    if (Notification.permission === 'granted') {
      new Notification(`🕌 ${prayerName} time`, {
        body: `It's time for ${prayerName} prayer.`,
        icon: '/mosque-icon.png', // Optional icon (put in public/)
      });
    }
  };

  const enableSound = () => {
    const audio = new Audio('/alert.mp3');
    audio.play()
      .then(() => setSoundEnabled(true))
      .catch((err) => console.error('Audio permission denied:', err));
  }; 
  
  const playAlertSound = () => {
    if (!soundEnabled) return;
    const audio = new Audio('/alert.mp3');
    audio.play().catch((e) => console.error('Audio playback failed:', e));
  };
  

  const fetchPrayerTimes = async () => {
    const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh');
    const data = await response.json();
    const times = data.data.timings;

    console.log(data)
    console.log(data.data.timings)

    setPrayerTimes(times);
    updatePrayerStates(times);
  };

  // const fetchPrayerTimes = () => {
  //   setPrayerTimes(localPrayerTimes);
  //   updatePrayerStates(localPrayerTimes);
  // };  

  const updatePrayerStates = (times) => {
    const now = new Date();
    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    for (let i = 0; i < prayerOrder.length; i++) {
      const name = prayerOrder[i];
      const time = new Date(`${now.toDateString()} ${times[name]}`);
      if (now < time) {
        setNextPrayer(name);
        setCurrentPrayer(prayerOrder[i - 1] || 'Isha');
        updateCountdown(time);
        return;
      }
    }
    const fajrTime = new Date(`${now.toDateString()} ${times.Fajr}`);
    fajrTime.setDate(fajrTime.getDate() + 1);
    setNextPrayer('Fajr');
    setCurrentPrayer('Isha');
    updateCountdown(fajrTime);
  };

  const updateCountdown = (nextTime) => {
    const now = new Date();
    const diff = nextTime - now;
  
    if (diff <= 1000) {
      setTimeUntilNextPrayer("🕌 Prayer time now");
      playAlertSound();
      showPrayerNotification(nextPrayer);  // 🔔 Show notification

      toast('🕌 Prayer time now', {
        position: "top-right",
        autoClose: 60000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });        
      return;
    } 

    const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    setTimeUntilNextPrayer(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => { fetchPrayerTimes(); }, []);

  useEffect(() => {
    if (!prayerTimes) return;
    const interval = setInterval(() => {
      updatePrayerStates(prayerTimes);
    }, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <div className="wrapper">

    <ToastContainer
    position="top-right"
    autoClose={60000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />

      {!soundEnabled && (
        <>
          <button className='btn' onClick={enableSound} style={styles.soundButton}>
            🔊 Enable Sound
          </button>

          <button className='btn2' onClick={enableSound} style={styles.soundButton}>
            🔊
          </button>
        </>
      )}


      <div className='appContainer' style={styles.appContainer}>
        <h1 style={styles.title}>🕌 Prayer Times</h1>
        <DigitalClock is12HourFormat={is12HourFormat} />
        <TimeFormatToggle is12HourFormat={is12HourFormat} setIs12HourFormat={setIs12HourFormat} />
        {prayerTimes && (
          <>
            <PrayerList
              prayerTimes={prayerTimes}
              currentPrayer={currentPrayer}
              nextPrayer={nextPrayer}
              prayerInfo={prayerInfo}
              is12HourFormat={is12HourFormat}
            />
            {(currentPrayer !== 'Isha' || new Date().getHours() >= 0 && new Date().getHours() < 6) && (
              <Countdown nextPrayer={nextPrayer} remainingTime={timeUntilNextPrayer} />
            )}

          </>
        )}
      </div>

    </div>
  );
}

export default App;