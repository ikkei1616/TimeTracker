import { useMemo } from "react";
import { useTasks } from "./hooks/useTasks";
import TimeDisplay from "./components/TimeDisplay";
import DateDisplay from "./components/DateDisplay";
import TaskDisplay from "./components/TaskDisplay";

const TimeLine = () => {
  const today = useMemo(() => new Date(), []);
  const thisMonth = today.getMonth() + 1;
  const thisDate = today.getDate();
  const thisDay = today.getDay();
  const days = [
    "SunDay",
    "MonDay",
    "TuesDay",
    "WednesDay",
    "ThursDay",
    "FriDay",
    "SaturDay",
  ];

  const { displayedTasks, setTasks } = useTasks();

  return (
    <div className="w-10/12 h-[85vh] max-w-7xl ">
      <h2 className="h-[6%] py-2 text-3xl text-left  font-bold ">
        Task Time Line
      </h2>
      <div className="h-[94%] border-4 border-mainBlack">
        <DateDisplay
          thisMonth={thisMonth}
          thisDate={thisDate}
          days={days}
          thisDay={thisDay}
        ></DateDisplay>
        <div className="h-[93%] overflow-y-auto">
          <div className="w-full flex justify-between ">
            <TimeDisplay />
            <TaskDisplay displayTask={displayedTasks} setTasks={setTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
