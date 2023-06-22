import React, { useEffect, useMemo, useState } from "react";
import { Popover } from "antd";
import { BarTask } from "../../types/bar-task";
import { GanttContentMoveAction } from "../../types/gantt-task-actions";
import { Bar } from "./bar/bar";
import { BarSmall } from "./bar/bar-small";
import { Milestone } from "./milestone/milestone";
import { Project } from "./project/project";

import style from "./task-list.module.css";

export type TaskItemProps = {
  task: BarTask;
  arrowIndent: number;
  taskHeight: number;
  isProgressChangeable: boolean;
  isDateChangeable: boolean;
  isDelete: boolean;
  // isSelected: boolean;
  rtl: boolean;
  onEventStart: (
    action: GanttContentMoveAction,
    selectedTask: BarTask,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => any;
};

export const TaskItem: React.FC<TaskItemProps> = props => {
  const {
    task,
    // arrowIndent,
    isDelete,
    taskHeight,
    // isSelected,
    // rtl,
    onEventStart,
  } = {
    ...props,
  };
  // const textRef = useRef<SVGTextElement>(null);
  const [taskItem, setTaskItem] = useState<JSX.Element>(<div />);
  // const [isTextInside, setIsTextInside] = useState(true);

  useEffect(() => {
    switch (task.typeInternal) {
      case "milestone":
        setTaskItem(<Milestone {...props} />);
        break;
      case "project":
        setTaskItem(<Project {...props} />);
        break;
      case "smalltask":
        setTaskItem(<BarSmall {...props} />);
        break;
      default:
        setTaskItem(<Bar {...props} />);
        break;
    }
    // }, [task, isSelected]);
  }, [task]);

  // useEffect(() => {
  //   if (textRef.current) {
  //     setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1);
  //   }
  // }, [textRef, task]);

  // const getX = () => {
  //   const width = task.x2 - task.x1;
  //   const hasChild = task.barChildren.length > 0;
  //   if (isTextInside) {
  //     return task.x1 + width * 0.5;
  //   }
  //   if (rtl && textRef.current) {
  //     return (
  //       task.x1 -
  //       textRef.current.getBBox().width -
  //       arrowIndent * +hasChild -
  //       arrowIndent * 0.2
  //     );
  //   } else {
  //     return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
  //   }
  // };

  const popTitle = useMemo(() => {
    return (
      <div className={style.tooltip_title}>
        <a
          className={style.tooltip_id}
          href={task.targetLink}
          target="_blank"
          rel="noreferrer"
          onClick={e => {
            if (!task.targetLink) {
              e.preventDefault();
            }
          }}
        >
          {task.bizType === 1 ? (
            <div className={style.tooltip_id_icon}>
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="icon_tooltip_need"
              >
                <title>编组 12备份 3</title>
                <g
                  id="页面-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="效能统计-需求详情"
                    transform="translate(-855.000000, -425.000000)"
                  >
                    <g
                      id="编组-16"
                      transform="translate(835.000000, 410.000000)"
                    >
                      <g
                        id="编组-12备份-3"
                        transform="translate(20.000000, 15.000000)"
                      >
                        <rect
                          id="Rectangle备份-2"
                          fill="#E7F0FF"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                          rx="2"
                        ></rect>
                        <path
                          d="M7.99969763,3.59999993 C8.79069833,3.59962039 9.53001129,3.86528094 10.1165606,4.32007668 C10.6992247,4.77185998 11.1310987,5.41053644 11.3105582,6.15958813 C11.4894314,6.90625727 11.3936302,7.66400405 11.0778134,8.32023247 C10.711335,9.08172948 10.0490642,9.70623378 9.17703308,10.0218742 L9.17703308,10.0218742 L9.17664504,10.7388994 L7.07139676,11.0332388 L6.70366348,9.97656773 C5.89013149,9.64874913 5.27113495,9.04688967 4.9214336,8.32029829 C4.60561489,7.66410654 4.50978604,6.90639822 4.68862044,6.15974673 C4.86801434,5.41072006 5.2998171,4.77205498 5.88241879,4.32025074 C6.46891833,3.86542375 7.20819673,3.59970721 7.99969763,3.59999993 Z"
                          id="路径"
                          stroke="#0166FF"
                          strokeWidth="1.2"
                        ></path>
                        <line
                          x1="6.23875287"
                          y1="12.9999997"
                          x2="9.80950157"
                          y2="12.9999997"
                          id="路径-63"
                          stroke="#0166FF"
                          strokeWidth="1.2"
                        ></line>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          ) : (
            <div className={style.tooltip_id_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="icon_tooltip_task"
              >
                <g fill="none" fillRule="evenodd">
                  <rect fill="#FFF1E5" width="16" height="16" rx="2" />
                  <g stroke="#FF871E">
                    <path
                      d="M1,8.68737896 L7,8.68737896 C7.55228475,8.68737896 8,8.23966371 8,7.68737896 L8,2.75403521 C8,2.20175046 7.55228475,1.75403521 7,1.75403521 L1,1.75403521 C0.44771525,1.75403521 -1.78657678e-16,2.20175046 0,2.75403521 L0,7.68737896 C-4.33869274e-17,8.23966371 0.44771525,8.68737896 1,8.68737896 Z"
                      strokeWidth="1.2"
                      transform="translate(4 3.312621)"
                    />
                    <path
                      strokeWidth="1.2"
                      d="M2.01337686 0L2.01337686 1.68445758"
                      transform="translate(4 3.312621)"
                    />
                    <path
                      strokeWidth="1.2"
                      d="M6.00223768 0L6.00223768 1.68445758"
                      transform="translate(4 3.312621)"
                    />
                    <path
                      strokeLinejoin="round"
                      d="M2.09058539 4.75181872L3.60826013 6.34554185 6.08161901 3.7517871"
                      transform="translate(4 3.312621)"
                    />
                  </g>
                </g>
              </svg>
            </div>
          )}
          <span>ID #{task.id}</span>
        </a>
        <div className={style.tooltip_name}>
          {task.bizType === 1 ? "需求" : "任务"}标题：{task.name}
        </div>
      </div>
    );
  }, [task]);

  const popContent = useMemo(() => {
    return (
      <div className={style.tooltip_content}>
        {task.bizType === 2 && task.needName && (
          <div className={style.tooltip_content_item}>
            <span className={style.tooltip_label}>关联需求</span>
            <span>{task.needName}</span>
          </div>
        )}
        <div className={style.tooltip_content_item}>
          <span className={style.tooltip_label}>状态</span>
          <span>{task.bizStatusName}</span>
        </div>
        <div className={style.tooltip_content_item}>
          <span className={style.tooltip_label}>
            {task.showType === 1 ? "预计" : "实际"}执行时间
          </span>
          <span>{`${task.start.getFullYear()}.${
            task.start.getMonth() + 1
          }.${task.start.getDate()} - ${task.end.getFullYear()}.${
            task.end.getMonth() + 1
          }.${task.end.getDate()}`}</span>
        </div>
        {task.bizType === 1 && task.parentNeedName && (
          <div className={style.tooltip_content_item}>
            <span className={style.tooltip_label}>所属需求</span>
            <span>{task.parentNeedName}</span>
          </div>
        )}
        {task.bizType === 2 && (
          <div>
            <div className={style.tooltip_content_item}>
              <span className={style.tooltip_label}>预估工时</span>
              <span>{task.estimatedTime}h</span>
            </div>
            <div className={style.tooltip_content_item}>
              <span className={style.tooltip_label}>实际工时</span>
              <span>{task.realTime}h</span>
            </div>
          </div>
        )}
      </div>
    );
  }, [task]);

  return (
    <Popover
      overlayStyle={{ width: "420px" }}
      placement="bottomLeft"
      destroyTooltipOnHide
      title={popTitle}
      content={popContent}
      color="#fff"
      trigger="hover"
      zIndex={200}
    >
      <g
        onKeyDown={e => {
          switch (e.key) {
            case "Delete": {
              if (isDelete) onEventStart("delete", task, e);
              break;
            }
          }
          e.stopPropagation();
        }}
        onMouseEnter={e => {
          onEventStart("mouseenter", task, e);
        }}
        onMouseLeave={e => {
          onEventStart("mouseleave", task, e);
        }}
        onDoubleClick={e => {
          onEventStart("dblclick", task, e);
        }}
        onClick={e => {
          onEventStart("click", task, e);
        }}
        onFocus={() => {
          onEventStart("select", task);
        }}
      >
        {/* 不展示 project，改为使用  grid row 展示工时数据 */}
        {/* {task.typeInternal === "project" ? null : taskItem} */}
        {taskItem}
        <foreignObject
          x={task.x1}
          y={task.y - 8}
          width={task.x2 - task.x1}
          height={taskHeight}
        >
          <div className={style.bar_top_text}>{task.name}</div>
        </foreignObject>
        {/* {task.typeInternal !== "project" && (
        <text
          x={getX()}
          // y={task.y + taskHeight * 0.5}
          y={task.y - 10}
          className={
            isTextInside
              ? style.barLabel
              : style.barLabel && style.barLabelOutside
          }
          ref={textRef}
        >
          {task.name}
        </text>
      )} */}
      </g>
    </Popover>
  );
};
