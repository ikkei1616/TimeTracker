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
  const days =["SunDay","MonDay","TuesDay","WednesDay","ThursDay","FriDay","SaturDay"];

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
            task.fromTopDistance = durationHour

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
            return today.getDate() === taskStartTime.getDate();
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
    <div className="w-9/12 h-[85vh] ">
      <h2 className="h-[5%] py-2 text-3xl text-left  font-bold ">Task Time Line</h2>
      <div className="h-[95%] border-4 border-mainBlack">
        <div className="h-[5%] py-2 text-center text-3xl border-2 border-mainGray">
          <p><span className="mr-4">{thisMonth+"/"+thisDate}</span><span>{days[thisDay]}</span></p>
        </div>
        <div className="h-[95%] overflow-y-auto">
          <div className="w-full flex justify-between ">
            <div className='relative w-2/12 border-2 border-mainGray '>
              {Array.from({length:23}).map((_, i) => {
                return <p key={i}  className="text-lg" style={{ position:"absolute",top: `${(i+1) * 60 -10 }px`,right:20}} >{i+1}:00</p>
              })}
            </div>
            <div className='relative grid  grid-rows-24  w-10/12 h-[1040xp] bg-white border-2 border-mainGray'>
                <div>
                  {Array.from({length:24}).map((_, i) => {
                    return (<div key={i} className="h-[60px] border border-mainGray"></div>)
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
    </div>
  )
}

export default TimeLine