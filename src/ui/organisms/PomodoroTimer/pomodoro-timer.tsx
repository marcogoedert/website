"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/ui/atoms/progress";
import { FileTextIcon, GearIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import PomodoroSetting from "./pomodoro-setting";
import { ICounter, IPomodoroTimers, PomodoroMode } from "./pomodoro.types";
import usePomodoro from "./hooks/use-pomodoro";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// const timerVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// );

export default function PomodoroTimer(): JSX.Element {
  // Settings
  const { pomodoro, form, onSubmit } = usePomodoro();
  // Settings - Timer Duration
  const [timers, setTimers] = useState<IPomodoroTimers>({
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
  });

  // Settings - Is Timer Active (Default: false)
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Settings - Timer Mode (Default: Focus)
  const [mode, setMode] = useState<PomodoroMode>("focus");

  // State - Time Left (Default: Focus)
  const [timer, setTimer] = useState<ICounter>({
    selectedTimer: { ...timers.focus },
    currentTimer: { ...timers.focus },
    maxCount: timers.focus.minutes * 60 + timers.focus.seconds,
    counter: 0,
  });

  const toggleIsTimerActive = () => {
    setIsTimerActive((prev) => !prev);
  };

  const changeMode = (newMode: PomodoroMode) => {
    if (newMode === mode) {
      return;
    }
    
    setMode(newMode);
    setIsTimerActive(false);
  };

  /**
   * UPDATE TIMER MODE ON CHANGE
   */
  useEffect(() => {
    if (mode === "focus") {
      
      setTimer({
        selectedTimer: { ...timers.focus },
        maxCount: timers.focus.minutes * 60 + timers.focus.seconds,
        currentTimer: { ...timers.focus },
        counter: 0,
      });
    } else if (mode === "shortBreak") {
      
      setTimer({
        selectedTimer: { ...timers.shortBreak },
        maxCount: timers.shortBreak.minutes * 60 + timers.shortBreak.seconds,
        currentTimer: { ...timers.shortBreak },
        counter: 0,
      });
    } else {
      
      setTimer({
        selectedTimer: { ...timers.longBreak },
        maxCount: timers.longBreak.minutes * 60 + timers.longBreak.seconds,
        currentTimer: { ...timers.longBreak },
        counter: 0,
      });
    }
    setIsTimerActive(false);
  }, [mode, timers]);

  /**
   * TIMER COUNTER
   */
  useEffect(() => {
    // Do not execute timer if it's not active
    if (!isTimerActive) {
      return;
    }
    async function countTimer() {
      
      await delay(1000);

      if (timer.currentTimer.seconds > 0) {
        // Reduce seconds left by 1 if it's above zero
        // Increase counter by 1 if it's below maxCount
        setTimer((prev) => ({
          ...prev,
          counter:
            prev.counter === prev.maxCount ? prev.counter : prev.counter + 1,
          currentTimer: {
            ...prev.currentTimer,
            seconds:
              prev.currentTimer.seconds > 0 ? prev.currentTimer.seconds - 1 : 0,
          },
        }));
      } else if (timer.currentTimer.minutes > 0) {
        // Reduce minutes left by 1 and reset seconds if seconds is zero and minutes is above zero
        // Increase counter by 1 if it's below maxCount
        setTimer((prev) => ({
          ...prev,
          counter:
            prev.counter === prev.maxCount ? prev.counter : prev.counter + 1,
          currentTimer: {
            ...prev.currentTimer,
            minutes:
              prev.currentTimer.minutes > 0 ? prev.currentTimer.minutes - 1 : 0,
            seconds: 59,
          },
        }));
      } else {
        
        setIsTimerActive(false);
      }
      return () => {};
    }
    countTimer();
  }, [timer.currentTimer, isTimerActive]);

  return (
    <div
      id="timer-root"
      className="grid grid-cols-1 gap-y-2 p-4 mx-auto rounded-md max-w-[576px]"
    >
      <div id="timer-actions" className="flex justify-end gap-x-4">
        <Button>
          <FileTextIcon className="mr-1" /> Report
        </Button>
        <PomodoroSetting />
      </div>
      <Progress value={(timer.counter / timer.maxCount) * 100} />
      <div
        id="timer-container"
        className="backdrop-blur-md bg-primary/20 grid grid-cols-1 gap-y-6 py-4 px-2 rounded-md w-full"
      >
        <Tabs defaultValue="focus" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="focus" className="w-full">
              Focus Time
            </TabsTrigger>
            <TabsTrigger value="shortBreak" className="w-full">
              Short Break
            </TabsTrigger>
            <TabsTrigger value="longBreak" className="w-full">
              Long Break
            </TabsTrigger>
          </TabsList>
          <TabsContent value="focus">

          </TabsContent>
        </Tabs>
        <span id="timer" className="text-center text-8xl md:text-9xl">
          {String(timer.currentTimer.minutes).padStart(2, "0")}:
          {String(timer.currentTimer.seconds).padStart(2, "0")}
        </span>
        <Button
          variant="secondary"
          className="text-xl uppercase"
          onClick={toggleIsTimerActive}
        >
          {isTimerActive ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
}
