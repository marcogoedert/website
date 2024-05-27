import { IPomodoro } from "./pomodoro.types";

export const defaultPomodoroValues: IPomodoro = {
    schema: {
      focus: {
        minutes: 45,
        seconds: 0,
      },
      shortBreak: {
        minutes: 15,
        seconds: 0,
      },
      longBreak: {
        minutes: 30,
        seconds: 0,
      },
      longBreakInterval: 4,
    },
    autoStartBreaks: false,
    autoStartFocus: false,
  };