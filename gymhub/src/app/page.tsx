// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ContributionGraph from '../components/ContributionGraph'; // Assuming ContributionGraph is a component in the components folder

export default function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [contributions, setContributions] = useState<Record<string, number>>({});

  useEffect(() => {
    setSelectedDate(formatDate(new Date()));
    loadContributions();
  }, []);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const loadContributions = () => {
    const saved = localStorage.getItem('gymhub-contributions');
    setContributions(saved ? JSON.parse(saved) : {});
  };

  const saveContributions = (newContributions: Record<string, number>) => {
    localStorage.setItem('gymhub-contributions', JSON.stringify(newContributions));
    setContributions(newContributions);
  };

  const addContribution = () => {
    const current = contributions[selectedDate] || 0;
    const newContributions = {
      ...contributions,
      [selectedDate]: Math.min(current + 1, 4),
    };
    saveContributions(newContributions);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const calculateStats = () => {
    const total = Object.values(contributions).reduce((a, b) => a + b, 0);
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = formatDate(date);
      if (contributions[dateStr]) streak++;
      else break;
    }

    return { total, streak };
  };

  const stats = calculateStats();

  return (
    <main className="min-h-screen bg-zinc-900 flex justify-center items-center p-5">
      <div className="max-w-[900px] w-full bg-zinc-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-700">
          <h1 className="text-2xl font-bold text-white">GymHub Tracker</h1>
          <button
            onClick={addContribution}
            className="bg-green-400 text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <PlusIcon className="w-4 h-4" />
            Add Workout
          </button>
        </div>

        {showAlert && (
          <Alert className="mb-4 bg-emerald-700 text-white">
            Workout recorded successfully! 💪
          </Alert>
        )}

        <Stats
          selectedDate={selectedDate}
          streak={stats.streak}
          total={stats.total}
        />

        <ContributionGraph
          contributions={contributions}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>
    </main>
  );
}

// components/Stats.tsx
import { CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react';

interface StatsProps {
  selectedDate: string;
  streak: number;
  total: number;
}

export default function Stats({ selectedDate, streak, total }: StatsProps) {
  return (
    <div className="flex gap-6 mb-6">
      <div className="flex items-center gap-2 text-zinc-400 text-sm">
        <CalendarIcon className="w-4 h-4" />
        <span>Selected: {selectedDate}</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-400 text-sm">
        <ClockIcon className="w-4 h-4" />
        <span>Current Streak: {streak} days</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-400 text-sm">
        <UsersIcon className="w-4 h-4" />
        <span>Total Workouts: {total}</span>
      </div>
    </div>
  );
}

// components/ContributionGraph.tsx
interface ContributionGraphProps {
  contributions: Record<string, number>;
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function ContributionGraph({
  contributions,
  selectedDate,
  onDateSelect,
}: ContributionGraphProps) {
  const weekdays = ['Mon', 'Wed', 'Fri'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const generateWeeks = () => {
    const weeks = [];
    const today = new Date();
    
    for (let week = 0; week < 53; week++) {
      const days = [];
      
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (52 - week) * 7 - (6 - day));
        const dateStr = date.toISOString().split('T')[0];
        days.push({
          date: dateStr,
          level: contributions[dateStr] || 0
        });
      }
      
      weeks.push(days);
    }
    
    return weeks;
  };

  const weeks = generateWeeks();

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col justify-between pr-2 text-zinc-400 text-xs h-[120px]">
          {weekdays.map(day => (
            <span key={day}>{day}</span>
          ))}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between mb-2 text-zinc-400 text-xs">
            {months.map(month => (
              <span key={month}>{month}</span>
            ))}
          </div>
          
          <div className="flex gap-1">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-1">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={`w-3 h-3 rounded cursor-pointer transition-transform hover:scale-150
                      ${day.level === 0 ? 'bg-gray-800' :
                        day.level === 1 ? 'bg-emerald-900' :
                        day.level === 2 ? 'bg-emerald-800' :
                        day.level === 3 ? 'bg-emerald-700' :
                        'bg-emerald-600'}`}
                    title={`${day.date}: ${day.level} contributions`}
                    onClick={() => onDateSelect(day.date)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 text-zinc-400 text-xs">
        <span>Less</span>
        <div className="w-3 h-3 rounded bg-gray-800" />
        <div className="w-3 h-3 rounded bg-emerald-900" />
        <div className="w-3 h-3 rounded bg-emerald-800" />
        <div className="w-3 h-3 rounded bg-emerald-700" />
        <div className="w-3 h-3 rounded bg-emerald-600" />
        <span>More</span>
      </div>
    </div>
  );
}

// components/icons/PlusIcon.tsx
export function PlusIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}