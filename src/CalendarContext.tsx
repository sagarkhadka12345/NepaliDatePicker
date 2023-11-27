// CalendarContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TCalendarPosition } from "./types";

const CalendarContext = createContext<
  | {
      selectedDate: Date | null;
      handleDateClick: (date: Date | string) => void;
      calendarPosition: TCalendarPosition;
      isCalendarOpen: boolean;
      handleOpenCalendar: (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>,
        ref: React.RefObject<HTMLDivElement> | null
      ) => void;
      calendarRef: React.RefObject<HTMLInputElement> | null;
    }
  | undefined
>({
  selectedDate: new Date(),
  handleDateClick: () => {},
  calendarPosition: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  isCalendarOpen: false,
  handleOpenCalendar: (
    _: React.MouseEvent<HTMLInputElement, MouseEvent>,
    __: React.RefObject<HTMLDivElement> | null
  ) => {},
  calendarRef: null,
});

export const CalendarProvider = ({ children }: any) => {
  const calendarRef = useRef<HTMLInputElement>(null);
  const [selectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentInput, setCurrentInput] = useState<HTMLInputElement>();
  const [calendarPosition, setCalendarPosition] = useState<TCalendarPosition>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const handleDateClick = (date: Date | string) => {
    // setSelectedDate(date);
    console.log(currentInput);

    if (currentInput) {
      if (typeof date == "string") {
        currentInput.type = "text";
        currentInput.readOnly = true;
        currentInput.value = date;
        currentInput.style.outline = "none";
        currentInput.style.border = "none";
        currentInput.style.cursor = "pointer";
      } else {
        currentInput.valueAsDate = date;
        currentInput.type == "date";
      }
    }
    setIsCalendarOpen(false);
  };

  const handleOpenCalendar = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();

    // const e = eInput.
    e.currentTarget &&
      setCalendarPosition({
        bottom: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        top: e.currentTarget.offsetTop,
        left: e.currentTarget.offsetLeft,
        right: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth,
      });

    e.currentTarget && setIsCalendarOpen(true);
    e.currentTarget && setCurrentInput(e.currentTarget);
  };
  const handleClickOutside = (event: MouseEvent) => {
    console.log(event, calendarRef.current);

    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setIsCalendarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  });
  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        handleDateClick,
        calendarPosition,
        handleOpenCalendar,
        isCalendarOpen,
        calendarRef,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
