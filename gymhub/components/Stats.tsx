interface StatsProps {
    selectedDate: string;
    streak: number;
    total: number;
  }
  
  const Stats = ({ selectedDate, streak, total }: StatsProps) => {
    return (
      <div className="stats">
        <div className="stat-item">
          <span>Selected: {selectedDate}</span>
        </div>
        <div className="stat-item">
          <span>Current Streak: {streak} days</span>
        </div>
        <div className="stat-item">
          <span>Total Workouts: {total}</span>
        </div>
      </div>
    );
  };
  
  export default Stats;
  