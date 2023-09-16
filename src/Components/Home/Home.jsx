import { useEffect, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DoTask from '../DoTask/DoTask';

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, [])
    return (
    <>
    <DndProvider backend={HTML5Backend}>
       <DoTask tasks={tasks} setTasks={setTasks} />
    </DndProvider>
    </>
    )
}

export default Home