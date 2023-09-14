import React, { useEffect, useState } from 'react'

const TaskPriority = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setProgress] = useState([]);
    const [done, setDone] = useState([]);
    console.log(todos);

    useEffect(() => {
        const shortTodo = tasks.filter(task => task.status === "todo");
        const shortInProgress = tasks.filter(task => task.status === "inprogress");
        const shortDone = tasks.filter(task => task.status === "done");
        setTodos(shortTodo)
        setProgress(shortInProgress)
        setDone(shortDone);
    }, [tasks]);
    const stateUses = ["todo", "inprogress", "done"];
    return (
        <div>
            <ul>
                <ul>
                    {stateUses?.map((status, index) => (
                        <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgres={inProgress} done={done} />
                    ))}
                </ul>
            </ul>
        </div>
    )
}

export default TaskPriority;

const Section = ({ status, setTasks, tasks, todos, inProgres, done }) => {
    let text = "Todo";
    let bg = "bg-slate-500"
    return <>
        <div >
    <Header text={text} bg={bg} count={todos?.length}/>
        </div>
    </>
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex`}>
            <li><h2>{text}</h2>List</li>
        </div>
    )
}