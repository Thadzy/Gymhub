const Legend = () => {
    return (
      <div className="legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className={`day contribution-${level}`}></div>
        ))}
        <span>More</span>
      </div>
    );
  };
  
  export default Legend;
  