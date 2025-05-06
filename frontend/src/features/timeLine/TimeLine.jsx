import React from 'react'
import { useState,useEffect } from 'react';
import Task from "./components/Task";

const TimeLine = () => {
  const [tasks,setTasks ] = useState([]);
  
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

            const taskStartTime = task.start_time;
            if (!data.end_time) {
              let taskEndTime = new Date();
            }
            let taskEndTime = task.end_time;

            //タスクの表示位置計算のロジック
            const timeStandard = new Date();
            timeStandard.setHours(0);
            timeStandard.setMinutes(0);
            timeStandard.setSeconds(0);
            timeStandard.setMilliseconds(0);
            const durationMs =(new Date(taskStartTime) - timeStandard)
            const durationHour = ( durationMs / 3600000);
            task.topLength = (durationHour + 9 );

            //タスクの長さ計算のロジック
            const elapsedMs = new Date(taskEndTime) - new Date(taskStartTime);
            const elapsedHour = elapsedMs / 3600000;
            console.log("タスク開示時間",taskStartTime);
            console.log("タスク終了時間",taskEndTime)
            console.log("タスク所要時間",elapsedHour);
            task.height = elapsedHour;

            return task
          })

          
          setTasks(addedTasks);
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
        <div className="text-center border-2">4/1 Monday</div>
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
              {tasks.map((task)=>{
                console.log("タスクmap関数",task)
                return <Task task={task} setTasks={setTasks}/>
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLine