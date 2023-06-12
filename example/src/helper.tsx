import { Task, ItemProps } from "../../dist/types/public-types";
import { getGroupRows } from "gantt-task-react";

const times = new Array(30).fill("").map((item, idx) => {
  return {
    time: [idx === 4 ? "0" : +item + idx + 1 + "", "8"],
    date: "2023-06-12",
  };
});

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}

export function initTasks(idx: number) {
  const tasks = [
    {
      start: "2023-05-25",
      end: "2023-05-25",
      name: idx + "任务1",
      id: "Task 0",
      progress: 100,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
      bizState: 1,
      bizType: 1,
      showType: 1,
    },
    {
      start: "2023-05-25",
      end: "2023-05-27",
      name: idx + "任务2",
      id: "Task 1",
      progress: 100,
      type: "task",
      project: "ProjectSample",
      displayOrder: 3,
      bizState: 2,
      bizType: 1,
    },
    {
      start: "2023-05-26",
      end: "2023-05-26",
      name: idx + "任务3",
      id: "Task 2",
      progress: 100,
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
      bizState: 2,
    },
    {
      start: "2023-05-27",
      end: "2023-05-29",
      name: idx + "任务4",
      id: "Task 3",
      progress: 100,
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
      bizState: 2,
    },
    {
      start: "2023-05-28",
      end: "2023-05-28",
      name: idx + "任务5",
      id: "Task 4",
      progress: 100,
      type: "task",
      project: "ProjectSample",
      displayOrder: 6,
      bizState: 2,
    },
    {
      start: "2023-05-30",
      end: "2023-05-31",
      name: idx + "任务6",
      id: "Task 6",
      progress: 100,
      type: "task",
      project: "ProjectSample",
      displayOrder: 7,
      bizState: 3,
    },
    {
      start: "2023-05-31",
      end: "2023-05-31",
      name: idx + "任务7",
      id: "Task 9",
      progress: 100,
      isDisabled: true,
      type: "task",
      project: "ProjectSample",
      displayOrder: 8,
      bizState: 4,
    },
    {
      start: "2023-05-01",
      end: "2023-05-03",
      name: idx + "任务8",
      id: "Task 11",
      progress: 100,
      isDisabled: true,
      type: "task",
      project: "ProjectSample",
      displayOrder: 8,
      bizState: 4,
    },
    {
      start: "2023-05-31",
      end: "2023-05-03",
      name: idx + "任务9",
      id: "Task 10",
      progress: 100,
      isDisabled: true,
      type: "task",
      project: "ProjectSample",
      displayOrder: 8,
      bizState: 4,
    },
  ];
  return tasks;
}

// 假接口数据
const task = initTasks(0);
const task2 = initTasks(22);

// 传入甘特图的数据
export const initData: ItemProps[] = [
  {
    id: "yuangong1",
    name: "员工一",
    hours: times,
    tasks: getGroupRows(task),
    hideChildren: false,
  },
  {
    id: "yuangong2",
    name: "员工二",
    hours: times,
    tasks: getGroupRows(task2),
    hideChildren: false,
  },
];

export const dates = [
  {
    date: "2023-05-07",
    flag: false,
  },
  {
    date: "2023-05-08",
    flag: false,
  },
  {
    date: "2023-05-09",
    flag: false,
  },
  {
    date: "2023-05-10",
    flag: true,
  },
  {
    date: "2023-05-11",
    flag: true,
  },
  {
    date: "2023-05-12",
    flag: false,
  },
  {
    date: "2023-05-13",
    flag: false,
  },
  {
    date: "2023-05-14",
    flag: false,
  },
  {
    date: "2023-05-15",
    flag: false,
  },
  {
    date: "2023-05-16",
    flag: false,
  },
  {
    date: "2023-05-17",
    flag: true,
  },
  {
    date: "2023-05-18",
    flag: true,
  },
  {
    date: "2023-05-19",
    flag: false,
  },
  {
    date: "2023-05-20",
    flag: false,
  },
  {
    date: "2023-05-21",
    flag: false,
  },
  {
    date: "2023-05-22",
    flag: true,
  },
  {
    date: "2023-05-23",
    flag: true,
  },
  {
    date: "2023-05-24",
    flag: true,
  },
  {
    date: "2023-05-25",
    flag: false,
  },
  {
    date: "2023-05-26",
    flag: false,
  },
  {
    date: "2023-05-27",
    flag: false,
  },
  {
    date: "2023-05-28",
    flag: false,
  },
  {
    date: "2023-05-29",
    flag: false,
  },
  {
    date: "2023-05-30",
    flag: false,
  },
  {
    date: "2023-06-01",
    flag: true,
  },
  {
    date: "2023-06-02",
    flag: true,
  },
  {
    date: "2023-06-03",
    flag: false,
  },
  {
    date: "2023-06-04",
    flag: false,
  },
  {
    date: "2023-06-05",
    flag: false,
  },
  {
    date: "2023-06-06",
    flag: false,
  },
  {
    date: "2023-06-07",
    flag: false,
  },
  {
    date: "2023-06-08",
    flag: false,
  },
  {
    date: "2023-06-09",
    flag: false,
  },
  {
    date: "2023-06-10",
    flag: false,
  },
  {
    date: "2023-06-11",
    flag: false,
  },
  {
    date: "2023-06-12",
    flag: false,
  },
  {
    date: "2023-06-13",
    flag: false,
  },
  {
    date: "2023-06-14",
    flag: false,
  },
  {
    date: "2023-06-15",
    flag: false,
  },
  {
    date: "2023-06-16",
    flag: false,
  },
];
