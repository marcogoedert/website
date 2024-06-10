"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/ui/atoms/label";
import { Switch } from "@/ui/atoms/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClockIcon, GearIcon } from "@radix-ui/react-icons";
import usePomodoro from "./hooks/use-pomodoro";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export default function PomodoroSetting() {
  const { pomodoro, form, onSubmit } = usePomodoro();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <GearIcon className="mr-1" /> Setting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Make changes to your Pomodoro profile here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              {/* Timer */}
              <DialogTitle className="uppercase text-md font-medium tracking-normal">
                <ClockIcon className="mr-1 inline-block" /> Timer
              </DialogTitle>
              {/* Time */}
              <div className="grid items-center gap-4">
                <DialogTitle className="text-md font-bold tracking-normal">
                  Time
                </DialogTitle>
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
                    <FormField
                      control={form.control}
                      name="schema.focus.minutes"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-left col-span-3">
                            Minutes
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="schema-focus-minutes-input"
                              type="number"
                              placeholder="45"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="schema.focus.seconds"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-left col-span-3">
                            Seconds
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="schema-focus-seconds-input"
                              type="number"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="shortBreak">
                    <FormField
                      control={form.control}
                      name="schema.shortBreak.minutes"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-left col-span-3">
                            Minutes
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="schema-shortBreak-minutes-input"
                              type="number"
                              placeholder="15"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="schema.shortBreak.seconds"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-left col-span-3">
                            Seconds
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="schema-shortBreak-seconds-input"
                              type="number"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="longBreak">
                    <FormField
                      control={form.control}
                      name="schema.longBreak.minutes"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-left col-span-3">
                            Minutes
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="schema-longBreak-minutes-input"
                              type="number"
                              placeholder="45"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="schema.longBreak.seconds"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-left col-span-3">
                            Seconds
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="schema-longBreak-seconds-input"
                              type="number"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              {/* Long Break interval */}
              <FormField
                control={form.control}
                name="schema.longBreakInterval"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left col-span-3">
                      Long Break interval
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="long-break-interval-input"
                        type="number"
                        placeholder="4"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Auto Start Breaks */}
              <FormField
                control={form.control}
                name="autoStartBreaks"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left col-span-3">
                      Auto Start Breaks
                    </FormLabel>
                    <FormControl>
                      <Switch
                        id="auto-start-breaks-switch"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Auto Start Focus Time */}
              <FormField
                control={form.control}
                name="autoStartFocus"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left col-span-3">
                      Auto Start Focus
                    </FormLabel>
                    <FormControl>
                      <Switch
                        id="auto-start-breaks-switch"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className={form.formState.isValid ? "" : "text-red-500"}>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
