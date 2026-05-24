import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import DurationBreak from "./DurationBreak";
import DurationFocus from "./DurationFocus";
import TimeControl from "./TimeControl";
import Progress from "./Progress";
import ToDo from "./ToDo";

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSessionPause, setIsSessionPause] = useState(true);
  const [timer, setTimer] = useState(1500);
  const [currentState, setCurrentState] = useState("focus");

  // YOUR ADDITION — subject input state
  const [subject, setSubject] = useState("");

  const handleFocusIncrement = () => {
    setFocusDuration((currentValue) => Math.min(60, currentValue + 5));
  };

  const handleFocusDecrement = () => {
    setFocusDuration((currentValue) => Math.max(5, currentValue - 5));
  };

  const handleBreakIncrement = () => {
    setBreakDuration((currentValue) => Math.min(15, currentValue + 1));
  };

  const handleBreakDecrement = () => {
    setBreakDuration((currentValue) => Math.max(1, currentValue - 1));
  };

  const handleStopButton = () => {
    setIsSessionActive(false);
    setIsTimerRunning(false);
    setIsSessionPause(true);
    setCurrentState("focus");
  };

  // YOUR ADDITION — save session to backend
  const saveSession = () => {
    fetch("http://localhost:5000/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: subject || "General",
        duration: focusDuration,
      }),
    }).catch(() => console.log("Could not save session — is backend running?"));
  };

  // YOUR ADDITION — browser notification + sound
  const notifyUser = () => {
    if (Notification.permission === "granted") {
      new Notification("Session complete!", {
        body: "Great work! Time for a break.",
      });
    }
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  useInterval(
    () => {
      if (timer === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();

        // YOUR ADDITION — save + notify only when focus session ends
        if (currentState === "focus") {
          saveSession();
          notifyUser();
        }

        const newTime = currentState === "focus" ? breakDuration : focusDuration;
        setTimer(newTime * 60);
        setCurrentState((prevState) =>
          prevState === "focus" ? "break" : "focus"
        );
        return;
      }
      setTimer((currentTime) => currentTime - 1);
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (!isSessionActive) {
      setIsSessionActive(true);
      setTimer(focusDuration * 60);
      // YOUR ADDITION — request notification permission when session starts
      Notification.requestPermission();
    }
    setIsSessionPause((prevState) => !prevState);
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">

      {/* YOUR ADDITION — subject input */}
      <div className="row" style={{ justifyContent: "center", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="What are you studying? (e.g. React, Math)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isSessionActive}
          style={{
            padding: "8px 16px",
            width: "60%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            textAlign: "center",
          }}
        />
      </div>

      <div className="row">
        <div className="col">
          <DurationFocus
            focusDuration={focusDuration}
            handleFocusDecrement={handleFocusDecrement}
            handleFocusIncrement={handleFocusIncrement}
            isSessionActive={isSessionActive}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <DurationBreak
              breakDuration={breakDuration}
              handleBreakDecrement={handleBreakDecrement}
              handleBreakIncrement={handleBreakIncrement}
              isSessionActive={isSessionActive}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TimeControl
            playPause={playPause}
            isTimerRunning={isTimerRunning}
            handleStopButton={handleStopButton}
            isSessionActive={isSessionActive}
          />
        </div>
      </div>
      <Progress
        currentState={currentState}
        timer={timer}
        isSessionActive={isSessionActive}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isSessionPause={isSessionPause}
      />
      <div className="row">
        <div className="col">
          <ToDo />
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;