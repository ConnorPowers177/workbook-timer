import { useEffect, useState } from "react";


export const Timer = (props) => {
  const { initialHour = 0, initialMinute = 0, initialSeconds = 0 } = props;
  const [hours, setHours] = useState(initialHour);
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.hours.value === '') {
      e.target.hours.value = '0'
    }
    if(e.target.minutes.value === '') {
      e.target.minutes.value = '0'
    }
    if(e.target.seconds.value === '') {
      e.target.seconds.value = '0'
    }
    setHours(e.target.hours.value);
    setMinutes(e.target.minutes.value);
    setSeconds(e.target.seconds.value);
    e.target.hours.value = ''
    e.target.minutes.value = ''
    e.target.seconds.value = ''
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(myInterval);
          }
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
          }
        }
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });


  return (
    <div>
      {hours === 0 && minutes === 0 && seconds === 0 ? null : (
        <h1>
          {" "}
          {hours < 10 || hours == null ? `0${hours}` : hours}:
          {minutes < 10 || minutes == null ? `0${minutes}` : minutes}:
          {seconds < 10 || seconds == null ? `0${seconds}` : seconds}
        </h1>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="hours" >Hours</label>  
        <input id="hours" name="hours" type="number" defaultValue='' max={'12'}></input>
        <label htmlFor="minutes">Minutes</label>
        <input id="minutes" name="minutes" type="number" defaultValue='' max={'59'}></input>
        <label htmlFor="seconds">Seconds</label>
        <input id="seconds" name="seconds" type="number" defaultValue='' max={'59'}></input>
        <button id='startStopBtn' type="submit">Start ▶</button>
      </form>
    </div>
  );
};
