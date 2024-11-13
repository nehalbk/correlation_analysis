import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  // State to store markers
  const [markers, setMarkers] = useState([]);
  const [slope, setSlope] = useState(null);
  const [coeffcol, setCoeffcol] = useState('black');
  const [intercept, setIntercept] = useState(null);
  const [mean, setMean] = useState(null);
  const [coeffr, setcoeffr] = useState(null);
  const canvasRef = useRef(null);

  // Draw a marker at given coordinates
  const drawMarker = (ctx, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  };

  // Draw the regression line given slope (m) and intercept (c)
  const drawRegLine = (ctx, m, c) => {
    const x1 = 0; // Start at the left edge of the canvas
    const x2 = ctx.canvas.width; // End at the right edge of the canvas
    const y1 = m * x1 + c; // Calculate y for x1
    const y2 = m * x2 + c; // Calculate y for x2

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  };

    // Draw the regression line given slope (m) and intercept (c)
    const drawMeanLines = (ctx,mean_x,mean_y) => {
      let x1=mean_x
      let y1=10
      let x2=x1
      let y2=ctx.canvas.height-10

      let x3=10
      let y3=mean_y
      let x4=ctx.canvas.width-10
      let y4=y3

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(x3, y3);
      ctx.lineTo(x4, y4);
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();
    };

  // Redraw canvas, markers, and regression line
  const redrawCanvas = (ctx, m, c) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    markers.forEach((marker) => drawMarker(ctx, marker.x, marker.y)); // Redraw all markers
    if (m !== undefined && c !== undefined) {
      drawRegLine(ctx, m, c); // Draw the regression line
    }
  };

  // Get mouse position relative to canvas
  const getMousePos = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  // Check if click is within a marker
  const isMarkerClicked = (x, y) => {
    return markers.findIndex(
      (marker) => Math.sqrt((marker.x - x) ** 2 + (marker.y - y) ** 2) <= 5
    );
  };

  // Handle canvas click events
  const handleClick = (event) => {
    const { x, y } = getMousePos(event);
    const markerIndex = isMarkerClicked(x, y);

    if (markerIndex >= 0) {
      // Remove marker if already clicked
      setMarkers(markers.filter((_, index) => index !== markerIndex));
    } else {
      // Add new marker
      setMarkers([...markers, { x, y }]);

    }
  };

  // Calculate regression line parameters and draw it
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let sum_xy = 0;
    let sum_x = 0;
    let sum_y = 0;
    let sum_x2 = 0;
    let sum_y2 = 0;
    const n = markers.length;

    markers.forEach((marker) => {
      sum_xy += marker.x * marker.y;
      sum_x += marker.x;
      sum_y += marker.y;
      sum_x2 += marker.x * marker.x;
      sum_y2 += marker.y * marker.y;
    });

    // Calculate slope (m) and intercept (c) for y = mx + c
    const denominator = n * sum_x2 - sum_x * sum_x;
    let m, c,r;
    if (denominator !== 0) {
      m = (n * sum_xy - sum_x * sum_y) / denominator;
      c = (sum_y - m * sum_x) / n;
      r=(n*sum_xy-sum_x * sum_y)/(Math.sqrt((n*sum_x2-(sum_x**2))*(n*sum_y2-(sum_y)**2)))

      setSlope(parseFloat((-1 * m).toFixed(2)))
      setIntercept(parseFloat((ctx.canvas.height-c).toFixed(2)))
      setMean('x: '+(sum_x/n).toFixed(2)+', y:'+( ctx.canvas.height-sum_y/n).toFixed(2))
      setcoeffr(-1*r)
      if (r<0.3 & r>-0.3) setCoeffcol('red')
      else setCoeffcol('green')
    }else{
      setSlope(null);      // Reset slope if calculation is invalid
      setIntercept(null); 
      setcoeffr(null)
    }

    
    

    redrawCanvas(ctx, m, c);
    drawMeanLines(ctx,sum_x/n,sum_y/n);
  }, [markers]); // Redraw whenever markers change

  // Reset canvas and markers
  const handleReset = () => {
    setMarkers([]); // Clear markers arraysetSlope(null);     
    setIntercept(null);
    setMean(null)
    setSlope(null)
    setcoeffr(null) 
    setCoeffcol('black')
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas
  };

  return (
    <div className="App">
      <h2>Correlation Analysis</h2>
      <div className="info">
        Click anywhere on the canvas to place markers at specific coordinates. 
        You can remove a marker by clicking on it again.<br/> Once two or more points are placed, 
        a linear regression line will automatically fit the points. <br/> 
        The key stats such as slope, 
        intercept, mean, and correlation coefficient are displayed. 
        <br/>To clear all points and reset the canvas, click the "Reset" button.
      </div>

      <div className="stats">
        <p><font color="black" size="3"> Slope: <br></br></font> <b><font color="black" size="4.5"> {slope !== null ? slope.toFixed(2) : "N/A"} </font> </b></p>
        <p><font color="black" size="3">Intercept: <br></br></font><b> <font color="black" size="4.5"> {intercept !== null ? intercept.toFixed(2) : "N/A"}</font></b> </p>
        <p><font color="black" size="3">Correlation Coefficient: <br></br></font><b> <font color={coeffcol} size="4.5"> {coeffr !== null ? coeffr.toFixed(2) : "N/A"}</font> </b></p>
        <p><font color="black" size="3">Mean: <br></br></font> <b><font color="black" size="4.5"> {mean !== null ? mean : "N/A"}</font></b> </p>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onClick={handleClick}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      ></canvas>
      <br />
      <button onClick={handleReset} style={{ marginTop: "10px" }}>Reset</button>
    </div>
  );
}

export default App;
