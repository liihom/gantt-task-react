import { Task, TaskType } from "./public-types";

export interface BarTask extends Task {
  index: number;
  typeInternal: TaskTypeInternal;
  x1: number;
  x2: number;
  y: number;
  height: number;
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  handleWidth: number;
  barChildren: BarTask[];
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
}

export interface GroupProps {
  tasks: BarTask[][];
  id: string;
  name: string;
  hours: {
    date: string;
    time: string[];
  }[];
  hideChildren: boolean;
  showType?: number;
}

export type TaskTypeInternal = TaskType | "smalltask";
