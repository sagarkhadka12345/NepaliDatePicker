import React, { useState, useEffect, CSSProperties } from "react";
// import "./nepalidatepicker.css";
import nepaliDate from "./Date";
import { DateTime } from "luxon";
import lessThan from "./assets/less-than-svgrepo-com.svg";
import greaterThan from "./assets/greater-than-svgrepo-com.svg";
import useComponentVisible from "./useComponentVisible";
import { useCalendar } from "./CalendarContext";
function CalendarMain({
  defaultStyle,
}: {
  defaultStyle?: {
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
}) {
  const {
    calendarPosition,
    handleDateClick,
    isCalendarOpen,
    handleOpenCalendar,

    calendarRef,
  } = useCalendar();

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    console.log(e);

    handleOpenCalendar(e, calendarRef);
  };
  const date = DateTime.now();
  const NepaliDate = nepaliDate.getNepaliDate(date.year, date.month, date.day);
  const [isNepali, __] = useState(true);
  const [isLanguageofMainDateNepali, ___] = useState(false);
  const [month, setMonth] = useState(isNepali ? NepaliDate.month : date.month);
  const [year, setYear] = useState(isNepali ? NepaliDate.year : date.year);
  const firsEnglishDay = nepaliDate.getEnglishDate(year, month, 1);

  const [firstDay, setFirstDayInName] = useState(
    isNepali
      ? DateTime.fromJSDate(firsEnglishDay).weekday
      : DateTime.fromObject({
          day: 1,
          month: month,
          year: year,
        }).startOf("month").weekday
  );

  const [lastDay, setLastDayNumber] = useState(
    isNepali
      ? nepaliDate.NEPALI_YEARS[year][month - 1]
      : DateTime.fromObject({
          day: 1,
          month: month,
          year: year,
        }).endOf("month").day
  );

  useEffect(() => {
    setFirstDayInName(
      isNepali
        ? DateTime.fromJSDate(firsEnglishDay).weekday
        : DateTime.fromObject({
            day: 1,
            month: month,
            year: year,
          }).startOf("month").weekday
    );
    setLastDayNumber(
      isNepali
        ? nepaliDate.NEPALI_YEARS[year][month - 1]
        : DateTime.fromObject({
            day: 1,
            month: month,
            year: year,
          }).endOf("month").day
    );
  }, [year, month, isNepali]);
  let num = 0;
  let greaterday = 0;
  let lowerday = 1;
  const nepaliDates: Record<number, string> = {
    0: "०",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  };
  const handlePrevMonth = () => {
    if (month !== 1) {
      setMonth((prev) => prev - 1);
    } else {
      setYear((prev) => prev - 1);
      setMonth(12);
    }
  };

  const handleNextMonth = () => {
    if (month !== 12) {
      setMonth((prev) => prev + 1);
    } else {
      setYear((prev) => prev + 1);
      setMonth(1);
    }
  };

  const [selected, setSelected] = useState<
    | {
        year: number;
        month: number;
        day: number;
      }
    | undefined
  >();
  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    year: number,
    month: number
  ) => {
    setSelected({
      year: year,
      month: month,
      day: +e.currentTarget.value,
    });
    handleDateClick(
      isNepali
        ? `${year}-${month}-${+e.currentTarget.value}`
        : DateTime.fromObject({
            year: year,
            month: month,
            day: +e.currentTarget.value,
          }).toJSDate()
    );
  };

  // const handleToggle = () => {
  //   if (isNepali) {
  //     setYear(DateTime.now().year);
  //     setMonth(DateTime.now().month);
  //     setSelected(
  //       selected
  //         ? {
  //             year: nepaliDate
  //               .getEnglishDate(selected?.year, selected?.month, selected?.day)
  //               .getFullYear(),
  //             month:
  //               nepaliDate
  //                 .getEnglishDate(
  //                   selected?.year,
  //                   selected?.month,
  //                   selected?.day
  //                 )
  //                 .getMonth() + 1,
  //             day: nepaliDate
  //               .getEnglishDate(selected?.year, selected?.month, selected?.day)
  //               .getDate(),
  //           }
  //         : undefined
  //     );
  //   } else {
  //     setYear(NepaliDate.year);
  //     setMonth(NepaliDate.month);
  //     setSelected(
  //       selected
  //         ? {
  //             year: nepaliDate.getNepaliDate(
  //               selected?.year,
  //               selected?.month,
  //               selected?.day
  //             ).year,
  //             month: nepaliDate.getNepaliDate(
  //               selected?.year,
  //               selected?.month,
  //               selected?.day
  //             ).month,
  //             day: nepaliDate.getNepaliDate(
  //               selected?.year,
  //               selected?.month,
  //               selected?.day
  //             ).day,
  //           }
  //         : undefined
  //     );
  //   }
  //   setIsNepali((prev) => !prev);
  // };
  const [_, setSelectedDateInBS] = useState("");
  const [selectedDateInAD, setSelectedDateInAD] = useState("");
  useEffect(() => {
    let np = selected
      ? nepaliDate.getNepaliDate(selected.year, selected.month, selected.day)
      : nepaliDate.getNepaliDate(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        );
    let ad = selected
      ? nepaliDate.getEnglishDate(selected.year, selected.month, selected.day)
      : new Date();
    setSelectedDateInBS(
      selected
        ? isNepali
          ? `${selected?.year}` + "-" + selected?.month + "-" + selected?.day
          : np.year + "-" + np.month + "-" + np.day
        : ""
    );
    setSelectedDateInAD(
      selected
        ? isNepali
          ? ad.getFullYear() + "-" + (ad.getMonth() + 1) + "-" + ad.getDate()
          : selected.year + "-" + selected.month + "-" + selected.day
        : ""
    );
  }, [selected?.year, selected?.month, selected?.day]);
  console.log(selectedDateInAD);
  const [showNepaliMonth, setShowNepaliMonth] = useState(false);
  const [showNepaliYear, setShowNepaliYear] = useState(false);

  const handleShowYear: (item: boolean) => {} = (item: boolean) => {
    setShowNepaliYear(item);
    return {};
  };
  const handleShowMonth: (item: boolean) => {} = (item: boolean) => {
    setShowNepaliMonth(item);
    return {};
  };
  const { ref } = useComponentVisible(handleShowYear);
  const monthREf = useComponentVisible(handleShowMonth);
  const scrollTo = (ref: HTMLDivElement) => {
    if (ref && ref /* + other conditions */) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <input onClick={handleClick} type="date" />

      {isCalendarOpen && (
        <div
          className={`nepali-date-picker-overflow-hidden nepali-date-picker-w-max nepali-date-picker-h-max nepali-date-picker-absolute nepali-date-picker-left-[${calendarPosition.left}px] nepali-date-picker-top-[${calendarPosition.top}px]`}
          style={{
            left: `${calendarPosition.left}px`,
            top: `${calendarPosition.bottom}px`,
            ...defaultStyle?.main,
          }}
          ref={calendarRef}
        >
          <div
            className=" nepali-date-picker-h-full nepali-date-picker-flex nepali-date-picker-justify-center nepali-date-picker-items-center nepali-date-picker-flex-col nepali-date-picker-overflow-hidden"
            style={defaultStyle?.calendarWrapper}
          >
            {/* <div className="nepali-date-picker-flex nepali-date-picker-justify-between nepali-date-picker-items-center nepali-date-picker-rounded-sm nepali-date-picker-shadow-md">
              <div onClick={handleToggle} className="nepali-date-picker-cursor-pointer">
                Toggle Date
              </div>
              <div
                onClick={() => setisLanguageOfMainDateNepali((prev) => !prev)}
                className="nepali-date-picker-cursor-pointer"
              >
                Toggle Main Date Language
              </div>
            </div> */}

            <div
              className={
                "nepali-date-picker-flex nepali-date-picker-justify-center nepali-date-picker-items-center nepali-date-picker-flex-col nepali-date-picker-rounded-xl nepali-date-picker-overflow-visible nepali-date-picker-shadow-md nepali-date-picker-relative  "
              }
              style={defaultStyle?.calendar}
            >
              <div className="nepali-date-picker-w-full nepali-date-picker-py-2 nepali-date-picker-flex nepali-date-picker-items-center nepali-date-picker-justify-center nepali-date-picker-bg-[#B670F4]  ">
                <div
                  className="nepali-date-picker-flex-[0.5] nepali-date-picker-text-xl nepali-date-picker-text-gray-400 nepali-date-picker-font-extrabold nepali-date-picker-h-full nepali-date-picker-flex nepali-date-picker-justify-center nepali-date-picker-items-center nepali-date-picker-cursor-pointer"
                  onClick={handlePrevMonth}
                >
                  <img
                    src={lessThan}
                    width={"100%"}
                    height={"100%"}
                    className="nepali-date-picker-h-6 nepali-date-picker-w-6 nepali-date-picker-fill-gray-400"
                  />
                </div>
                <div className=" nepali-date-picker-flex-1 nepali-date-picker-h-full nepali-date-picker-flex  nepali-date-picker-justify-center nepali-date-picker-items-center nepali-date-picker-ganepali-date-picker-p-2">
                  <div
                    className="nepali-date-picker-text-[2rem] nepali-date-picker-text-white nepali-date-picker-cursor-pointer"
                    onClick={() => setShowNepaliMonth(true)}
                  >
                    {!isNepali
                      ? nepaliDate.ENGLISH_MONTH[month - 1]
                      : nepaliDate.NEPALI_MONTH[month - 1]}
                  </div>
                  <div
                    className="nepali-date-picker-text-[.7rem]  nepali-date-picker-font-extrabold mt-6 nepali-date-picker-text-gray-200 nepali-date-picker-cursor-pointer"
                    onClick={() => setShowNepaliYear(true)}
                  >
                    {year}
                  </div>
                </div>
                <div
                  className="nepali-date-picker-flex-[0.5] nepali-date-picker-text-xl nepali-date-picker-text-gray-400 nepali-date-picker-font-extrabold nepali-date-picker-h-full nepali-date-picker-flex nepali-date-picker-justify-center nepali-date-picker-items-center nepali-date-picker-cursor-pointer"
                  onClick={handleNextMonth}
                >
                  <img
                    src={greaterThan}
                    width={"100%"}
                    height={"100%"}
                    className="nepali-date-picker-h-6 nepali-date-picker-w-6 nepali-date-picker-fill-gray-400"
                  />
                </div>
              </div>
              <div
                className="nepali-date-picker-flex nepali-date-picker-items-center nepali-date-picker-justify-center nepali-date-picker-w-full nepali-date-picker-bg-[#B670F4]  nepali-date-picker-overflow-hidden"
                style={defaultStyle?.weekWrapper}
              >
                {(isNepali
                  ? nepaliDate.ENLISH_WEEK_SHORT
                  : nepaliDate.NEPALI_WEEK_SHORT
                ).map((item) => (
                  <button
                    className="nepali-date-picker-flex-1 nepali-date-picker-flex nepali-date-picker-justify-center nepali-date-picker-items-center w-8 h-12 nepali-date-picker-text-sm nepali-date-picker-border-none nepali-date-picker-outline-none nepali-date-picker-border-0 nepali-date-picker-rounded-none"
                    key={item}
                    style={defaultStyle?.weekday}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {!isNepali ? (
                <>
                  <div
                    className="nepali-date-picker-grid nepali-date-picker-grid-cols-7"
                    style={defaultStyle?.weekRow}
                  >
                    {Array.from(Array(42)).map((_, index) => {
                      if (index >= firstDay && num < lastDay) {
                        num++;
                        const todaySelectedEN =
                          month == DateTime.now().month &&
                          year == DateTime.now().year &&
                          num === DateTime.now().day &&
                          month == (selected && selected.month) &&
                          year == (selected && selected.year) &&
                          num === (selected && selected.day);
                        const selectedEN =
                          month == (selected && selected.month) &&
                          year == (selected && selected.year) &&
                          num === (selected && selected.day);
                        const todayEN =
                          month == DateTime.now().month &&
                          year == DateTime.now().year &&
                          num === DateTime.now().day;
                        return (
                          <button
                            onClick={(e) => handleSelect(e, year, month)}
                            key={index}
                            value={num}
                            className={
                              !todaySelectedEN && !todayEN && !selectedEN
                                ? `nepali-date-picker-w-12 nepali-date-picker-h-8 nepali-date-picker-flex nepali-date-picker-p-0 nepali-date-picker-m-0 nepali-date-picker-items-center nepali-date-picker-relative nepali-date-picker-overflow-visible 
                        nepali-date-picker-border-none nepali-date-picker-outline-none hover:nepali-date-picker-border-none hover:nepali-date-picker-outline-none hover:nepali-date-picker-bg-slate-300 `
                                : `nepali-date-picker-w-12 nepali-date-picker-h-8 nepali-date-picker-flex nepali-date-picker-p-0 nepali-date-picker-m-0 nepali-date-picker-items-center nepali-date-picker-relative nepali-date-picker-overflow-visible 
                        nepali-date-picker-border-none nepali-date-picker-outline-none hover:nepali-date-picker-border-none hover:nepali-date-picker-outline-none `
                            }
                          >
                            <div
                              className={
                                (todaySelectedEN
                                  ? "nepali-date-picker-bg-[#B670F4] nepali-date-picker-z-10 h-10 w-10 nepali-date-picker-rounded-full nepali-date-picker-overflow-hidden nepali-date-picker-border-red-300"
                                  : todayEN
                                  ? " nepali-date-picker-text-white nepali-date-picker-rounded-full nepali-date-picker-bg-[#B670F4] nepali-date-picker-z-10 h-10 w-10"
                                  : selectedEN
                                  ? "nepali-date-picker-bg-[#B670F4] nepali-date-picker-z-10 h-10 w-10 nepali-date-picker-rounded-full nepali-date-picker-overflow-hidden"
                                  : " nepali-date-picker-rounded-none nepali-date-picker-border-none nepali-date-picker-w-12 ") +
                                " nepali-date-picker-flex-1  nepali-date-picker-h-8 nepali-date-picker-text-base nepali-date-picker-absolute  nepali-date-picker-outline-none hover:nepali-date-picker-outline-none hover:nepali-date-picker-border-none nepali-date-picker-flex nepali-date-picker-justify-center transition-all  nepali-date-picker-items-center nepali-date-picker-p-2 nepali-date-picker-m-0 "
                              }
                              style={defaultStyle?.dayMain}
                            >
                              {isLanguageofMainDateNepali ? (
                                <>
                                  {num
                                    .toString()
                                    .split("")
                                    .map((item) => nepaliDates[parseInt(item)])
                                    .join("")}
                                  <span
                                    className="nepali-date-picker-text-[.57rem]
                                   nepali-date-picker-text-gray-500 nepali-date-picker-font-extrabold nepali-date-picker-absolute nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem]"
                                    style={defaultStyle?.daySub}
                                  >
                                    {
                                      nepaliDate.getNepaliDate(year, month, num)
                                        .day
                                    }
                                  </span>
                                </>
                              ) : (
                                <>
                                  {num}
                                  <span
                                    className="nepali-date-picker-text-[.57rem]
                                   nepali-date-picker-text-gray-500 nepali-date-picker-font-extrabold nepali-date-picker-absolute nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem]"
                                    style={defaultStyle?.daySub}
                                  >
                                    {nepaliDate
                                      .getNepaliDate(year, month, num)
                                      .day.toString()
                                      .split("")
                                      .map(
                                        (item) => nepaliDates[parseInt(item)]
                                      )
                                      .join("")}
                                  </span>
                                </>
                              )}
                            </div>
                          </button>
                        );
                      } else if (index >= lastDay) {
                        greaterday = greaterday + 1;

                        return (
                          <button
                            // onClick={handleSelect}
                            key={index + date.toLocaleString()}
                            className="nepali-date-picker-flex-1 nepali-date-picker-w-12 nepali-date-picker-h-8 nepali-date-picker-text-base nepali-date-picker-relative  
                nepali-date-picker-border-none nepali-date-picker-outline-none nepali-date-picker-flex nepali-date-picker-justify-center nepali-date-picker-items-center nepali-date-picker-p-2 nepali-date-picker-m-0 nepali-date-picker-rounded-none nepali-date-picker-text-gray-400"
                            value={num}
                            onClick={handleNextMonth}
                            style={defaultStyle?.nextDayMain}
                          >
                            {isLanguageofMainDateNepali ? (
                              <>
                                {greaterday
                                  .toString()
                                  .split("")
                                  .map((item) => nepaliDates[parseInt(item)])
                                  .join("")}
                                <span
                                  className="nepali-date-picker-text-[.57rem]
                                 nepali-date-picker-text-gray-300 nepali-date-picker-font-extrabold nepali-date-picker-absolute nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem]"
                                  style={defaultStyle?.nextDaySub}
                                >
                                  {
                                    nepaliDate.getNepaliDate(
                                      year,
                                      month + 1,
                                      greaterday
                                    ).day
                                  }
                                </span>
                              </>
                            ) : (
                              <>
                                {greaterday}
                                <span
                                  className="nepali-date-picker-text-[.57rem]
                                 nepali-date-picker-text-gray-300 nepali-date-picker-font-extrabold nepali-date-picker-absolute nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem]"
                                  style={defaultStyle?.nextDaySub}
                                >
                                  {nepaliDate
                                    .getNepaliDate(year, month + 1, greaterday)
                                    .day.toString()
                                    .split("")
                                    .map((item) => nepaliDates[parseInt(item)])
                                    .join("")}
                                </span>
                              </>
                            )}
                          </button>
                        );
                      } else {
                        lowerday++;

                        return (
                          <button
                            // onClick={handleSelect}
                            key={index + date.toLocaleString()}
                            className="nepali-date-picker-flex-1 nepali-date-picker-w-12 nepali-date-picker-h-8 nepali-date-picker-text-base nepali-date-picker-relative  
                nepali-date-picker-border-none nepali-date-picker-outline-none nepali-date-picker-flex nepali-date-picker-justify-center nepali-date-picker-items-center nepali-date-picker-p-2 nepali-date-picker-m-0 nepali-date-picker-rounded-none nepali-date-picker-text-gray-400"
                            value={num}
                            onClick={handlePrevMonth}
                            style={defaultStyle?.prevDayMain}
                          >
                            {isLanguageofMainDateNepali ? (
                              <>
                                {(
                                  DateTime.fromObject({
                                    year: year,
                                    month: month - 1,
                                    day: 1,
                                  }).endOf("month").day -
                                  (firstDay - (index + 1))
                                )
                                  .toString()
                                  .split("")
                                  .map((item) => nepaliDates[parseInt(item)])
                                  .join("")}
                                {
                                  <span
                                    className="nepali-date-picker-text-[.57rem]
                                   nepali-date-picker-text-gray-300 nepali-date-picker-font-extrabold nepali-date-picker-absolute nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem] "
                                    style={defaultStyle?.prevDaySub}
                                  >
                                    {month == 1
                                      ? nepaliDate.getNepaliDate(
                                          year - 1,
                                          12,
                                          DateTime.fromObject({
                                            year: year - 1,
                                            month: 12,
                                            day: 1,
                                          }).endOf("month").day -
                                            (firstDay - (index + 1))
                                        ).day
                                      : nepaliDate.getNepaliDate(
                                          year,
                                          month - 1,
                                          DateTime.fromObject({
                                            year: year,
                                            month: month - 1,
                                            day: 1,
                                          }).endOf("month").day -
                                            (firstDay - (index + 1))
                                        ).day}
                                  </span>
                                }
                              </>
                            ) : (
                              <>
                                {DateTime.fromObject({
                                  year: year,
                                  month: month - 1,
                                  day: 1,
                                }).endOf("month").day -
                                  (firstDay - (index + 1))}
                                {
                                  <span
                                    className="nepali-date-picker-text-[.57rem] nepali-date-picker-text-gray-300 nepali-date-picker-font-extrabold 
                                  nepali-date-picker-absolute nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem] "
                                    style={defaultStyle?.prevDaySub}
                                  >
                                    {(month == 1
                                      ? nepaliDate.getNepaliDate(
                                          year - 1,
                                          12,
                                          DateTime.fromObject({
                                            year: year - 1,
                                            month: 12,
                                            day: 1,
                                          }).endOf("month").day -
                                            (firstDay - (index + 1))
                                        ).day
                                      : nepaliDate.getNepaliDate(
                                          year,
                                          month - 1,
                                          DateTime.fromObject({
                                            year: year,
                                            month: month - 1,
                                            day: 1,
                                          }).endOf("month").day -
                                            (firstDay - (index + 1))
                                        ).day
                                    )
                                      .toString()
                                      .split("")
                                      .map(
                                        (item) => nepaliDates[parseInt(item)]
                                      )
                                      .join("")}
                                  </span>
                                }
                              </>
                            )}
                          </button>
                        );
                      }
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="nepali-date-picker-grid nepali-date-picker-grid-cols-7"
                    style={defaultStyle?.weekRow}
                  >
                    {Array.from(Array(42)).map((_, index) => {
                      if (index >= firstDay && num < lastDay) {
                        num++;
                        const todaySelectionNP =
                          month == NepaliDate.month &&
                          year == NepaliDate.year &&
                          num === NepaliDate.day &&
                          month == (selected && selected.month) &&
                          year == (selected && selected.year) &&
                          num === (selected && selected.day);

                        const todayNP =
                          month == NepaliDate.month &&
                          year == NepaliDate.year &&
                          num === NepaliDate.day;
                        const selectionNP =
                          month == (selected && selected.month) &&
                          year == (selected && selected.year) &&
                          num === (selected && selected.day);

                        return (
                          <button
                            onClick={(e) => handleSelect(e, year, month)}
                            key={index}
                            value={num}
                            className={
                              !todaySelectionNP && !todayNP && !selectionNP
                                ? `nepali-date-picker-w-12 nepali-date-picker-h-8 nepali-date-picker-flex nepali-date-picker-p-0 nepali-date-picker-m-0 nepali-date-picker-items-center nepali-date-picker-relative nepali-date-picker-overflow-visible 
                        nepali-date-picker-border-none nepali-date-picker-outline-none hover:nepali-date-picker-border-none hover:nepali-date-picker-outline-none hover:nepali-date-picker-bg-slate-300`
                                : `nepali-date-picker-w-12 nepali-date-picker-h-8 nepali-date-picker-flex nepali-date-picker-p-0 nepali-date-picker-m-0 nepali-date-picker-items-center nepali-date-picker-relative nepali-date-picker-overflow-visible 
                        nepali-date-picker-border-none nepali-date-picker-outline-none hover:nepali-date-picker-border-none hover:nepali-date-picker-outline-none `
                            }
                          >
                            <div
                              className={
                                (todaySelectionNP
                                  ? "nepali-date-picker-text-white max-nepali-date-picker-w-12 h-10 w-10 nepali-date-picker-rounded-full nepali-date-picker-bg-[#B670F4] nepali-date-picker-z-10 nepali-date-picker-border-red-300"
                                  : todayNP
                                  ? "nepali-date-picker-text-white max-nepali-date-picker-w-12 h-10 w-10 nepali-date-picker-rounded-full nepali-date-picker-bg-[#B670F4] nepali-date-picker-z-10"
                                  : selectionNP
                                  ? "nepali-date-picker-bg-[#B670F4] nepali-date-picker-z-10 max-nepali-date-picker-w-12 h-10 w-10 nepali-date-picker-rounded-full nepali-date-picker-overflow-hidden"
                                  : "nepali-date-picker-w-full nepali-date-picker-h-full nepali-date-picker-rounded-none nepali-date-picker-border-none") +
                                " nepali-date-picker-flex-1  nepali-date-picker-text-base   nepali-date-picker-outline-none nepali-date-picker-flex  transition-all  nepali-date-picker-items-center nepali-date-picker-p-2 nepali-date-picker-m-0  nepali-date-picker-absolute"
                              }
                              style={defaultStyle?.dayMain}
                            >
                              {isLanguageofMainDateNepali ? (
                                <>
                                  {num
                                    .toString()
                                    .split("")
                                    .map((item) => nepaliDates[parseInt(item)])
                                    .join("")}
                                  {
                                    <span
                                      className="nepali-date-picker-text-[.57rem]  nepali-date-picker-font-extrabold 
                                    nepali-date-picker-absolute nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem]"
                                      style={defaultStyle?.daySub}
                                    >
                                      {nepaliDate
                                        .getEnglishDate(year, month, num)
                                        .getDate()}
                                    </span>
                                  }
                                </>
                              ) : (
                                <>
                                  {num}
                                  {
                                    <span
                                      className="nepali-date-picker-text-[.57rem] nepali-date-picker-font-extrabold nepali-date-picker-absolute nepali-date-picker-bottom-[.13rem]
                                     nepali-date-picker-right-[.3rem]"
                                      style={defaultStyle?.daySub}
                                    >
                                      {nepaliDate
                                        .getEnglishDate(year, month, num)
                                        .getDate()
                                        .toString()
                                        .split("")
                                        .map(
                                          (item) => nepaliDates[parseInt(item)]
                                        )
                                        .join("")}
                                    </span>
                                  }
                                </>
                              )}
                            </div>
                          </button>
                        );
                      } else if (index >= lastDay) {
                        greaterday++;
                        return (
                          <button
                            // onClick={handleSelect}
                            key={index + date.toLocaleString()}
                            className="nepali-date-picker-flex-1 nepali-date-picker-w-12 nepali-date-picker-h-8 nepali-date-picker-text-base nepali-date-picker-relative  
              nepali-date-picker-border-none nepali-date-picker-outline-none nepali-date-picker-flex nepali-date-picker-justify-start  nepali-date-picker-items-center nepali-date-picker-p-2 nepali-date-picker-m-0 nepali-date-picker-rounded-none nepali-date-picker-text-gray-400 "
                            value={num}
                            onClick={handleNextMonth}
                            style={defaultStyle?.nextDayMain}
                          >
                            {isLanguageofMainDateNepali ? (
                              <>
                                {greaterday
                                  .toString()
                                  .split("")
                                  .map((item) => nepaliDates[parseInt(item)])
                                  .join("")}
                                {
                                  <span
                                    className="nepali-date-picker-text-[.57rem] nepali-date-picker-text-gray-300 nepali-date-picker-font-extrabold nepali-date-picker-absolute 
                                  nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem]"
                                    style={defaultStyle?.nextDaySub}
                                  >
                                    {month == 12
                                      ? nepaliDate
                                          .getEnglishDate(
                                            year + 1,
                                            1,
                                            greaterday
                                          )
                                          .getDate()
                                      : nepaliDate
                                          .getEnglishDate(
                                            year,
                                            month + 1,
                                            greaterday
                                          )
                                          .getDate()}
                                  </span>
                                }
                              </>
                            ) : (
                              <>
                                {greaterday}
                                {console.log(year, month + 1, greaterday)}
                                {
                                  <span
                                    className="nepali-date-picker-text-[.57rem] nepali-date-picker-text-gray-300 nepali-date-picker-font-extrabold nepali-date-picker-absolute
                                   nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem]"
                                    style={defaultStyle?.nextDaySub}
                                  >
                                    {(month == 12
                                      ? nepaliDate
                                          .getEnglishDate(
                                            year + 1,
                                            1,
                                            greaterday
                                          )
                                          .getDate()
                                      : nepaliDate
                                          .getEnglishDate(
                                            year,
                                            month + 1,
                                            greaterday
                                          )
                                          .getDate()
                                    )
                                      .toString()
                                      .split("")
                                      .map(
                                        (item) => nepaliDates[parseInt(item)]
                                      )
                                      .join("")}
                                  </span>
                                }
                              </>
                            )}
                          </button>
                        );
                      } else {
                        lowerday++;

                        return (
                          <button
                            key={index + date.toLocaleString()}
                            className="nepali-date-picker-flex-1 nepali-date-picker-w-12 nepali-date-picker-h-8 nepali-date-picker-text-base nepali-date-picker-relative  
              nepali-date-picker-border-none nepali-date-picker-outline-none nepali-date-picker-flex nepali-date-picker-justify-start  nepali-date-picker-items-center nepali-date-picker-p-2 nepali-date-picker-m-0 nepali-date-picker-rounded-none nepali-date-picker-text-gray-400 "
                            value={num}
                            onClick={handlePrevMonth}
                            style={defaultStyle?.prevDayMain}
                          >
                            {isLanguageofMainDateNepali ? (
                              <>
                                {(
                                  nepaliDate.NEPALI_YEARS[year][month - 1] -
                                  (firstDay - (index + 1))
                                )
                                  .toString()
                                  .split("")
                                  .map((item) => nepaliDates[parseInt(item)])
                                  .join("")}
                                {
                                  <span
                                    className="nepali-date-picker-text-[.57rem] nepali-date-picker-text-gray-300 nepali-date-picker-font-extrabold nepali-date-picker-absolute
                                   nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem] "
                                    style={defaultStyle?.prevDaySub}
                                  >
                                    {month == 1
                                      ? nepaliDate
                                          .getEnglishDate(
                                            year - 1,
                                            11,
                                            nepaliDate.NEPALI_YEARS[
                                              year - 1
                                            ][11] -
                                              (firstDay - (index + 1))
                                          )
                                          .getDate()
                                      : nepaliDate
                                          .getEnglishDate(
                                            year,
                                            month - 1,
                                            nepaliDate.NEPALI_YEARS[year][
                                              month - 2
                                            ] -
                                              (firstDay - (index + 1))
                                          )
                                          .getDate()}
                                  </span>
                                }
                              </>
                            ) : (
                              <>
                                {month == 1
                                  ? nepaliDate.NEPALI_YEARS[year - 1][11] -
                                    (firstDay - (index + 1))
                                  : nepaliDate.NEPALI_YEARS[year][month - 2] -
                                    (firstDay - (index + 1))}

                                {
                                  <span
                                    className="nepali-date-picker-text-[.57rem] nepali-date-picker-text-gray-300 nepali-date-picker-font-extrabold nepali-date-picker-absolute 
                                  nepali-date-picker-bottom-[.13rem] nepali-date-picker-right-[.3rem] "
                                    style={defaultStyle?.prevDaySub}
                                  >
                                    {(month == 1
                                      ? nepaliDate
                                          .getEnglishDate(
                                            year - 1,
                                            12,
                                            nepaliDate.NEPALI_YEARS[
                                              year - 1
                                            ][11] -
                                              (firstDay - (index + 1))
                                          )
                                          .getDate()
                                      : nepaliDate
                                          .getEnglishDate(
                                            year,
                                            month - 1,
                                            nepaliDate.NEPALI_YEARS[year][
                                              month - 2
                                            ] -
                                              (firstDay - (index + 1))
                                          )
                                          .getDate()
                                    )
                                      .toString()
                                      .split("")
                                      .map(
                                        (item) => nepaliDates[parseInt(item)]
                                      )
                                      .join("")}
                                  </span>
                                }
                              </>
                            )}
                          </button>
                        );
                      }
                    })}
                  </div>
                </>
              )}
              {showNepaliMonth && (
                <div
                  className="nepali-date-picker-absolute nepali-date-picker-inset-0 nepali-date-picker-bg-gray-500 nepali-date-picker-bg-opacity-60 nepali-date-picker-h-full nepali-date-picker-p-2 nepali-date-picker-z-20"
                  style={defaultStyle?.monthBackground}
                >
                  <div
                    className="nepali-date-picker-flex nepali-date-picker-flex-col nepali-date-picker-absolute nepali-date-picker-left-[50%] nepali-date-picker-top-[50%] nepali-date-picker-w-24 nepali-date-picker-justify-center nepali-date-picker-items-center  nepali-date-picker-bg-slate-50 nepali-date-picker-py-2 nepali-date-picker-px-8"
                    style={{
                      transform: "translate(-50%, -50%)",
                      ...defaultStyle?.monthWrapper,
                    }}
                    ref={monthREf.ref}
                  >
                    {isNepali
                      ? nepaliDate.NEPALI_MONTH.map((item) => (
                          <div
                            className="nepali-date-picker-flex-1 nepali-date-picker-text-sm nepali-date-picker-py-[.1rem] hover:nepali-date-picker-text-lg hover:nepali-date-picker-py-1 nepali-date-picker-cursor-pointer nepali-date-picker-font-light hover:nepali-date-picker-font-semibold"
                            key={item}
                            style={defaultStyle?.month}
                          >
                            {item}
                          </div>
                        ))
                      : nepaliDate.ENGLISH_MONTH.map((item) => (
                          <div
                            className="nepali-date-picker-flex-1 nepali-date-picker-text-sm nepali-date-picker-py-[.1rem] hover:nepali-date-picker-text-lg hover:nepali-date-picker-py-1 nepali-date-picker-cursor-pointer nepali-date-picker-font-light hover:nepali-date-picker-font-semibold"
                            key={item}
                            style={defaultStyle?.month}
                          >
                            {item}
                          </div>
                        ))}
                  </div>
                </div>
              )}
              {showNepaliYear && (
                <div
                  className="nepali-date-picker-absolute nepali-date-picker-inset-0 nepali-date-picker-bg-gray-500 nepali-date-picker-bg-opacity-60 nepali-date-picker-h-full  nepali-date-picker-overflow-scroll nepali-date-picker-overflow-x-hidden
             nepali-date-picker-z-20"
                  style={defaultStyle?.yearBackground}
                >
                  {showNepaliYear && (
                    <div
                      className="yeardiv nepali-date-picker-flex nepali-date-picker-flex-col  nepali-date-picker-absolute nepali-date-picker-left-[50%]   nepali-date-picker-w-24 nepali-date-picker-justify-center nepali-date-picker-items-center  nepali-date-picker-bg-slate-50 nepali-date-picker-py-2 nepali-date-picker-px-8"
                      style={{
                        transform: "translateX(-50%)",
                        ...defaultStyle?.yearWrapper,
                      }}
                      ref={ref}
                    >
                      <div>
                        {isNepali
                          ? Object.keys(nepaliDate.NEPALI_YEARS).map((item) =>
                              year === +item ? (
                                <div
                                  className="nepali-date-picker-flex-1 nepali-date-picker-text-sm nepali-date-picker-py-[.1rem] nepali-date-picker-font-semibold hover:nepali-date-picker-text-lg hover:nepali-date-picker-py-1 nepali-date-picker-cursor-pointer  hover:nepali-date-picker-font-semibold"
                                  key={item}
                                  style={defaultStyle?.yearActive}
                                  ref={scrollTo}
                                >
                                  {item}
                                </div>
                              ) : (
                                <div
                                  className="nepali-date-picker-flex-1 nepali-date-picker-text-sm nepali-date-picker-py-[.1rem] hover:nepali-date-picker-text-lg hover:nepali-date-picker-py-1 nepali-date-picker-cursor-pointer nepali-date-picker-font-light hover:nepali-date-picker-font-semibold"
                                  key={item}
                                  style={defaultStyle?.year}
                                  // ref={scrollTo}
                                >
                                  {item}
                                </div>
                              )
                            )
                          : Array.from(
                              Array(nepaliDate.END_EN - nepaliDate.START_EN)
                            ).map((item, index) => {
                              console.log(index + nepaliDate.START_EN);

                              return year === +index + nepaliDate.START_EN ? (
                                <div
                                  className="nepali-date-picker-flex-1 nepali-date-picker-text-sm nepali-date-picker-py-[.1rem] nepali-date-picker-font-semibold hover:nepali-date-picker-text-lg hover:nepali-date-picker-py-1 nepali-date-picker-cursor-pointer  hover:nepali-date-picker-font-semibold"
                                  key={item}
                                  ref={scrollTo}
                                  style={defaultStyle?.yearActive}
                                >
                                  {index + nepaliDate.START_EN}
                                </div>
                              ) : (
                                <div
                                  className="nepali-date-picker-flex-1 nepali-date-picker-text-sm nepali-date-picker-py-[.1rem] hover:nepali-date-picker-text-lg hover:nepali-date-picker-py-1 nepali-date-picker-cursor-pointer nepali-date-picker-font-light hover:nepali-date-picker-font-semibold"
                                  key={index + nepaliDate.START_EN}
                                  // ref={scrollTo}
                                  style={defaultStyle?.year}
                                >
                                  {index + nepaliDate.START_EN}
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CalendarMain;
