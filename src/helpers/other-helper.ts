import { BarTask } from "../types/bar-task";
import { DatesProps, ItemProps, Task } from "../types/public-types";

export function isKeyboardEvent(
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent
): event is React.KeyboardEvent {
  return (event as React.KeyboardEvent).key !== undefined;
}

export function isMouseEvent(
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent
): event is React.MouseEvent {
  return (event as React.MouseEvent).clientX !== undefined;
}

export function isBarTask(task: Task | BarTask): task is BarTask {
  return (task as BarTask).x1 !== undefined;
}

export function removeHiddenTasks(tasks: ItemProps[]) {
  let temp = tasks;
  temp = temp.map(item => ({
    ...item,
    tasks: item.hideChildren ? [] : item.tasks,
  }));
  return temp;
}

// function getChildren(taskList: Task[], task: Task) {
//   let tasks: Task[] = [];
//   if (task.type !== "project") {
//     tasks = taskList.filter(
//       t => t.dependencies && t.dependencies.indexOf(task.id) !== -1
//     );
//   } else {
//     tasks = taskList.filter(t => t.project && t.project === task.id);
//   }
//   var taskChildren: Task[] = [];
//   tasks.forEach(t => {
//     taskChildren.push(...getChildren(taskList, t));
//   });
//   tasks = tasks.concat(tasks, taskChildren);
//   return tasks;
// }

export const sortTasks = (taskA: Task, taskB: Task) => {
  const orderA = taskA.displayOrder || Number.MAX_VALUE;
  const orderB = taskB.displayOrder || Number.MAX_VALUE;
  if (orderA > orderB) {
    return 1;
  } else if (orderA < orderB) {
    return -1;
  } else {
    return 0;
  }
};

/**
 * 获取 工时 x坐标
 * @param currentDate - 开始时间
 * @param dates - 时间轴坐标所有时间值
 * @param columnWidth - 列宽
 */
export const hourXCoordinate = (
  currentDate: Date,
  dates: DatesProps[],
  columnWidth: number
) => {
  const index = dates.findIndex(
    d => new Date(d.date).getTime() >= currentDate.getTime()
  );
  // const remainderMillis = currentDate.getTime() - dates[index].getTime();
  // // 段 - 差值
  // const percentOfInterval =
  //   remainderMillis / (dates[index + 1].getTime() - dates[index].getTime());
  // 差值 /
  // const x = index * columnWidth + percentOfInterval * columnWidth;
  const x = index * columnWidth;
  return x;
};
