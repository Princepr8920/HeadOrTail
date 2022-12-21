import { useState, useEffect } from "react";
import { useEffectOnce } from "../../modules/usereffectonce";

export default function useTimer(duration) {
  let givenTime = new Date(duration).getTime();
  let [time, setTimer] = useState(givenTime - new Date().getTime());

  useEffectOnce(() => {
    const int = setInterval(func, 1000);
    function func() { 
      givenTime < new Date().getTime()
        ? clearInterval(int)
        : setTimer(givenTime - new Date().getTime());
    }
    return () => clearInterval(int);
  });

  function withZero(obj) {
    const result = {};
    for (let key in obj) {
      if (obj[key] < 10 && obj[key] >= 0) {
        result[key] = "0" + obj[key];
      } else if (obj[key] <= 0) {
        result[key] = "00";
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  }

  const timerObj = {
    days: Math.floor(time / 24 / 60 / 60 / 1000),
    hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((time % (1000 * 60)) / 1000),
  };

  return withZero(timerObj);
}
