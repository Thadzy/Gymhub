interface HeaderProps {
    title: string;
    onAddWorkout: () => void;
  }
  
  const Header = ({ title, onAddWorkout }: HeaderProps) => {
    return (
      <div className="header">
        <h1 className="title">{title}</h1>
        <button className="add-btn" onClick={onAddWorkout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Workout
        </button>
      </div>
    );
  };
  
  export default Header;
  