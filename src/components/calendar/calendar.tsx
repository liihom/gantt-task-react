import React, { ReactChild } from "react";
import { ViewMode } from "../../types/public-types";
import { TopPartOfCalendar } from "./top-part-of-calendar";
import {
  getCachedDateTimeFormat,
  // getDaysInMonth,
  getLocalDayOfWeek,
  getLocaleMonth,
  getWeekNumberISO8601,
} from "../../helpers/date-helper";
import { DateSetup } from "../../types/date-setup";
import styles from "./calendar.module.css";

export type CalendarProps = {
  dateSetup: DateSetup;
  locale: string;
  viewMode: ViewMode;
  rtl: boolean;
  headerHeight: number;
  columnWidth: number;
  fontFamily: string;
  fontSize: string;
};

export const Calendar: React.FC<CalendarProps> = ({
  dateSetup,
  locale,
  viewMode,
  rtl,
  headerHeight,
  columnWidth,
  fontFamily,
  fontSize,
}) => {
  const getCalendarValuesForYear = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      const bottomValue = new Date(date.date).getFullYear();
      bottomValues.push(
        <text
          key={new Date(date.date).getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      );
      if (
        i === 0 ||
        new Date(date.date).getFullYear() !==
          new Date(dateSetup.dates[i - 1].date).getFullYear()
      ) {
        const topValue = new Date(date.date).getFullYear().toString();
        let xText: number;
        if (rtl) {
          xText = (6 + i + new Date(date.date).getFullYear() + 1) * columnWidth;
        } else {
          xText = (6 + i - new Date(date.date).getFullYear()) * columnWidth;
        }
        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={headerHeight}
            xText={xText}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForQuarterYear = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      // const bottomValue = getLocaleMonth(date, locale);
      const quarter =
        "Q" + Math.floor((new Date(date.date).getMonth() + 3) / 3);
      bottomValues.push(
        <text
          key={new Date(date.date).getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
        >
          {quarter}
        </text>
      );
      if (
        i === 0 ||
        new Date(date.date).getFullYear() !==
          new Date(dateSetup.dates[i - 1].date).getFullYear()
      ) {
        const topValue = new Date(date.date).getFullYear().toString();
        let xText: number;
        if (rtl) {
          xText = (6 + i + new Date(date.date).getMonth() + 1) * columnWidth;
        } else {
          xText = (6 + i - new Date(date.date).getMonth()) * columnWidth;
        }
        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={Math.abs(xText)}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForMonth = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      const bottomValue = getLocaleMonth(new Date(date.date), locale);
      bottomValues.push(
        <text
          key={bottomValue + new Date(date.date).getFullYear()}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={[
            styles.calendarBottomText,
            date.flag ? styles.disabled : "",
          ].join(" ")}
        >
          {bottomValue}
        </text>
      );
      if (
        i === 0 ||
        new Date(date.date).getFullYear() !==
          new Date(dateSetup.dates[i - 1].date).getFullYear()
      ) {
        const topValue = new Date(date.date).getFullYear().toString();
        let xText: number;
        if (rtl) {
          xText = (6 + i + new Date(date.date).getMonth() + 1) * columnWidth;
        } else {
          xText = (6 + i - new Date(date.date).getMonth()) * columnWidth;
        }
        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={xText}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForWeek = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    let weeksCount: number = 1;
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = dates[i];
      let topValue = "";
      if (
        i === 0 ||
        new Date(date.date).getMonth() !==
          new Date(dates[i - 1].date).getMonth()
      ) {
        // top
        topValue = `${getLocaleMonth(new Date(date.date), locale)}, ${new Date(
          date.date
        ).getFullYear()}`;
      }
      // bottom
      const bottomValue = `W${getWeekNumberISO8601(new Date(date.date))}`;

      bottomValues.push(
        <text
          key={new Date(date.date).getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      );

      if (topValue) {
        // if last day is new month
        if (i !== dates.length - 1) {
          topValues.push(
            <TopPartOfCalendar
              key={topValue}
              value={topValue}
              x1Line={columnWidth * i + weeksCount * columnWidth}
              y1Line={0}
              y2Line={topDefaultHeight}
              xText={columnWidth * i + columnWidth * weeksCount * 0.5}
              yText={topDefaultHeight * 0.9}
            />
          );
        }
        weeksCount = 0;
      }
      weeksCount++;
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForDay = () => {
    const topValues: ReactChild[] = [];
    const topValueNumbers: {
      month: number;
      value: string;
      date: string;
      idx: number;
    }[] = [];
    const bottomValues: ReactChild[] = [];
    // const topDefaultHeight = headerHeight * 0.5;
    const topDefaultHeight = headerHeight;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      // const bottomValue = `${getLocalDayOfWeek(
      //   new Date(date.date),
      //   locale,
      //   "short"
      // )}, ${new Date(date.date).getDate().toString()}`;
      const isToday =
        new Date(date.date).toDateString() === new Date().toDateString();
      const bottomValue = isToday
        ? "今天"
        : `${new Date(date.date).getDate().toString()}`;

      bottomValues.push(
        <text
          key={new Date(date.date).getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={[
            styles.calendarBottomText,
            date.flag ? styles.disabled : "",
            isToday ? styles.today : "",
          ].join(" ")}
        >
          {bottomValue}
        </text>
      );
      const month = new Date(date.date).getMonth();
      if (topValueNumbers.findIndex(item => item.month === month) === -1) {
        const topValue = getLocaleMonth(new Date(date.date), locale);
        topValueNumbers.push({
          month,
          value: topValue,
          date: date.date,
          idx: i,
        });
      }
    }
    topValueNumbers?.forEach(item => {
      topValues.push(
        <TopPartOfCalendar
          key={item.value + new Date(item.date).getFullYear()}
          value={item.value}
          x1Line={columnWidth * item.idx}
          y1Line={0}
          y2Line={topDefaultHeight}
          // xText={
          //   columnWidth * (item.idx + 1) +
          //   getDaysInMonth(
          //     new Date(item.date).getMonth(),
          //     new Date(item.date).getFullYear()
          //   ) *
          //     columnWidth *
          //     0.5
          // }
          xText={columnWidth * item.idx + 31}
          yText={topDefaultHeight * 0.36}
        />
      );
    });
    return [topValues, bottomValues];
  };

  const getCalendarValuesForPartOfDay = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const ticks = viewMode === ViewMode.HalfDay ? 2 : 4;
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = getCachedDateTimeFormat(locale, {
        hour: "numeric",
      }).format(new Date(date.date));

      bottomValues.push(
        <text
          key={new Date(date.date).getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
        >
          {bottomValue}
        </text>
      );
      if (
        i === 0 ||
        new Date(date.date).getDate() !== new Date(dates[i - 1].date).getDate()
      ) {
        const topValue = `${getLocalDayOfWeek(
          new Date(date.date),
          locale,
          "short"
        )}, ${new Date(date.date).getDate()} ${getLocaleMonth(
          new Date(date.date),
          locale
        )}`;
        topValues.push(
          <TopPartOfCalendar
            key={topValue + new Date(date.date).getFullYear()}
            value={topValue}
            x1Line={columnWidth * i + ticks * columnWidth}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * i + ticks * columnWidth * 0.5}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }

    return [topValues, bottomValues];
  };

  const getCalendarValuesForHour = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = getCachedDateTimeFormat(locale, {
        hour: "numeric",
      }).format(new Date(date.date));
      console.log("bottomValue = ", bottomValue);

      bottomValues.push(
        <text
          key={new Date(date.date).getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
        >
          {bottomValue}
        </text>
      );
      if (
        i !== 0 &&
        new Date(date.date).getDate() !== new Date(dates[i - 1].date).getDate()
      ) {
        const displayDate = new Date(dates[i - 1].date);
        const topValue = `${getLocalDayOfWeek(
          displayDate,
          locale,
          "long"
        )}, ${displayDate.getDate()} ${getLocaleMonth(displayDate, locale)}`;
        const topPosition = (new Date(date.date).getHours() - 24) / 2;
        topValues.push(
          <TopPartOfCalendar
            key={topValue + displayDate.getFullYear()}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * (i + topPosition)}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }

    return [topValues, bottomValues];
  };

  let topValues: ReactChild[] = [];
  let bottomValues: ReactChild[] = [];
  switch (dateSetup.viewMode) {
    case ViewMode.Year:
      [topValues, bottomValues] = getCalendarValuesForYear();
      break;
    case ViewMode.QuarterYear:
      [topValues, bottomValues] = getCalendarValuesForQuarterYear();
      break;
    case ViewMode.Month:
      [topValues, bottomValues] = getCalendarValuesForMonth();
      break;
    case ViewMode.Week:
      [topValues, bottomValues] = getCalendarValuesForWeek();
      break;
    case ViewMode.Day:
      [topValues, bottomValues] = getCalendarValuesForDay();
      break;
    case ViewMode.QuarterDay:
    case ViewMode.HalfDay:
      [topValues, bottomValues] = getCalendarValuesForPartOfDay();
      break;
    case ViewMode.Hour:
      [topValues, bottomValues] = getCalendarValuesForHour();
  }
  return (
    <g
      className={styles.calendarContent}
      fontSize={fontSize}
      fontFamily={fontFamily}
    >
      <rect
        x={0}
        y={0}
        width={columnWidth * dateSetup.dates.length}
        height={headerHeight}
        className={styles.calendarHeader}
      />
      {bottomValues} {topValues}
    </g>
  );
};
