import React, { useEffect, useMemo, useRef } from "react";
// import { BarTask, RowProps } from "../../types/bar-task";
import { GroupProps } from "../../types/bar-task";
import { ItemProps } from "../../types/public-types";

export type TaskListProps = {
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  rowHeight: number;
  ganttHeight: number;
  scrollY: number;
  locale: string;
  tasks: GroupProps[];
  taskListRef: React.RefObject<HTMLDivElement>;
  horizontalContainerClass?: string;
  // selectedTask: BarTask | undefined;
  // setSelectedTask: (task: string) => void;
  onExpanderClick: (task: ItemProps) => void;
  TaskListHeader: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
  }>;
  TaskListTable: React.FC<{
    rowHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    locale: string;
    tasks: GroupProps[];
    // selectedTaskId: string;
    // setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: ItemProps) => void;
  }>;
};

export const TaskList: React.FC<TaskListProps> = ({
  headerHeight,
  fontFamily,
  fontSize,
  rowWidth,
  rowHeight,
  scrollY,
  tasks,
  // selectedTask,
  // setSelectedTask,
  onExpanderClick,
  locale,
  ganttHeight,
  taskListRef,
  horizontalContainerClass,
  TaskListHeader,
  TaskListTable,
}) => {
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const tableLeftHeight = useMemo(() => {
    const lines = tasks
      .map(item => item.tasks.length)
      .reduce((a, b) => a + b, tasks.length);
    const svgHeight = rowHeight * lines;
    return svgHeight + headerHeight;
  }, [headerHeight, rowHeight, tasks]);

  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  const headerProps = {
    headerHeight,
    fontFamily,
    fontSize,
    rowWidth,
  };
  // const selectedTaskId = selectedTask ? selectedTask.id : "";
  const tableProps = {
    rowHeight,
    rowWidth,
    fontFamily,
    fontSize,
    tasks,
    locale,
    // selectedTaskId: selectedTaskId,
    // setSelectedTask,
    onExpanderClick,
  };

  return (
    <div
      ref={taskListRef}
      style={{
        position: "sticky",
        left: 0,
        zIndex: 100,
        height: tableLeftHeight, // ! 此处必须设定高度和滚动区内容高度一致，否则顶部 header sticky 会滑出视线
        background: "#fff",
      }}
    >
      <TaskListHeader {...headerProps} />
      <div
        ref={horizontalContainerRef}
        className={horizontalContainerClass}
        style={ganttHeight ? { height: ganttHeight } : {}}
      >
        <TaskListTable {...tableProps} />
      </div>
    </div>
  );
};
