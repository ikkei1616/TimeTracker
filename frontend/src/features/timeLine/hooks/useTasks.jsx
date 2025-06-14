import { useEffect, useState, useMemo } from "react";
import { getTasks } from "../api/getTasks";
import { addTaskProperties } from "../utlis/addTaskProperties";
import { filterDisplayedTask } from "../utlis/filterDisplayedTask";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const today = useMemo(() => new Date(), []);

  const changeDisplayedTasks = ({ type, displayedDate }) => {
    let dateFilter = new Date(displayedDate);
    switch (type) {
      case "tomorrow": {
        const nextDay = displayedDate.getDate() + 1;
        dateFilter.setDate(nextDay);
        break;
      }
      case "yesterday": {
        const previousDay = displayedDate.getDate() - 1;
        dateFilter.setDate(previousDay);
        break;
      }
    }
    const filteredDisplayedTasks = tasks.filter((task) => {
      const startTime = new Date(task.start_time)
      const isFilter = startTime.getDate() === dateFilter.getDate();
      return isFilter;
    });
    setDisplayedTasks(filteredDisplayedTasks);
  };



  useEffect(() => {
    
    getTasks()
      .then((tasks) => addTaskProperties(tasks))
      .then((processedTasks) => {
        setTasks(processedTasks);
        return processedTasks;
      })
      .then((processedTasks) => {
        const filteredDisplayedTask = filterDisplayedTask(processedTasks);
        setDisplayedTasks(filteredDisplayedTask);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [today]);

  return { displayedTasks, setTasks, setDisplayedTasks, changeDisplayedTasks};
};
