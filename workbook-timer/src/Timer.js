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
    <div className="flex flex-inline items-center justify-center break-before-column h-5">
      {hours === 0 && minutes === 0 && seconds === 0 ? null : (
        <h1 className={`w-10 h-5 bg-gradient-to-b border border-solid border-stone-800 rounded-3xl flex justify-center items-center shadow-2xl text-sm md:w-20 md:h-10 md:text-lg`}>
          {" "}
          {hours < 10 || hours == null ? `0${hours}` : hours}:
          {minutes < 10 || minutes == null ? `0${minutes}` : minutes}:
          {seconds < 10 || seconds == null ? `0${seconds}` : seconds}
        </h1>
      )} 
      <div>
      </div>
      <form onSubmit={handleSubmit} className='mb-2 md:mb-0'>
        <label htmlFor="hours" className="ml-1 mr-0.5 left-10 text-xs md:text-tiny">Hours</label>  
        <input id="hours" name="hours" type="number" defaultValue='' max={'12'} className='outline-none border-transparent focus:ring-0 focus:ring-transparent bg-transparent/50 border border-sky-500 w-4 h-3 text-sky-500 text-xs md:w-8 md:h-6 md:text-tiny ' ></input>
        <label htmlFor="minutes" className="ml-1 mr-0.5 left-14 text-xs md:text-tiny">Minutes</label>
        <input id="minutes" name="minutes" type="number" defaultValue='' max={'59'} className='outline-none border-transparent focus:ring-0 focus:ring-transparent bg-transparent/50 border border-sky-500 w-4 h-3 text-sky-500 text-xs md:w-8 md:h-6 md:text-tiny ' ></input>
        <label htmlFor="seconds" className="ml-1 mr-0.5 left-14 text-xs md:text-tiny">Seconds</label>
        <input id="seconds" name="seconds" type="number" defaultValue='' max={'59'} className='outline-none border-transparent focus:ring-0 focus:ring-transparent bg-transparent/50 border border-sky-500 w-4 h-3 text-sky-500 text-xs md:w-8 md:h-6 md:text-tiny ' ></input>
        <button id='startStopBtn' type="submit" className="w-6 h-2 md:w-12 md:h-5 md:text-tiny mr-4 ml-2 px-1 py-0.25 border-none text-xs rounded-full text-slate-50 transition ease-in-out delay-150 bg-sky-600 hover:bg-sky-500 duration-300 shadow">Start ▶</button>
      </form>
    </div>
  );
};
