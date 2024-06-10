'use client';

import PomodoroContext from './context/pomodoro-context';
import PomodoroTimer from './pomodoro-timer';

export default function Pomodoro() {
    return (
        <>
            <PomodoroTimer></PomodoroTimer>
        </>
    );
}
