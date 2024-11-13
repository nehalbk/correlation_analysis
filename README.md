# Interactive Regression Line Tool

An interactive web tool built with React that allows users to plot points on a canvas, fit a regression line, and view key statistical information in real-time. As users add or remove points, the regression line, slope, intercept, mean, and correlation coefficient are automatically calculated and displayed.

## Features

- **Interactive Point Plotting**: Click on the canvas to add or remove points. 
- **Dynamic Regression Line**: The tool automatically fits a linear regression line based on the points plotted.
- **Real-Time Statistical Information**: Displays the slope, intercept, mean, and correlation coefficient of the regression line.
- **Mean Lines**: Visual lines indicating the mean values of the x and y coordinates.
- **Reset Functionality**: A button to clear all points and reset the canvas.

## Instructions

1. **Add Points**: Click anywhere on the canvas to add a point. Click on an existing point to remove it.
2. **View Regression Line**: As you add more points, the regression line is automatically calculated and displayed.
3. **Analyze Stats**: The slope, intercept, mean, and correlation coefficient of the regression line are shown in real-time.
4. **Reset Canvas**: Press the "Reset" button to clear all points and start over.

## Technologies Used

- **React**: For building the interactive user interface.
- **Canvas API**: For rendering and drawing on the canvas.
- **CSS**: For styling the page and elements.

## Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git

2. Navigate to the project directory:
    ```bash
    cd <your-repo-name>

3. Install dependencies:
    ```bash
    npm install

4. Start the development server:
    ```bash
    npm start
5. Open your browser and go to http://localhost:3000.