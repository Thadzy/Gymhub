interface ContributionGraphProps {
    contributions: { [key: string]: number };
  }
  
  const ContributionGraph = ({ contributions }: ContributionGraphProps) => {
    const today = new Date();
  
    const getWeeks = () => {
      const weeks = [];
      for (let week = 0; week < 53; week++) {
        const days = [];
        for (let day = 0; day < 7; day++) {
          const date = new Date(today);
          date.setDate(date.getDate() - (52 - week) * 7 - (6 - day));
          const dateStr = date.toISOString().split("T")[0];
          days.push(
            <div key={dateStr} className={`day contribution-${contributions[dateStr] || 0}`}></div>
          );
        }
        weeks.push(
          <div key={week} className="week">
            {days}
          </div>
        );
      }
      return weeks;
    };
  
    return <div className="weeks">{getWeeks()}</div>;
  };
  
  export default ContributionGraph;
  