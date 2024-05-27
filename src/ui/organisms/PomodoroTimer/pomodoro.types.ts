export interface ITimerFormat {
  minutes: number;
  seconds: number;
}

export interface IPomodoroTimers {
  focus: ITimerFormat;
  shortBreak: ITimerFormat;
  longBreak: ITimerFormat;
}

export type PomodoroMode = keyof IPomodoroTimers;

export interface IPomodoroSchema extends IPomodoroTimers {
  longBreakInterval: number;
}

export type IPomodoroSchemas = {
  [schemaName: string]: IPomodoroSchema;
};

// POMODORO
export interface IPomodoro {
  schema: IPomodoroSchema;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
}

// TIMER COMPONENT
export interface ICounter {
  counter: number;
  maxCount: number;
  currentTimer: ITimerFormat;
  selectedTimer: ITimerFormat;
}
