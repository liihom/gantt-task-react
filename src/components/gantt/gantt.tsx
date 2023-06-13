import React, {
  useState,
  SyntheticEvent,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { ViewMode, GanttProps, ItemProps } from "../../types/public-types";
import { GridProps } from "../grid/grid";
// import { ganttDateRange, seedDates } from "../../helpers/date-helper";
import { CalendarProps } from "../calendar/calendar";
import { TaskGanttContentProps } from "./task-gantt-content";
import { TaskListHeaderDefault } from "../task-list/task-list-header";
import { TaskListTableDefault } from "../task-list/task-list-table";
import { StandardTooltipContent, Tooltip } from "../other/tooltip";
import { VerticalScroll } from "../other/vertical-scroll";
import { TaskListProps, TaskList } from "../task-list/task-list";
import { TaskGantt } from "./task-gantt";
import { BarTask, GroupProps } from "../../types/bar-task";
import { convertToBarTasks } from "../../helpers/bar-helper";
import { GanttEvent } from "../../types/gantt-task-actions";
import { DateSetup } from "../../types/date-setup";
import { HorizontalScroll } from "../other/horizontal-scroll";
// import { removeHiddenTasks, sortTasks } from "../../helpers/other-helper";
import { removeHiddenTasks } from "../../helpers/other-helper";
import styles from "./gantt.module.css";

export const Gantt: React.FunctionComponent<GanttProps> = ({
  tasks,
  dates,
  // dateRangeStart = new Date(),
  // dateRangeEnd = new Date(new Date().setMonth(new Date().getMonth() + 1)),
  headerHeight = 50,
  columnWidth = 40,
  listCellWidth = "155px",
  // rowHeight = 36,
  rowHeight = 46,
  ganttHeight = 0,
  viewMode = ViewMode.Day,
  preStepsCount = 1,
  locale = "en-GB",
  barFill = 60,
  barCornerRadius = 2,
  barProgressColor = "#a3a3ff",
  barProgressSelectedColor = "#8282f5",
  barBackgroundColor = "#b8c2cc",
  barBackgroundSelectedColor = "#aeb8c2",
  projectProgressColor = "#7db59a",
  projectProgressSelectedColor = "#59a985",
  projectBackgroundColor = "#fac465",
  projectBackgroundSelectedColor = "#f7bb53",
  milestoneBackgroundColor = "#f1c453",
  milestoneBackgroundSelectedColor = "#f29e4c",
  rtl = false,
  handleWidth = 8,
  timeStep = 300000,
  arrowColor = "grey",
  fontFamily = "Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue",
  fontSize = "14px",
  arrowIndent = 20,
  todayColor = "rgba(252, 248, 227, 0.8)",
  // todayColor = "#f5f9fc9e",
  viewDate,
  TooltipContent = StandardTooltipContent,
  TaskListHeader = TaskListHeaderDefault,
  TaskListTable = TaskListTableDefault,
  onDateChange,
  onProgressChange,
  onDoubleClick,
  onClick,
  onDelete,
  // onSelect,
  onExpanderClick,
  onReachedLeft,
  onReachedRight,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const taskListRef = useRef<HTMLDivElement>(null);
  const [dateSetup, setDateSetup] = useState<DateSetup>({
    viewMode,
    dates,
  });
  const [currentViewDate, setCurrentViewDate] = useState<Date | undefined>(
    undefined
  );

  const [taskListWidth, setTaskListWidth] = useState(0);
  const [svgContainerWidth, setSvgContainerWidth] = useState(0);
  const [svgContainerHeight, setSvgContainerHeight] = useState(ganttHeight);
  const [barTasks, setBarTasks] = useState<GroupProps[]>([]);
  const [ganttEvent, setGanttEvent] = useState<GanttEvent>({
    action: "",
  });
  // const taskHeight = useMemo(
  //   () => (rowHeight * barFill) / 100,
  //   [rowHeight, barFill]
  // );
  const taskHeight = barFill ? 20 : 20; // barFill ?

  // const [selectedTask, setSelectedTask] = useState<BarTask>();
  const [failedTask, setFailedTask] = useState<BarTask | null>(null);

  const svgWidth = useMemo(
    () => dateSetup.dates.length * columnWidth,
    [dateSetup.dates, columnWidth]
  );
  // const ganttFullHeight = barTasks.length * rowHeight;
  // const ganttFullHeight =
  //   tasks.map(item => item.tasks.length + 1).reduce((a, b) => a + b) *
  //   rowHeight;
  const ganttFullHeight = useMemo(
    () =>
      tasks.map(item => item.tasks.length + 1).reduce((a, b) => a + b) *
      rowHeight,
    [tasks, rowHeight]
  );

  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(-1);
  const [ignoreScrollEvent, setIgnoreScrollEvent] = useState(false);

  // task change events
  useEffect(() => {
    let filteredTasks: ItemProps[];
    if (onExpanderClick) {
      filteredTasks = removeHiddenTasks(tasks);
    } else {
      filteredTasks = tasks;
    }
    if (rtl) {
      dateSetup.dates = dateSetup.dates.reverse(); // todo?
      setDateSetup(dateSetup);
      if (scrollX === -1) {
        setScrollX(dateSetup.dates.length * columnWidth);
      }
    }
    let offsetIdx = 1; // 计算进度条时，预留出工时行位置
    const tempBarTasks = filteredTasks.map(item => {
      const newItem = {
        ...item,
        tasks: item.tasks.map((groupTasks, groupIdex) =>
          convertToBarTasks(
            groupIdex + offsetIdx,
            groupTasks,
            // newDates,
            dateSetup.dates,
            columnWidth,
            rowHeight,
            taskHeight,
            barCornerRadius,
            handleWidth,
            rtl,
            barProgressColor,
            barProgressSelectedColor,
            barBackgroundColor,
            barBackgroundSelectedColor,
            projectProgressColor,
            projectProgressSelectedColor,
            projectBackgroundColor,
            projectBackgroundSelectedColor,
            milestoneBackgroundColor,
            milestoneBackgroundSelectedColor
          )
        ),
      };
      offsetIdx += item.tasks.length + 1;
      return newItem;
    });
    setBarTasks(tempBarTasks);
  }, [
    tasks,
    dateSetup, // ?
    viewMode,
    preStepsCount,
    rowHeight,
    barCornerRadius,
    columnWidth,
    taskHeight,
    handleWidth,
    barProgressColor,
    barProgressSelectedColor,
    barBackgroundColor,
    barBackgroundSelectedColor,
    projectProgressColor,
    projectProgressSelectedColor,
    projectBackgroundColor,
    projectBackgroundSelectedColor,
    milestoneBackgroundColor,
    milestoneBackgroundSelectedColor,
    rtl,
    scrollX,
    onExpanderClick,
  ]);

  useEffect(() => {
    setDateSetup({ dates, viewMode });
  }, [dates, viewMode]);

  useEffect(() => {
    if (
      viewMode === dateSetup.viewMode &&
      ((viewDate && !currentViewDate) ||
        (viewDate && currentViewDate?.valueOf() !== viewDate.valueOf()))
    ) {
      const dates = dateSetup.dates;
      const index = dates.findIndex(
        (d, i) =>
          viewDate.valueOf() >= new Date(d.date).valueOf() &&
          i + 1 !== dates.length &&
          viewDate.valueOf() < new Date(dates[i + 1].date).valueOf()
      );
      if (index === -1) {
        return;
      }
      setCurrentViewDate(viewDate);
      setScrollX(columnWidth * index);
    }
  }, [
    viewDate,
    columnWidth,
    dateSetup.dates,
    dateSetup.viewMode,
    viewMode,
    currentViewDate,
    setCurrentViewDate,
  ]);

  // useEffect(() => {
  //   const { changedTask, action } = ganttEvent;
  //   if (changedTask) {
  //     if (action === "delete") {
  //       setGanttEvent({ action: "" });
  //       setBarTasks(barTasks.filter(t => t.id !== changedTask.id));
  //     } else if (
  //       action === "move" ||
  //       action === "end" ||
  //       action === "start" ||
  //       action === "progress"
  //     ) {
  //       const prevStateTask = barTasks.find(t => t.id === changedTask.id);
  //       if (
  //         prevStateTask &&
  //         (prevStateTask.start.getTime() !== changedTask.start.getTime() ||
  //           prevStateTask.end.getTime() !== changedTask.end.getTime() ||
  //           prevStateTask.progress !== changedTask.progress)
  //       ) {
  //         // actions for change
  //         const newTaskList = barTasks.map(t =>
  //           t.id === changedTask.id ? changedTask : t
  //         );
  //         setBarTasks(newTaskList);
  //       }
  //     }
  //   }
  // }, [ganttEvent, barTasks]);

  useEffect(() => {
    if (failedTask) {
      // setBarTasks(barTasks.map(t => (t.id !== failedTask.id ? t : failedTask)));
      setFailedTask(null);
    }
  }, [failedTask, barTasks]);

  useEffect(() => {
    if (!listCellWidth) {
      setTaskListWidth(0);
    }
    if (taskListRef.current) {
      setTaskListWidth(taskListRef.current.offsetWidth);
    }
  }, [taskListRef, listCellWidth]);

  useEffect(() => {
    if (wrapperRef.current) {
      setSvgContainerWidth(wrapperRef.current.offsetWidth - taskListWidth);
    }
  }, [wrapperRef, taskListWidth]);

  useEffect(() => {
    if (ganttHeight) {
      setSvgContainerHeight(ganttHeight + headerHeight);
    } else {
      setSvgContainerHeight(ganttFullHeight + headerHeight);
    }
  }, [ganttHeight, headerHeight, ganttFullHeight]);

  // scroll events
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.shiftKey || event.deltaX) {
        const scrollMove = event.deltaX ? event.deltaX : event.deltaY;
        let newScrollX = scrollX + scrollMove;
        if (newScrollX < 0) {
          newScrollX = 0;
        } else if (newScrollX > svgWidth) {
          newScrollX = svgWidth;
        }
        setScrollX(newScrollX);
        event.preventDefault();
      } else if (ganttHeight) {
        let newScrollY = scrollY + event.deltaY;
        if (newScrollY < 0) {
          newScrollY = 0;
        } else if (newScrollY > ganttFullHeight - ganttHeight) {
          newScrollY = ganttFullHeight - ganttHeight;
        }
        if (newScrollY !== scrollY) {
          setScrollY(newScrollY);
          event.preventDefault();
        }
      }

      setIgnoreScrollEvent(true);
    };

    // subscribe if scroll is necessary
    wrapperRef.current?.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    return () => {
      wrapperRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [
    wrapperRef,
    scrollY,
    scrollX,
    ganttHeight,
    svgWidth,
    rtl,
    ganttFullHeight,
  ]);

  const handleScrollY = (event: SyntheticEvent<HTMLDivElement>) => {
    if (scrollY !== event.currentTarget.scrollTop && !ignoreScrollEvent) {
      setScrollY(event.currentTarget.scrollTop);
      setIgnoreScrollEvent(true);
    } else {
      setIgnoreScrollEvent(false);
    }
  };

  const handleScrollX = (event: SyntheticEvent<HTMLDivElement>) => {
    // if (scrollX !== event.currentTarget.scrollLeft && !ignoreScrollEvent) {
    // if (!ignoreScrollEvent) {
    const scrollLeft = event.currentTarget.scrollLeft;
    const offsetWidth = event.currentTarget.offsetWidth;
    const threshold = svgWidth - offsetWidth - scrollLeft;
    const diff = scrollLeft - scrollX;
    let direct = "right";
    if (diff < 0) {
      direct = "left";
    }
    if (direct === "left" && scrollLeft <= 10) {
      // console.log("触左边缘了。。。");
      onReachedLeft?.();
    } else if (direct === "right" && threshold <= 10) {
      // console.log("触右边缘了。。。");
      onReachedRight?.();
    }
    setScrollX(scrollLeft);
    //   setIgnoreScrollEvent(true);
    // } else {
    //   setIgnoreScrollEvent(false);
    // }
  };

  /**
   * Handles arrow keys events and transform it to new scroll
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    let newScrollY = scrollY;
    let newScrollX = scrollX;
    let isX = true;
    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        newScrollY += rowHeight;
        isX = false;
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        newScrollY -= rowHeight;
        isX = false;
        break;
      case "Left":
      case "ArrowLeft":
        newScrollX -= columnWidth;
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        newScrollX += columnWidth;
        break;
    }
    if (isX) {
      if (newScrollX < 0) {
        newScrollX = 0;
      } else if (newScrollX > svgWidth) {
        newScrollX = svgWidth;
      }
      setScrollX(newScrollX);
    } else {
      if (newScrollY < 0) {
        newScrollY = 0;
      } else if (newScrollY > ganttFullHeight - ganttHeight) {
        newScrollY = ganttFullHeight - ganttHeight;
      }
      setScrollY(newScrollY);
    }
    setIgnoreScrollEvent(true);
  };

  /**
   * Task select event
   */
  // const handleSelectedTask = (taskId: string) => {
  //   // const newSelectedTask = barTasks.find(t => t.id === taskId);
  //   // const oldSelectedTask = barTasks.find(
  //   //   t => !!selectedTask && t.id === selectedTask.id
  //   // );
  //   const newSelectedTask = barTasks.find(t => t.id === taskId);
  //   const oldSelectedTask = barTasks.find(
  //     t => !!selectedTask && t.id === selectedTask.id
  //   );
  //   if (onSelect) {
  //     if (oldSelectedTask) {
  //       onSelect(oldSelectedTask, false);
  //     }
  //     if (newSelectedTask) {
  //       onSelect(newSelectedTask, true);
  //     }
  //   }
  //   setSelectedTask(newSelectedTask);
  // };
  const handleExpanderClick = (task: ItemProps) => {
    onExpanderClick?.(task);
  };
  const gridProps: GridProps = {
    columnWidth,
    svgWidth,
    tasks: tasks,
    rowHeight,
    dates: dateSetup.dates,
    todayColor,
    rtl,
  };
  const calendarProps: CalendarProps = {
    dateSetup,
    locale,
    viewMode,
    headerHeight,
    columnWidth,
    fontFamily,
    fontSize,
    rtl,
    onCalendarBackward: onReachedLeft,
    onCalendarForward: onReachedRight,
  };
  const barProps: TaskGanttContentProps = {
    tasks: barTasks,
    dates: dateSetup.dates,
    ganttEvent,
    // selectedTask,
    rowHeight,
    taskHeight,
    columnWidth,
    arrowColor,
    timeStep,
    fontFamily,
    fontSize,
    arrowIndent,
    svgWidth,
    rtl,
    setGanttEvent,
    setFailedTask,
    // setSelectedTask: handleSelectedTask,
    onDateChange,
    onProgressChange,
    onDoubleClick,
    onClick,
    onDelete,
  };

  const tableProps: TaskListProps = {
    rowHeight,
    rowWidth: listCellWidth,
    fontFamily,
    fontSize,
    tasks: barTasks,
    locale,
    headerHeight,
    scrollY,
    ganttHeight,
    horizontalContainerClass: styles.horizontalContainer,
    // selectedTask,
    taskListRef,
    // setSelectedTask: handleSelectedTask,
    onExpanderClick: handleExpanderClick,
    TaskListHeader,
    TaskListTable,
  };

  return (
    <div>
      <div
        className={styles.wrapper}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={wrapperRef}
      >
        {listCellWidth && <TaskList {...tableProps} />}
        <TaskGantt
          gridProps={gridProps}
          calendarProps={calendarProps}
          barProps={barProps}
          ganttHeight={ganttHeight}
          scrollY={scrollY}
          scrollX={scrollX}
          onCalendarBackward={onReachedLeft}
          onCalendarForward={onReachedRight}
        />
        {ganttEvent.changedTask && (
          <Tooltip
            arrowIndent={arrowIndent}
            rowHeight={rowHeight}
            svgContainerHeight={svgContainerHeight}
            svgContainerWidth={svgContainerWidth}
            fontFamily={fontFamily}
            fontSize={fontSize}
            scrollX={scrollX}
            scrollY={scrollY}
            task={ganttEvent.changedTask}
            headerHeight={headerHeight}
            taskListWidth={taskListWidth}
            TooltipContent={TooltipContent}
            rtl={rtl}
            svgWidth={svgWidth}
          />
        )}
        <VerticalScroll
          ganttFullHeight={ganttFullHeight}
          ganttHeight={ganttHeight}
          headerHeight={headerHeight}
          scroll={scrollY}
          onScroll={handleScrollY}
          rtl={rtl}
        />
      </div>
      <HorizontalScroll
        svgWidth={svgWidth}
        taskListWidth={taskListWidth}
        scroll={scrollX}
        rtl={rtl}
        onScroll={handleScrollX}
      />
    </div>
  );
};
