import React, { useRef, useEffect, useState } from "react";
import { Task } from "../../types/public-types";
import { BarTask } from "../../types/bar-task";
import styles from "./tooltip.module.css";

export type TooltipProps = {
  task: BarTask;
  arrowIndent: number;
  rtl: boolean;
  svgContainerHeight: number;
  svgContainerWidth: number;
  svgWidth: number;
  headerHeight: number;
  taskListWidth: number;
  scrollX: number;
  scrollY: number;
  rowHeight: number;
  fontSize: string;
  fontFamily: string;
  TooltipContent: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
  }>;
};
export const Tooltip: React.FC<TooltipProps> = ({
  task,
  rowHeight,
  rtl,
  svgContainerHeight,
  svgContainerWidth,
  scrollX,
  scrollY,
  arrowIndent,
  fontSize,
  fontFamily,
  headerHeight,
  taskListWidth,
  TooltipContent,
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [relatedY, setRelatedY] = useState(0);
  const [relatedX, setRelatedX] = useState(0);
  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipHeight = tooltipRef.current.offsetHeight * 1.1;
      const tooltipWidth = tooltipRef.current.offsetWidth * 1.1;

      let newRelatedY = task.index * rowHeight - scrollY + headerHeight;
      let newRelatedX: number;
      if (rtl) {
        newRelatedX = task.x1 - arrowIndent * 1.5 - tooltipWidth - scrollX;
        if (newRelatedX < 0) {
          newRelatedX = task.x2 + arrowIndent * 1.5 - scrollX;
        }
        const tooltipLeftmostPoint = tooltipWidth + newRelatedX;
        if (tooltipLeftmostPoint > svgContainerWidth) {
          newRelatedX = svgContainerWidth - tooltipWidth;
          newRelatedY += rowHeight;
        }
      } else {
        newRelatedX = task.x2 + arrowIndent * 1.5 + taskListWidth - scrollX;
        const tooltipLeftmostPoint = tooltipWidth + newRelatedX;
        const fullChartWidth = taskListWidth + svgContainerWidth;
        if (tooltipLeftmostPoint > fullChartWidth) {
          newRelatedX =
            task.x1 +
            taskListWidth -
            arrowIndent * 1.5 -
            scrollX -
            tooltipWidth;
        }
        if (newRelatedX < taskListWidth) {
          newRelatedX = svgContainerWidth + taskListWidth - tooltipWidth;
          newRelatedY += rowHeight;
        }
      }

      const tooltipLowerPoint = tooltipHeight + newRelatedY - scrollY;
      if (tooltipLowerPoint > svgContainerHeight - scrollY) {
        newRelatedY = svgContainerHeight - tooltipHeight;
      }
      setRelatedY(newRelatedY);
      setRelatedX(newRelatedX);
    }
  }, [
    tooltipRef,
    task,
    arrowIndent,
    scrollX,
    scrollY,
    headerHeight,
    taskListWidth,
    rowHeight,
    svgContainerHeight,
    svgContainerWidth,
    rtl,
  ]);

  return (
    <div
      ref={tooltipRef}
      className={
        relatedX
          ? styles.tooltipDetailsContainer
          : styles.tooltipDetailsContainerHidden
      }
      style={{ left: relatedX, top: relatedY }}
    >
      <TooltipContent task={task} fontSize={fontSize} fontFamily={fontFamily} />
    </div>
  );
};

export const StandardTooltipContent: React.FC<{
  task: Task;
  fontSize: string;
  fontFamily: string;
}> = ({ task, fontSize, fontFamily }) => {
  const style = {
    fontSize,
    fontFamily,
  };
  return (
    <div className={styles.tooltipDefaultContainer} style={style}>
      <div className={styles.tooltip_id}>
        {task.bizType === 1 ? (
          <div className={styles.tooltip_id_icon}>
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
                  <g id="编组-16" transform="translate(835.000000, 410.000000)">
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
          <div className={styles.tooltip_id_icon}>
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
      </div>
      <div className={styles.tooltip_title}>
        {task.bizType === 1 ? "需求" : "任务"}标题：{task.name}
      </div>
      {task.bizType === 2 && task.needName && (
        <div className={styles.tooltipContentItems}>
          <span>关联需求</span>
          <span>{task.needName}</span>
        </div>
      )}
      <div className={styles.tooltipContentItems}>
        <span>状态</span>
        <span>{task.bizStatusName}</span>
      </div>
      <div className={styles.tooltipContentItems}>
        <span>{task.showType === 1 ? "预计" : "实际"}执行时间</span>
        <span>{`${task.start.getFullYear()}.${
          task.start.getMonth() + 1
        }.${task.start.getDate()} - ${task.end.getFullYear()}.${
          task.end.getMonth() + 1
        }.${task.end.getDate()}`}</span>
      </div>
      {/* <div className={styles.tooltipContentItems}>
        <span>实际执行时间</span>
        <span>{`${task.start.getFullYear()}.${
          task.start.getMonth() + 1
        }.${task.start.getDate()} - ${task.end.getFullYear()}.${
          task.end.getMonth() + 1
        }.${task.end.getDate()}`}</span>
      </div> */}
      {task.bizType === 1 && task.parentNeedName && (
        <div className={styles.tooltipContentItems}>
          <span>所属需求</span>
          <span>{task.parentNeedName}</span>
        </div>
      )}
      {task.bizType === 2 && (
        <div>
          <div className={styles.tooltipContentItems}>
            <span>预估工时</span>
            <span>{task.estimatedTime}h</span>
          </div>
          <div className={styles.tooltipContentItems}>
            <span>实际工时</span>
            <span>{task.realTime}h</span>
          </div>
        </div>
      )}
      {/* <b style={{ fontSize: fontSize + 6 }}>{`${
        task.name
      }: ${task.start.getDate()}-${
        task.start.getMonth() + 1
      }-${task.start.getFullYear()} - ${task.end.getDate()}-${
        task.end.getMonth() + 1
      }-${task.end.getFullYear()}`}</b>
      {task.end.getTime() - task.start.getTime() !== 0 && (
        <p className={styles.tooltipDefaultContainerParagraph}>{`Duration: ${~~(
          (task.end.getTime() - task.start.getTime()) /
          (1000 * 60 * 60 * 24)
        )} day(s)`}</p>
      )}

      <p className={styles.tooltipDefaultContainerParagraph}>
        {!!task.progress && `Progress: ${task.progress} %`}
      </p> */}
    </div>
  );
};
