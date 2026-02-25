import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ej-files-countdown-target-v2';
const COUNTDOWN_DURATION_MS = (2 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000); // 2 days and 3 hours

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function getTargetDate(): Date {
  // Clear old storage key to ensure new duration takes effect
  localStorage.removeItem('ej-files-countdown-target');

  // Check if we have a stored target date (new key)
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    return new Date(stored);
  }

  // Create new target date (2 days and 3 hours from now)
  const target = new Date(Date.now() + COUNTDOWN_DURATION_MS);
  localStorage.setItem(STORAGE_KEY, target.toISOString());
  return target;
}

function calculateTimeRemaining(targetDate: Date): CountdownTime {
  const now = Date.now();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
}

export function useCountdown(): CountdownTime {
  const [targetDate] = useState<Date>(() => getTargetDate());
  const [timeRemaining, setTimeRemaining] = useState<CountdownTime>(() =>
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    // Update countdown every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeRemaining;
}
