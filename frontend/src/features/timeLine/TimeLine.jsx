import { useState, useEffect, useMemo } from "react";
import Task from "./components/Task";
import { apiFetcher } from "../../utils/apiFetcher";
import TimeDisplay from "./components/TimeDisplay";
import TaskDisplay from "./components/TaskDisplay";
import DateDisplay  from "./components/DateDisplay";

const TimeLine = () => {
  const [tasks, setTasks] = useState([]);
  const [displayTask, setDisplayTask] = useState([]);
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


  useEffect(() => {
    const getTasks = async () => {
      
      try {
        const data = await apiFetcher({httpMethod:"GET",pass:"http://localhost/api/task/tasks"})
        const addedTasks = data.tasks.map((task) => {
          const taskStartTime = new Date(task.start_time);
          let taskEndTime;
          if (!data.end_time) {
            taskEndTime = new Date();
          }
          taskEndTime = new Date(task.end_time);

          //タスクの表示位置計算のロジック
          const timeStandard = new Date();
          timeStandard.setHours(0);
          timeStandard.setMinutes(0);
          timeStandard.setSeconds(0);
          timeStandard.setMilliseconds(0);
          const durationMs = taskStartTime - timeStandard;
          const durationHour = durationMs / 3600000;
          task.fromTopDistance = durationHour;

          //タスクコンポーネントの縦幅計算のロジック
          const elapsedMs = taskEndTime - taskStartTime;
          const elapsedHour = elapsedMs / 3600000;
          task.height = elapsedHour;

          //タスクコンポーネントの縦幅に応じて、タスクの名前をコンポーネントに表示するかどうかを決定。
          task.isTitleDisplay = task.height > 2 / 3;

          return task;
        });
        setTasks(addedTasks);

        //タスクの開始日が今日かどうかフィルター
        const todayAddedTask = addedTasks.filter((task) => {
          const taskStartTime = new Date(task.start_time); //utf
          return today.getDate() === taskStartTime.getDate();
        });
        setDisplayTask(todayAddedTask);
      
      } catch (error) {
        console.log("error", error);
      }
    };
    getTasks();
  }, [today]);

  return (
    <div className="w-10/12 h-[85vh] max-w-7xl ">
      <h2 className="h-[6%] py-2 text-3xl text-left  font-bold ">
        Task Time Line
      </h2>
      <div className="h-[94%] border-4 border-mainBlack">
        <DateDisplay thisMonth={thisMonth} thisDate={thisDate} days={days} thisDay={thisDay}></DateDisplay>
        <div className="h-[93%] overflow-y-auto">
          <div className="w-full flex justify-between ">
            <TimeDisplay/>
            <TaskDisplay displayTask={displayTask} setTasks={setTasks}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
