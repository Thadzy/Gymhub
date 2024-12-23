# Gymhub

![image](https://github.com/user-attachments/assets/7d95477b-4af6-44ca-878c-79838cc52ac3)

GymHub Tracker is a web-based application designed to help you track your workouts over time. This project provides a visual representation of workout contributions with a heatmap, allowing you to easily see your workout patterns and streaks.

## Features

- **Add Workout**: Record a workout for the selected date, updating your contribution graph and streak count.
- **Workout Streaks**: Track how many consecutive days you've worked out.
- **Visual Contribution Graph**: See a color-coded heatmap showing workout frequency by day.
- **Local Storage**: All contributions are saved to your browser's local storage, so data persists between sessions.

## Live Demo

View the app by opening `index.html` in a web browser. This app is designed to be lightweight and responsive, optimized for desktop usage.

## Code Structure

- **HTML & CSS**: Defines the page structure and styles for dark mode aesthetics, using CSS custom properties for flexible theming.
- **JavaScript (GymHub class)**: Core functionality, including:
  - Workout tracking
  - Streak calculation
  - Dynamic heatmap rendering
  - Local storage management for saving and loading workout data

## How to Use

1. **Record Workouts**:
   - Click on the "Add Workout" button to add a workout for the currently selected date.
   - The app will display a success alert when a workout is added.
   
2. **View Contributions**:
   - The contribution graph shows daily workout levels, color-coded by frequency.
   - Hover over a day to see the exact number of contributions for that date.
   
3. **Track Your Streak**:
   - The "Current Streak" stat shows the number of consecutive days you've recorded workouts.

4. **Select a Date**:
   - Click on any day in the contribution graph to select it. The selected date will be updated in the "Selected" stat.

## Contribution Graph Legend

The contribution heatmap colors represent the frequency of workouts for each day:

| Color             | Frequency Level       |
|-------------------|-----------------------|
| `--contribution-0` (Dark Gray) | No workouts |
| `--contribution-1` (Green)     | Low         |
| `--contribution-2` (Teal)      | Medium      |
| `--contribution-3` (Bright Green) | High      |
| `--contribution-4` (Brightest Green) | Very High |

## Local Development

To develop locally:
1. Clone or download this repository.
2. Open `index.html` in your web browser.

## Future Enhancements

- **Progress Statistics**: Add more detailed analytics on workout frequency and patterns.
- **Mobile Support**: Optimize layout for smaller screens.
- **Customizable Goals**: Allow users to set and track workout goals.

## License

This project is licensed under the MIT License.

--- 
