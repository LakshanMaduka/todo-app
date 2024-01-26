import React from 'react'
type SummeryParams={
  totalTasks:number,
  CompletedTasks:number
}
function Summery(props: SummeryParams) {
  return (
    <div className='   justify-between items-center  flex absolute p-2 gap-10 text-center top-[100px] w-2/3'>
          <div className=' flex font-Playpen font-bold text-xl  text-orange-800 items-center'>
            <div className='pr-5 '>Total Tasks</div>
            <div>{props.totalTasks}</div> 
          </div>
          <div className='flex font-Playpen font-bold text-xl text-orange-800 items-center'>
            <div  className='pr-5'>Completed Tasks</div>
            <div>{props.CompletedTasks}</div> 
          </div>

          </div>
  )
}

export default Summery