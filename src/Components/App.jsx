import { useEffect, useState } from 'react'
import './App.css'
import DoTask from './DoTask/DoTask'

function App() {
  const [tasks, setTasks] = useState([]);

useEffect(() =>{
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            setTasks(savedTasks);
        }
}, [])
  return (
    <>
      <DoTask tasks={tasks} setTasks={setTasks}/>
    </>
  )
}

export default App
