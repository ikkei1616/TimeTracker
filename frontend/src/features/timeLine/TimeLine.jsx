import React from 'react'
import { useState,useEffect } from 'react';
import Task from "./components/Task";

const TimeLine = () => {
  const [tasks,setTasks ] = useState([]);
  const [displayTask,setDisplayTask] = useState([]);
  const today = new Date();
  const thisMonth = today.getMonth() +1;
  const thisDate = today.getDate();
  const thisDay = today.getDay();
  const days =["SUN","MON","TUE","WED","THU","FRI","SAT"];

  useEffect(()=>{
    const getTasks = async () => {
      try {
        const res = await fetch("http://localhost/api/task/tasks",{
          Post:"GET",
          credentials:"include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("取得したdeta",data)

        
          
          const addedTasks = data.tasks.map((task)=> {

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
            const durationHour = ( durationMs / 3600000);
            task.topLength = durationHour

            //タスクの長さ計算のロジック
            const elapsedMs = taskEndTime - taskStartTime;
            const elapsedHour = elapsedMs / 3600000;
            task.height = elapsedHour;

            return task
          })
          setTasks(addedTasks);


          //タスクの開始日が今日かどうかフィルター
          const todayAddedTask = addedTasks.filter((task)=>{
            const taskStartTime = new Date(task.start_time); //utf
           
            if (today.getDate() === taskStartTime.getDate()) {
              return task
            }
          });
          setDisplayTask(todayAddedTask)
        }
        
      } catch (error) {
        console.log("error",error);
      }
    }
    getTasks();
  },[])



  return (
    <div className="w-9/12 ">
      <h2 className="text-left border-2">Task Time Line</h2>
      <div>
        <div className="text-center border-2">
          <p>{thisMonth+"/"+thisDate}<span>{days[thisDay]}</span></p>
        </div>
        <div className="h-[1200px]  flex justify-between mb-60 ">
          <div className='relative w-2/12 border-2 border-rose-300 h-[1440px]'>
            {Array.from({length:23}).map((_, i) => {
              return <p key={i} style={{ position:"absolute",top: `${(i+1) * 60 -10}px`,right:20}} >{i+1}:00</p>
            })}
          </div>
          <div className='relative grid  grid-rows-24  w-10/12 bg-white '>
              <div>
                {Array.from({length:24}).map((_, i) => {
                  return (<div key={i} className="h-[60px] border border-black">{i}</div>)
                })}
              </div>
              {displayTask.map((task)=>{
                console.log("タスクmap関数",task)
                return <Task key={task.id} task={task} setTasks={setTasks}/>
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLine