import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/ui/atoms/typography";
import Pomodoro from "@/ui/organisms/PomodoroTimer/pomodoro-root";
import Grid from "@/ui/templates/Grid";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "Pomodoro timer to split focus time and break time",
};

export default function PomodoroPage() {
  return (
    <main className="pt-24">
      <Grid>
        <div id="pomodoro-timer" className="col-start-2">
          <H3 className="mb-4 text-center">🍅 Pomodoro Timer</H3>
          <Suspense fallback={<div>Loading...</div>}>
            <Pomodoro></Pomodoro>
          </Suspense>
          <Separator className="my-4" />
          <ol>
            <label>What is the Pomodoro Technique?</label>
            <li>1. ✏️ Pick a task</li>
            <li>2. ⏳ Set a 25-min timer</li>
            <li>3. 🧑‍💻 Work on your task until the time is up</li>
            <li>4. ☕ Take a 5 min break</li>
            <li>5. 🌳 Every 4 pomodoros, take a longer 15-30 min break</li>
          </ol>
          <Separator className="my-4" />
          {/* TO-DO LIST */}
          <label className="underline">To-do</label>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {/* TIMER */}
            <ul>
              <label>TIMER</label>
              <li className="line-through">- [x] Make it work</li>
              <li className="line-through">
                - [x] Add modes: Focus Time, Short Break, Long Break
              </li>
              <li className="line-through">- [x] Add progress bar</li>
              <li className="line-through">- [x] Add start/pause button</li>
              <li>
                - [ ] Set goal of the day - total pomodoro time today (optional,
                give it a name - enables multi-goals?)
              </li>
            </ul>
            {/* REPORT */}
            <ul>
              <label>REPORT</label>
              <li>- [ ] Total time today: focus</li>
              <li>- [ ] Total time today: break</li>
              <li>- [ ] Total tasks done today</li>
              <li>- [ ] total sessions done today</li>
              <li>- [ ] total breaks done today</li>
              <li>- [ ] % focus time completed per session</li>
              <li>- [ ] % tasks completed</li>
              <li>- [ ] most used pomodoro schemas</li>
              <li>- [ ] Total focus time per day</li>
              <li>- [ ] Total break time per day</li>
              <li>- [ ] Total tasks done per day</li>
            </ul>
            {/* TASKS */}
            <ul>
              <label>TASKS</label>
              <li>- [ ] (Feature) Add tasks</li>
              <li>- [ ] (Feature) Remove tasks</li>
              <li>- [ ] (Feature) Check task as complete</li>
              <li>- [ ] (Feature) Switch tasks</li>
              <li>- [ ] (Settings) Auto check tasks</li>
              <li>- [ ] (Settings) Auto switch tasks</li>
              <li>- [ ] (Integration) Add tasks/events from Google Agenda</li>
              <li>- [ ] (Integration) Add tasks/events from Todoist</li>
            </ul>
            {/* SETTINGS */}
            <ul className="space-y-2">
              <label>SETTINGS</label>
              {/* SETTINGS - TIMER */}
              <ul>
                <label>Timer</label>
                <li>- [ ] Change duration of Focus/Short break/Long break</li>
                <li>- [ ] Enable Auto Start Breaks</li>
                <li>- [ ] Enable Auto Start Focus time</li>
                <li>- [ ] Save/delete pomodoro schemes</li>
              </ul>
              {/* SETTINGS - SOUND */}
              <ul>
                <label>Sound</label>
                <li>- [ ] (Settings) Change sound alarm</li>
                <li>- [ ] (Settings) Change volume</li>
                <li>- [ ] (Settings) Repeat N times (default: 1)</li>
              </ul>
              {/* SETTINGS - THEME */}
              <ul>
                <label>Theme</label>
                <li>
                  - [ ] (Settings) Change color theme for Focus time, Short
                  break, Long break
                </li>
                <li>- [ ] (Settings) Change hour format: 12-hour or 24-hour</li>
              </ul>
            </ul>
            <ul>
              <label>NOTIFICATIONS</label>
              <li>- [ ] (Feature) Add notification when timer completes</li>
              <li>
                - [ ] (Feature) Add reminder when focus time is about to
                complete
              </li>
              <li>- [ ] (Settings) Change reminder for every/last N minutes</li>
              <li>- [ ] (Integration) Mobile support</li>
              <li>- [ ] (Integration) Webhook</li>
            </ul>
          </div>
        </div>
      </Grid>
    </main>
  );
}
