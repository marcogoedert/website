"use client";

import PomodoroContext from "./context/pomodoro-context";
import PomodoroTimer from "./pomodoro-timer";

export default function Pomodoro() {
  return (
    <>
      <PomodoroContext.Provider value={}>
        <PomodoroTimer></PomodoroTimer>
      </PomodoroContext.Provider>
    </>
  );
}
