# 🚌 School Trip Planner

A simple, user-friendly web application for organizing and managing school trips. Plan trips, track participants, manage costs, and keep all trip information in one place.

## Features

- **Trip Planning**: Create detailed trip plans with destination, dates, and participant counts
- **Cost Management**: Track costs per student and calculate total expenses
- **Participant Tracking**: Manage student and teacher counts for each trip
- **Transportation Options**: Select from various transportation methods (Bus, Train, Private Vehicle, Walking)
- **Activity Planning**: Document planned activities and schedules
- **Notes Section**: Add special requirements or additional information
- **Local Storage**: All data is saved in your browser for persistence
- **Edit & Delete**: Easily modify or remove trips as plans change
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Usage

### Getting Started

1. **Open the Application**: Simply open `index.html` in your web browser
2. **No installation required**: This is a client-side application that runs entirely in your browser

### Planning a Trip

1. Fill in the trip details:
   - **Trip Name**: Give your trip a descriptive name (e.g., "Science Museum Visit")
   - **Destination**: Enter the location you'll be visiting
   - **Date**: Select the trip date
   - **Number of Students**: Enter how many students will attend
   - **Number of Teachers**: Enter how many teachers/chaperones will accompany
   - **Transportation**: Choose your mode of transportation
   - **Cost per Student**: Enter the cost per student (optional)
   - **Planned Activities**: Describe what activities are planned (optional)
   - **Additional Notes**: Add any special requirements or notes (optional)

2. Click **"Add Trip"** to save the trip

### Managing Trips

- **View Trips**: All planned trips are displayed in cards below the form
- **Edit Trip**: Click the "Edit" button on any trip card to modify its details
- **Delete Trip**: Click the "Delete" button to remove a trip (requires confirmation)
- **Trip Statistics**: See the total number of planned trips at the top of the trips section

### Trip Information Display

Each trip card shows:
- Trip name and destination
- Full date with day of the week
- Number of students and teachers
- Total participants count
- Transportation method
- Cost per student and total cost
- Planned activities (if provided)
- Additional notes (if provided)

## Technical Details

- **Built with**: HTML5, CSS3, and vanilla JavaScript
- **Storage**: Uses browser's localStorage for data persistence
- **No dependencies**: No external libraries or frameworks required
- **Browser compatibility**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## File Structure

```
school-trip-planner/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # Trip management logic and functionality
└── README.md       # This file
```

## Privacy

All data is stored locally in your browser. No data is sent to any server. Your trip information remains private and on your device.

## License

Open source and free to use.

## Support

For issues or questions, please open an issue on the GitHub repository.