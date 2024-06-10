interface IUseTimerProps {
  minutes: number;
}

interface IUseTimer {
  timeLeft: {
    minutes: number;
    seconds: number;
  };
}

export default function useTimer({ minutes }: IUseTimerProps): IUseTimer {
    
  return {
    timeLeft: {
      minutes,
      seconds: 0,
    },
  };
}
