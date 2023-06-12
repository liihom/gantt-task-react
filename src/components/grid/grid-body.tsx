import React, { ReactChild } from "react";
import { DatesProps, ItemProps } from "../../types/public-types";
import { addToDate } from "../../helpers/date-helper";
import { hourXCoordinate } from "../../helpers/other-helper";
import styles from "./grid.module.css";

const renderHours = (
  task: ItemProps,
  dates: DatesProps[],
  w: number,
  h: number,
  y: number
) => {
  const workHours = task.hours || [];

  if (!workHours.length) return null;

  const textColor = (hour: number) => (hour > 8 ? "#E20000" : "#20253F");
  const showType = task.showType || 1;
  const bgColor = (item: { time: string[]; date: string }) => {
    if (!item.time) return "#f5f9fc9e"; // 标记灰色空白格
    switch (showType) {
      case 3: // 混合
        return +item.time[0] > 8 || +item.time[1] > 8 ? "#FFE2E2" : "#EFF1FB";
      default:
        return +item.time[0] > 8 ? "#FFE2E2" : "#EFF1FB";
    }
  };
  const rectHour = workHours.map((item, idx) => {
    const x = hourXCoordinate(new Date(item.date), dates, w);
    const bgFill = bgColor(item);
    const textFill = item.time ? textColor(+item.time[0]) : ""; // 实际
    const textMixedFill = textColor(+item.time[1]); // 预估
    return item.time === null ? null : (
      <g key={"Row" + idx}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          className={styles.gridRow}
          style={{
            fill: bgFill,
          }}
        />
        <line
          key="RowLineFirst"
          x={x}
          y1={y + h}
          x2={x + w}
          y2={y + h}
          width={w}
          className={styles.work_hour_border}
        />
        {(showType === 1 || showType === 2) && (
          <text
            x={x + 18}
            y={y + 20}
            style={{
              fontSize: "11px",
              textAnchor: "middle",
              dominantBaseline: "central",
            }}
          >
            <tspan fill={textFill}>{item.time[0]}</tspan>
          </text>
        )}
        {showType === 3 && (
          <text
            x={x + 18}
            y={y + 20}
            style={{
              fontSize: "11px",
              textAnchor: "middle",
              dominantBaseline: "central",
            }}
          >
            <tspan fill={textFill}>{item.time[0]}</tspan>/
            <tspan fill={textMixedFill}>{item.time[1]}</tspan>
          </text>
        )}
      </g>
    );
  });
  return rectHour;
};

export type GridBodyProps = {
  tasks: ItemProps[];
  dates: DatesProps[];
  svgWidth: number;
  rowHeight: number;
  columnWidth: number;
  todayColor: string;
  rtl: boolean;
};
export const GridBody: React.FC<GridBodyProps> = ({
  tasks,
  dates,
  rowHeight,
  svgWidth,
  columnWidth,
  todayColor,
  rtl,
}) => {
  let y = 0;
  const gridRows: ReactChild[] = [];
  const gridHours: ReactChild[] = [];
  const hourBgRows: ReactChild[] = [];
  const rowLines: ReactChild[] = [
    <line
      key="RowLineFirst"
      x="0"
      y1={0}
      x2={svgWidth}
      y2={0}
      className={styles.gridRowLine}
    />,
  ];
  const hoursRowWidth = columnWidth * dates.length;
  for (const task of tasks) {
    // 渲染工时行背景
    hourBgRows.push(
      <g key={"hourBgRows" + task.id}>
        <rect
          x={0}
          y={y}
          width={hoursRowWidth}
          height={rowHeight}
          className={styles.gridRow}
          style={{
            fill: "#F9FBFC",
          }}
        />
        <line
          key="RowLineFirst"
          x={0}
          y1={y + rowHeight}
          x2={hoursRowWidth}
          y2={y + rowHeight}
          className={styles.work_hour_border}
        />
      </g>
    );
    // 渲染工时格子
    gridHours.push(
      <g>
        <g key={"rowhours" + task.id}>
          {renderHours(task, dates, columnWidth, rowHeight, y)}
        </g>
        {/* <g key={"Row" + idx}>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            className={styles.gridRow}
            style={{
              fill: bgFill,
              borderBottom: "1px solid #fff",
            }}
          />
          <line
            key="RowLineFirst"
            x={x}
            y1={y + h}
            x2={x + w}
            y2={y + h}
            className={styles.work_hour_border}
          />
        </g> */}
      </g>
    );
    for (let idx = 0; idx < task.tasks.length; idx++) {
      gridRows.push(
        <rect
          key={"rowrect" + idx + task.id}
          x="0"
          y={y + rowHeight}
          width={svgWidth}
          height={rowHeight}
          className={styles.gridRow}
        ></rect>
      );
      rowLines.push(
        <line
          key={"rowline" + idx + task.id}
          x="0"
          y1={y + rowHeight}
          x2={svgWidth}
          y2={y + rowHeight}
          className={styles.gridRowLine}
        />
      );
      y += !task.hideChildren ? rowHeight : 0;
    }
    y += rowHeight; // 工时行高
    // task.tasks.forEach((_group, idx) => {
    // });
  }

  const now = new Date();
  let tickX = 0;
  const ticks: ReactChild[] = [];
  let today: ReactChild = <rect />;
  let holidays: ReactChild[] = [];
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    ticks.push(
      <line
        key={new Date(date.date).getTime()}
        x1={tickX}
        y1={0}
        x2={tickX}
        y2={y}
        className={styles.gridTick}
      />
    );
    if (
      (i + 1 !== dates.length &&
        new Date(date.date).getTime() < now.getTime() &&
        new Date(dates[i + 1].date).getTime() >= now.getTime()) ||
      // if current date is last
      (i !== 0 &&
        i + 1 === dates.length &&
        new Date(date.date).getTime() < now.getTime() &&
        addToDate(
          new Date(date.date),
          new Date(date.date).getTime() - new Date(dates[i - 1].date).getTime(),
          "millisecond"
        ).getTime() >= now.getTime())
    ) {
      today = (
        <rect
          x={tickX}
          y={0}
          width={columnWidth}
          height={y}
          fill={todayColor}
        />
      );
    }
    // rtl for today
    if (
      rtl &&
      i + 1 !== dates.length &&
      new Date(date.date).getTime() >= now.getTime() &&
      new Date(dates[i + 1].date).getTime() < now.getTime()
    ) {
      today = (
        <rect
          x={tickX + columnWidth}
          y={0}
          width={columnWidth}
          height={y}
          fill={todayColor}
        />
      );
    }
    // 节假日置灰
    if (date.flag) {
      holidays.push(
        <rect
          key={"holiday" + new Date(date.date).getTime()}
          x={tickX}
          y={0}
          width={columnWidth}
          height={y}
          // fill="#F9FBFC9e"
          fill="#F9FBFC"
        />
      );
    }
    tickX += columnWidth;
  }
  return (
    <g className="gridBody">
      {/* <g className="rows">{gridRows}</g> */}
      {/* <g className="rowLines">{rowLines}</g> */}

      <g className="hourrows">{hourBgRows}</g>
      <g className="holiday">{holidays}</g>
      <g className="today">{today}</g>
      <g className="hours">{gridHours}</g>
      <g className="ticks">{ticks}</g>
    </g>
  );
};
