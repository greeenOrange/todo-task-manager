import { useEffect, useState } from 'react'
import './App.css'
import DoTask from './DoTask/DoTask'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
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
    <DndProvider backend={HTML5Backend}>
      <DoTask tasks={tasks} setTasks={setTasks}/>
      </DndProvider>
    </>
  )
}

export default App
