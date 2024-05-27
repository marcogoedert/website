"use client";

import { useReducer, useState } from "react";
import { IPomodoro } from "../pomodoro.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultPomodoroValues } from "../pomodoro.data";

const formSchema = z.object({
  schema: z.object({
    focus: z.object({
      minutes: z.coerce.number().min(0).max(60),
      seconds: z.coerce.number().min(0).max(60),
    }),
    shortBreak: z.object({
      minutes: z.coerce.number().min(0).max(60),
      seconds: z.coerce.number().min(0).max(60),
    }),
    longBreak: z.object({
      minutes: z.coerce.number().min(0).max(60),
      seconds: z.coerce.number().min(0).max(60),
    }),
    longBreakInterval: z.coerce.number().min(1).max(10),
  }),
  autoStartBreaks: z.boolean(),
  autoStartFocus: z.boolean(),
});

export default function usePomodoro() {
  const [pomodoro, setPomodoro] = useState<IPomodoro>(defaultPomodoroValues);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultPomodoroValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setPomodoro(values);
  }

  return { pomodoro, form, onSubmit };
}
