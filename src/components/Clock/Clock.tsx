'use client';

import { useState, useEffect } from 'react';
import styles from './Clock.module.scss';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const clockNumbers = Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
    <div key={hour} className={styles.hour} style={{ '--angle': hour * 30 }}>
      <span>{hour}</span>
    </div>
  ));

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
  const date = time.toLocaleDateString('en-us', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <>
      <div className={styles.clock}>
        <div className={styles.face}>
          <div className={styles.hoursContainer}>{clockNumbers}</div>
          <div className={styles.arrowsContainer}>
            <div
              className={styles.secondsArrow}
              style={{ '--angle': seconds }}
            />
            <div
              className={styles.minutesArrow}
              style={{ '--angle': minutes }}
            />
            <div
              className={styles.hoursArrow}
              style={{
                '--hour-angle': hours,
                '--minute-angle': minutes,
              }}
            />
          </div>

          <div className={styles.date}>{date}</div>
        </div>
      </div>
    </>
  );
}

export default Clock;
