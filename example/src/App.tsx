import React, { useState } from "react";
import { Task, ItemProps, ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
// import { getStartEndDateForProject, initTasks } from "./helper";
import "gantt-task-react/dist/index.css";
import { initData, dates as initDates } from "./helper";

// Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<ItemProps[]>(initData);
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 50;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const [dates, setDates] = useState(initDates);

  // const handleTaskChange = (task: Task) => {
  //   console.log("On date change Id:" + task.id);
  //   let newTasks = tasks.map(t => (t.id === task.id ? task : t));
  //   if (task.project) {
  //     const [start, end] = getStartEndDateForProject(newTasks, task.project);
  //     const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
  //     if (
  //       project.start.getTime() !== start.getTime() ||
  //       project.end.getTime() !== end.getTime()
  //     ) {
  //       const changedProject = { ...project, start, end };
  //       newTasks = newTasks.map(t =>
  //         t.id === task.project ? changedProject : t
  //       );
  //     }
  //   }
  //   setTasks(newTasks);
  // };

  // const handleTaskDelete = (task: Task) => {
  //   const conf = window.confirm("Are you sure about " + task.name + " ?");
  //   if (conf) {
  //     setTasks(tasks.filter(t => t.id !== task.id));
  //   }
  //   return conf;
  // };

  // const handleProgressChange = async (task: Task) => {
  //   setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  //   console.log("On progress change Id:" + task.id);
  // };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: ItemProps) => {
    setTasks(
      tasks.map(t =>
        t.id === task.id ? { ...t, hideChildren: !t.hideChildren } : t
      )
    );
    console.log("On expander click Id:" + task.id);
  };

  const handleReachedLeft = () => {
    setDates([
      {
        date: "2023-06-01",
        flag: false,
      },
      {
        date: "2023-06-02",
        flag: false,
      },
      {
        date: "2023-06-03",
        flag: true,
      },
      {
        date: "2023-06-04",
        flag: true,
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
        flag: true,
      },
      {
        date: "2023-06-11",
        flag: true,
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
      {
        date: "2023-06-17",
        flag: true,
      },
      {
        date: "2023-06-18",
        flag: true,
      },
      {
        date: "2023-06-19",
        flag: false,
      },
      {
        date: "2023-06-20",
        flag: false,
      },
      {
        date: "2023-06-21",
        flag: false,
      },
      {
        date: "2023-06-22",
        flag: true,
      },
      {
        date: "2023-06-23",
        flag: true,
      },
      {
        date: "2023-06-24",
        flag: true,
      },
      {
        date: "2023-06-25",
        flag: false,
      },
      {
        date: "2023-06-26",
        flag: false,
      },
      {
        date: "2023-06-27",
        flag: false,
      },
      {
        date: "2023-06-28",
        flag: false,
      },
      {
        date: "2023-06-29",
        flag: false,
      },
      {
        date: "2023-06-30",
        flag: false,
      },
      {
        date: "2023-07-01",
        flag: true,
      },
      {
        date: "2023-07-02",
        flag: true,
      },
      {
        date: "2023-07-03",
        flag: false,
      },
      {
        date: "2023-07-04",
        flag: false,
      },
      {
        date: "2023-07-05",
        flag: false,
      },
      {
        date: "2023-07-06",
        flag: false,
      },
      {
        date: "2023-07-07",
        flag: false,
      },
      {
        date: "2023-07-08",
        flag: true,
      },
      {
        date: "2023-07-09",
        flag: true,
      },
      {
        date: "2023-07-10",
        flag: false,
      },
      {
        date: "2023-07-11",
        flag: false,
      },
      {
        date: "2023-07-12",
        flag: false,
      },
      {
        date: "2023-07-13",
        flag: false,
      },
      {
        date: "2023-07-14",
        flag: false,
      },
      {
        date: "2023-07-15",
        flag: true,
      },
      {
        date: "2023-07-16",
        flag: true,
      },
      {
        date: "2023-07-17",
        flag: false,
      },
      {
        date: "2023-07-18",
        flag: false,
      },
      {
        date: "2023-07-19",
        flag: false,
      },
      {
        date: "2023-07-20",
        flag: false,
      },
      {
        date: "2023-07-21",
        flag: false,
      },
      {
        date: "2023-07-22",
        flag: true,
      },
      {
        date: "2023-07-23",
        flag: true,
      },
      {
        date: "2023-07-24",
        flag: false,
      },
      {
        date: "2023-07-25",
        flag: false,
      },
      {
        date: "2023-07-26",
        flag: false,
      },
      {
        date: "2023-07-27",
        flag: false,
      },
      {
        date: "2023-07-28",
        flag: false,
      },
      {
        date: "2023-07-29",
        flag: true,
      },
      {
        date: "2023-07-30",
        flag: true,
      },
      {
        date: "2023-07-31",
        flag: false,
      },
    ]);
    console.log("后退一个月 = ");
  };
  const handleReachedRight = () => {
    console.log("前进一个月 = ");
    setDates([
      {
        date: "2023-07-01",
        flag: true,
      },
      {
        date: "2023-07-02",
        flag: true,
      },
      {
        date: "2023-07-03",
        flag: false,
      },
      {
        date: "2023-07-04",
        flag: false,
      },
      {
        date: "2023-07-05",
        flag: false,
      },
      {
        date: "2023-07-06",
        flag: false,
      },
      {
        date: "2023-07-07",
        flag: false,
      },
      {
        date: "2023-07-08",
        flag: true,
      },
      {
        date: "2023-07-09",
        flag: true,
      },
      {
        date: "2023-07-10",
        flag: false,
      },
      {
        date: "2023-07-11",
        flag: false,
      },
      {
        date: "2023-07-12",
        flag: false,
      },
      {
        date: "2023-07-13",
        flag: false,
      },
      {
        date: "2023-07-14",
        flag: false,
      },
      {
        date: "2023-07-15",
        flag: true,
      },
      {
        date: "2023-07-16",
        flag: true,
      },
      {
        date: "2023-07-17",
        flag: false,
      },
      {
        date: "2023-07-18",
        flag: false,
      },
      {
        date: "2023-07-19",
        flag: false,
      },
      {
        date: "2023-07-20",
        flag: false,
      },
      {
        date: "2023-07-21",
        flag: false,
      },
      {
        date: "2023-07-22",
        flag: true,
      },
      {
        date: "2023-07-23",
        flag: true,
      },
      {
        date: "2023-07-24",
        flag: false,
      },
      {
        date: "2023-07-25",
        flag: false,
      },
      {
        date: "2023-07-26",
        flag: false,
      },
      {
        date: "2023-07-27",
        flag: false,
      },
      {
        date: "2023-07-28",
        flag: false,
      },
      {
        date: "2023-07-29",
        flag: true,
      },
      {
        date: "2023-07-30",
        flag: true,
      },
      {
        date: "2023-07-31",
        flag: false,
      },
      {
        date: "2023-08-01",
        flag: false,
      },
      {
        date: "2023-08-02",
        flag: false,
      },
      {
        date: "2023-08-03",
        flag: false,
      },
      {
        date: "2023-08-04",
        flag: false,
      },
      {
        date: "2023-08-05",
        flag: true,
      },
      {
        date: "2023-08-06",
        flag: true,
      },
      {
        date: "2023-08-07",
        flag: false,
      },
      {
        date: "2023-08-08",
        flag: false,
      },
      {
        date: "2023-08-09",
        flag: false,
      },
      {
        date: "2023-08-10",
        flag: false,
      },
      {
        date: "2023-08-11",
        flag: false,
      },
      {
        date: "2023-08-12",
        flag: true,
      },
      {
        date: "2023-08-13",
        flag: true,
      },
      {
        date: "2023-08-14",
        flag: false,
      },
      {
        date: "2023-08-15",
        flag: false,
      },
      {
        date: "2023-08-16",
        flag: false,
      },
      {
        date: "2023-08-17",
        flag: false,
      },
      {
        date: "2023-08-18",
        flag: false,
      },
      {
        date: "2023-08-19",
        flag: true,
      },
      {
        date: "2023-08-20",
        flag: true,
      },
      {
        date: "2023-08-21",
        flag: false,
      },
      {
        date: "2023-08-22",
        flag: false,
      },
      {
        date: "2023-08-23",
        flag: false,
      },
      {
        date: "2023-08-24",
        flag: false,
      },
      {
        date: "2023-08-25",
        flag: false,
      },
      {
        date: "2023-08-26",
        flag: true,
      },
      {
        date: "2023-08-27",
        flag: true,
      },
      {
        date: "2023-08-28",
        flag: false,
      },
      {
        date: "2023-08-29",
        flag: false,
      },
      {
        date: "2023-08-30",
        flag: false,
      },
      {
        date: "2023-08-31",
        flag: false,
      },
    ]);
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <Gantt
        dates={dates}
        tasks={tasks}
        // dateRangeStart={new Date("2023-05-25")}
        // dateRangeEnd={new Date(new Date().setMonth(new Date().getMonth() + 1))}
        viewMode={view}
        // onDateChange={handleTaskChange}
        // onDelete={handleTaskDelete}
        // onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        // listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        locale="zh"
        onReachedLeft={handleReachedLeft}
        onReachedRight={handleReachedRight}
        containerHeight="500px"
      />
      {/* <h3>Gantt With Limited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        ganttHeight={300}
        columnWidth={columnWidth}
      /> */}
    </div>
  );
};

export default App;
