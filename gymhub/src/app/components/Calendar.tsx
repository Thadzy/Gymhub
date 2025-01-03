"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun, Trophy, Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [darkMode, setDarkMode] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("gymAttendance");
    if (storedData) {
      setAttendance(JSON.parse(storedData));
      calculateStreak(JSON.parse(storedData));
    }
    
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const calculateStreak = (data: Record<string, boolean>) => {
    let currentStreak = 0;
    const date = new Date();

    while (data[date.toISOString().split('T')[0]]) {
      currentStreak++;
      date.setDate(date.getDate() - 1);
    }
    setStreak(currentStreak);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  const toggleDay = (date: string) => {
    const updatedAttendance = {
      ...attendance,
      [date]: !attendance[date],
    };
    setAttendance(updatedAttendance);
    localStorage.setItem("gymAttendance", JSON.stringify(updatedAttendance));
    calculateStreak(updatedAttendance);
  };

  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      days.push(date.toISOString().split('T')[0]);
    }

    return days;
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() + offset));
    setCurrentMonth(new Date(newDate));
  };

  const getContributionClass = (date: string | null) => {
    if (!date) return 'bg-transparent';
    if (!attendance[date]) return 'bg-[var(--contribution-0)] hover:opacity-80';
    const intensity = Math.min(5, attendance[date] ? 1 : 0);
    const intensityClasses = [
      'bg-[var(--contribution-1)] hover:opacity-80',
      'bg-[var(--contribution-2)] hover:opacity-80',
      'bg-[var(--contribution-3)] hover:opacity-80',
      'bg-[var(--contribution-4)] hover:opacity-80',
      'bg-[var(--contribution-4)] hover:opacity-80'
    ];
    return intensityClasses[intensity - 1];
  };

  const getDayNumber = (date: string | null) => {
    if (!date) return '';
    return new Date(date).getDate();
  };

  const totalWorkouts = Object.values(attendance).filter(Boolean).length;

  return (
    <div className="w-full min-h-screen bg-[var(--bg-dark)] text-[var(--color-text)] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="text-3xl font-bold">Gymhub</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-[var(--bg-card)] transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-[var(--bg-card)] rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-[var(--color-muted)] text-sm">Current Streak</p>
              <p className="text-2xl font-bold">{streak} days</p>
            </div>
            <Trophy className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <div className="bg-[var(--bg-card)] rounded-lg p-4">
            <p className="text-[var(--color-muted)] text-sm">Total Workouts</p>
            <p className="text-2xl font-bold">{totalWorkouts}</p>
          </div>
          <div className="bg-[var(--bg-card)] rounded-lg p-4">
            <p className="text-[var(--color-muted)] text-sm">Monthly Average</p>
            <p className="text-2xl font-bold">{Math.round(totalWorkouts / 12)} per month</p>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-[var(--bg-dark)] rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">{getMonthName(currentMonth)}</h2>
            <button 
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-[var(--bg-dark)] rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-[var(--color-muted)]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {generateDays().map((date, index) => (
            <div
              key={date || index}
              onClick={() => date && toggleDay(date)}
              className={`
                aspect-square rounded-md transition-all duration-200 relative
                flex items-center justify-center text-xs
                ${date ? 'cursor-pointer' : ''}
                ${getContributionClass(date)}
              `}
              title={date || ''}
            >
              <span className="opacity-60">{getDayNumber(date)}</span>
            </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-xs">
            <span className="text-[var(--color-muted)]">Less</span>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${getContributionClass(String(i + 1))}`}
              />
            ))}
            <span className="text-[var(--color-muted)]">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;