import Task from "../components/Task";

const TaskDisplay = ({ displayTask, setTasks }) => {
  return (
    <div className="relative grid  grid-rows-24  w-10/12 h-[1040xp] bg-white">
      <div>
        {Array.from({ length: 24 }).map((_, i) => {
          return (
            <div key={i} className="h-[60px] border border-mainGray"></div>
          );
        })}
      </div>
      {displayTask.map((task) => {
        console.log("タスクmap関数", task);
        return <Task key={task.id} task={task} setTasks={setTasks} />;
      })}
    </div>
  );
};

export default TaskDisplay;
