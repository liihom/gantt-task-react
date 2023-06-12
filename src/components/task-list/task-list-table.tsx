// import React, { useMemo } from "react";
import React from "react";
import styles from "./task-list-table.module.css";
// import { Task } from "../../types/public-types";
import { GroupProps } from "../../types/bar-task";
import { ItemProps } from "../../types/public-types";

// const localeDateStringCache = {};
// const toLocaleDateStringFactory =
//   (locale: string) =>
//   (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
//     const key = date.toString();
//     let lds = localeDateStringCache[key];
//     if (!lds) {
//       lds = date.toLocaleDateString(locale, dateTimeOptions);
//       localeDateStringCache[key] = lds;
//     }
//     return lds;
//   };
// const dateTimeOptions: Intl.DateTimeFormatOptions = {
//   weekday: "short",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: GroupProps[];
  // selectedTaskId: string;
  // setSelectedTask: (taskId: string) => void;
  // onExpanderClick: (task: Task) => void;
  onExpanderClick: (task: ItemProps) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  // locale,
  onExpanderClick,
}) => {
  // console.log(locale);
  // const toLocaleDateString = useMemo(
  //   () => toLocaleDateStringFactory(locale),
  //   [locale]
  // );

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map(t => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }

        const itemHeight = rowHeight * (t.tasks.length + 1);

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: itemHeight }}
            key={`${t.id}row`}
          >
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
              // title={t.name}
            >
              <div
                className={styles.taskListNameWrapper}
                onClick={() => onExpanderClick(t)}
              >
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                >
                  {expanderSymbol}
                </div>
                {/* <div>{t.type === "project" ? t.name : ""}</div> */}
                <div>{t.name}</div>
              </div>
            </div>
            {/* <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
                display: "none",
              }}
            >
              &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
                display: "none",
              }}
            >
              &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
            </div> */}
          </div>
        );
      })}
    </div>
  );
};
