import React, { useState, useRef } from 'react';
import './App.css';
// if helper function we can move it into another modeula and import it so,as it is not relevant to this app the author just kept the fucntion otside.
function padTime(time) {
  return time.toString().padStart(2, '0');
}
export default function App() {
  // statting with state variables
  const [title, setTitle] = useState('Let the timer Begin!!');
  const [isRunning,setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  let intervalRef = useRef(null); //we can keep variable sfrom recent renders.
  // functions
  function startTimer() {
    setIsRunning(true);
    // as we press start more than tiwce without checkingbelow condn we are creeating two intervals with 1 sec apiece time so the text sarts flickering
    if (intervalRef.current != null) return;
    // (timeLeft) => timeLeft - 1) functional synatx meaning look at previous value and update the previous value
    setTitle('you have got the thigs all you need');
    intervalRef.current = setInterval(
      //setInterval returns an unique id refering to an setInterval.
      () =>
        setTimeLeft((timeLeft) => {
          if (timeLeft >= 1) return timeLeft - 1;
          // return 0;
          resetTimer();
        }),
      1000
    );
  }
  function stopTimer() {

    if (intervalRef.current == null) return;//if we have an intervalref est dont do any thing
    // to stop intrval we use clearINterval(interval_to_be_cleared)
    setTitle('Just relax! and Bring it back');
    console.log(intervalRef.current);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);

  }
  function resetTimer() {
    // set

    clearInterval(intervalRef.current);
    setTitle('Ready for NHER ADVENTURE');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  
  }
  // to render  .
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{padTime(minutes)}</span>
        <span>:</span>
        <span>{padTime(seconds)}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {timeLeft!=0 && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
