import { GroupProps } from "./bar-task";

export enum ViewMode {
  Hour = "Hour",
  QuarterDay = "Quarter Day",
  HalfDay = "Half Day",
  Day = "Day",
  /** ISO-8601 week */
  Week = "Week",
  Month = "Month",
  QuarterYear = "QuarterYear",
  Year = "Year",
}
export type TaskType = "task" | "milestone" | "project";

export interface ItemProps {
  id: string;
  name: string;
  hours: {
    time: string[]; // [实际工时，预估工时]
    date: string;
  }[];
  tasks: Task[][];
  hideChildren: boolean;
  /** 任务列表数据类型：1预估时间、2实际执行时间 */
  showType?: number;
}

export interface Task {
  id: string;
  type: TaskType;
  name: string;
  start: Date;
  end: Date;
  /**
   * From 0 to 100
   */
  progress: number;
  styles?: {
    backgroundColor?: string;
    backgroundSelectedColor?: string;
    progressColor?: string;
    progressSelectedColor?: string;
  };
  isDisabled?: boolean;
  project?: string;
  dependencies?: string[];
  hideChildren?: boolean;
  displayOrder?: number;
  /** 业务类型：1需求、2任务 */
  bizType?: number;
  /** 业务状态：1未开始、2进行中、3已完成、4时间结束未完成 */
  bizState?: number;
  /** 任务或需求状态对应中文描述 */
  bizStatusName?: string;
  /** 工时状态：1预估工时、2实际工时、3混合工时 */
  showType?: number;
  /**  任务 - 预估工时 */
  estimatedTime?: number;
  /** 任务 - 实际工时 */
  realTime?: number;
  /** 任务 - 关联需求 */
  needName?: number;
  /** 需求所属需求 */
  parentNeedName?: number;
}

export interface EventOption {
  /**
   * Time step value for date changes.
   */
  timeStep?: number;
  /**
   * Invokes on bar select on unselect.
   */
  onSelect?: (task: Task, isSelected: boolean) => void;
  /**
   * Invokes on bar double click.
   */
  onDoubleClick?: (task: Task) => void;
  /**
   * Invokes on bar click.
   */
  onClick?: (task: Task) => void;
  /**
   * Invokes on end and start time change. Chart undoes operation if method return false or error.
   */
  onDateChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on progress change. Chart undoes operation if method return false or error.
   */
  onProgressChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on delete selected task. Chart undoes operation if method return false or error.
   */
  onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on expander on task list
   */
  onExpanderClick?: (task: ItemProps) => void;
  onReachedLeft?: () => void;
  onReachedRight?: () => void;
}

export interface DisplayOption {
  viewMode?: ViewMode;
  viewDate?: Date;
  preStepsCount?: number;
  /**
   * Specifies the month name language. Able formats: ISO 639-2, Java Locale
   */
  locale?: string;
  rtl?: boolean;
}

export interface StylingOption {
  headerHeight?: number;
  columnWidth?: number;
  listCellWidth?: string;
  rowHeight?: number;
  ganttHeight?: number;
  containerHeight?: string;
  containerId?: string;
  barCornerRadius?: number;
  handleWidth?: number;
  fontFamily?: string;
  fontSize?: string;
  /**
   * How many of row width can be taken by task.
   * From 0 to 100
   */
  barFill?: number;
  barProgressColor?: string;
  barProgressSelectedColor?: string;
  barBackgroundColor?: string;
  barBackgroundSelectedColor?: string;
  projectProgressColor?: string;
  projectProgressSelectedColor?: string;
  projectBackgroundColor?: string;
  projectBackgroundSelectedColor?: string;
  milestoneBackgroundColor?: string;
  milestoneBackgroundSelectedColor?: string;
  arrowColor?: string;
  arrowIndent?: number;
  todayColor?: string;
  TooltipContent?: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
  }>;
  TaskListHeader?: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
  }>;
  TaskListTable?: React.FC<{
    rowHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    locale: string;
    tasks: GroupProps[];
    // selectedTaskId: string;
    /**
     * Sets selected task by id
     */
    // setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: ItemProps) => void;
  }>;
}

export interface GanttProps extends EventOption, DisplayOption, StylingOption {
  // data: ItemProps[];
  dates: {
    /** 日期年月日字符串 */
    date: string;
    /** 是否是节假日 */
    flag: boolean;
  }[];
  tasks: ItemProps[];
  // dateRangeStart: Date;
  // dateRangeEnd: Date;
}

export interface DatesProps {
  /** 日期年月日字符串 */
  date: string;
  /** 是否是节假日 */
  flag: boolean;
}
