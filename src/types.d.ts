import { CSSProperties } from "react";

export type TDefaultStyle = {
  monthWrapper: CSSProperties;
  month: CSSProperties;
  year: CSSProperties;
  yearActive: CSSProperties;
  yearWrapper: CSSProperties;
  dayMain: CSSProperties;
  daySub: CSSProperties;
  prevDayMain: CSSProperties;
  prevDaySub: CSSProperties;
  nextDayMain: CSSProperties;
  nextDaySub: CSSProperties;
  calendar: CSSProperties;
  calendarWrapper: CSSProperties;
  input: CSSProperties;
  main: CSSProperties;
  weekday: CSSProperties;
  weekWrapper: CSSProperties;
  weekRow: CSSProperties;
  yearBackground: CSSProperties;
  monthBackground: CSSProperties;
};

export interface TCalendarPosition {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export type TDateStyle = { bsDate: string; adDate: string };
