import React from 'react'

const TimeLine = () => {
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

              })}
          </div>
        </div>
      </div>
              </div>
  )
}

export default TimeLine