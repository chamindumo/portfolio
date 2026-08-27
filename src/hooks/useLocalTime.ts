import { useState, useEffect } from 'react';

export function useLocalTime() {
  const [times, setTimes] = useState({
    colombo: '',
    london: '',
    seconds: '00',
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      
      const colomboTime = new Intl.DateTimeFormat('en-LK', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);

      const londonTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);

      setTimes({
        colombo: colomboTime,
        london: londonTime,
        seconds: String(now.getSeconds()).padStart(2, '0'),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return times;
}
