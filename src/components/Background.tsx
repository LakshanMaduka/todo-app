import {  useEffect, useRef, useState } from 'react';
import backgroundimg from '../assets/Images/background.png';


import { MdEdit , MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import moment from "moment";
import Paginations from './Paginations';
import Title from './Title';
import Summery from './Summery';

 interface item {
  id : number,
  text: string,
  completed: boolean,
  date: number
  

 }

function Background() {
//  let currentDate: Date = new Date(); 

const [todos,setTodo]= useState<item[]>([]);
const [completedTodos,setCompletedTodos]= useState<item[]>([]);

const inputRefw = useRef<HTMLInputElement>(null);
const inputRefm = useRef<HTMLInputElement>(null);



// take the number of total tasks
const [totalTasks , setTotalTasks] = useState(todos.length);
useEffect(()=>{
  setTotalTasks(todos.length);
},[todos.length]);  

// get no of completed tasks
useEffect(()=>{
  handleCompletdTasks();
},[todos]);
 


const [completedTasks , setCompletedTasks] = useState(completedTodos.length);
useEffect(()=>{

  setCompletedTasks(completedTodos.length);
},[completedTodos])

// function for add task
function handleAddTask(inputRef: React.RefObject<HTMLInputElement>) {
  const newTodo: item = {
    id: Math.random(),
    text: inputRef.current!.value,
    completed: false,
    date: Date.now()
  };
 
   setTodo([...todos,newTodo]);
  inputRef.current!.value ="";
}



// function for get complete tasks
function handleCompletdTasks() {
  setCompletedTodos(todos.filter((todo)=>   todo.completed === true));
  
}
// function for togle completness
function handleToggle (id:number){
  
  setTodo(
    todos.map((todo)=>{
      if(todo.id === id){
        return {...todo, completed : !todo.completed};
      }
      return todo;
    })
  );
 
}


// function for delete item from the list

function handleDelete(id:number){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

    setTodo(
      todos.filter((todo)=>todo.id !== id)
    )
      Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success"
      });
    }

  });
}

// function for edit tasks
function handleEdit(task:string ,id:number){
  Swal.fire({
    title: "Edit your Task",
    input: "text",
    inputValue:task,
    showCancelButton: true,
    confirmButtonText: "Save",
  }).then((result) => {
setTodo( todos.map((todo)=>{
  if(todo.id==id){
    return {...todo,text:result.value}
  }
  return todo;
}))
    
    if (result.isConfirmed) {
      Swal.fire({
        title: "Updated!",
        text: "Your task hasbeen updated.",
        icon: "success"
      });
    }
  });
}
//pagination 
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage :number =7;
const lastIndex:number = currentPage* postsPerPage;
const firstIndex:number =   lastIndex - postsPerPage;

const currentData = todos.slice(firstIndex,lastIndex);
useEffect(()=>{
  if(currentData.length === 0 && currentPage !== 1) {
   setCurrentPage(currentPage-1);
  }
 
},[todos])


let color: string ="";

  return (
    <div className='grid sm:grid-cols-3 items-center justify-center  md:mx-10 xl:mx-44 '>
        
        <div  className='relative flex  justify-center bg-black  col-span-2'>
          
            <img src={backgroundimg} className='h-screen w-full  '/>
            <Title/>
            <Summery totalTasks={totalTasks} CompletedTasks={completedTasks} />
            
            <div className='absolute h-[400px] w-full  top-36 mx-14'>
            <div className="w-full flex justify-center items-center">
            <Paginations  currentPage={currentPage} totalPosts = {todos.length} numberOfPosts = {postsPerPage} setCuttentPage={setCurrentPage}/>
            </div>
              {
                currentData.map((todo,index)=>{
                  if(index %2 ==0 ){
                       color = "bg-dark-brown"
                  }
                  else {
                    color = "bg-dark-light-brown"
                  }
                  return <div key={todo.id} className={` mx-20 ${color} font-Playpen bg-dark-brown rounded-lg p-2 m-2 flex justify-between items-center`}>
                  <div className='flex-grow'>
                  <div className='text-white text-xl'> {todo.text} </div>
                  <div className='text-sm text-white'>{moment(todo.date).format('lll')}</div> 
                  
                  </div>
                  <MdEdit className='mr-2 cursor-pointer text-xl text-orange-950' onClick={()=>{
                    handleEdit(todo.text, todo.id)
                  }} />
                  <MdDelete className='mr-2 cursor-pointer text-xl text-orange-950 ' onClick={()=>{
                    handleDelete(todo.id)
                  }}/>
                  <input type='checkbox' className=' accent-white  h-4 w-4 cursor-pointer ' checked={todo.completed} onChange={()=>{
                    handleToggle(todo.id);
                    
                  }}/> 
                  </div>
                  
                })
              }
            </div>

            <div className='absolute bottom-0 sm:hidden'>

            <input type="text" id="input" ref={inputRefm} className="bg-gray-50 border sm:relative   text-lg rounded-lg focus:outline-none w-full  focus:ring-2 focus:ring-dark-light-brown  mb-4 border-dark-brown  p-2.5  " placeholder="Add your task here..." required />
             <button type="button" onClick={()=>{
             handleAddTask(inputRefm);
        }} className="text-white bg-dark-brown w-full hover:bg-dark-light-brown focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Add Task</button>
            </div>
        </div>
        
        <div className="mb-6 mx-2 sm:mx-10 hidden sm:block font-Poppins">
        
        <input type="text" ref={inputRefw} id="text"  className="bg-gray-50 border sm:relative   text-lg rounded-lg focus:outline-none w-full  focus:ring-2 focus:ring-dark-light-brown  mb-4 border-dark-brown  p-2.5  " placeholder="Add your task here..." required />
        <button type="button" onClick={()=>{
             handleAddTask(inputRefw);
             
             
        }} className="text-white  bg-dark-brown w-full hover:bg-dark-light-brown focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Add Task</button>
    </div> 
        
    </div>
  )
}

export default Background