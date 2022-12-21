import useView from "../../../hooks/usefulHooks/useView";
import useTimer from "../../../hooks/utilityHooks/timerHook";

export default function Countdown({ wait }) {
  const { setView } = useView();

  const { days, hours, minutes, seconds } = useTimer(wait);
  const remainingTime = days + hours + minutes + seconds;
  let isRunning = +remainingTime > 0;

  if (!isRunning) {
    stop();
  }

  function stop() {
    return setView((rest) => ({ ...rest, waiting: false }));
  }

  return (
    <>
      {isRunning ? (
        <div id="timer">
          {+days > 0 ? (
            <span>{`resend verification code in ${1 + +days} days`}</span>
          ) : (
            <span>{`resend verification code in ${
              hours > 0 ? hours + " : " : ""
            }${minutes} : ${seconds}`}</span>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
