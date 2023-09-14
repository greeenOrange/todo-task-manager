import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
const DoTask = () => {
    const [tasks, setTasks] = useState([]);
    console.log(tasks);
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        setTasks((prevState) => {
            const updatedTasks = [...prevState, task];
            localStorage.setItem("task", JSON.stringify(updatedTasks));

            return updatedTasks;
        });

        // Clear the input field after submitting
        setTask({
            id: "",
            name: "",
            status: "todo"
        });
    }

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("task"));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    return (
        <div>
            <form
                onSubmit={handleSubmit}>
                <TextField id="outlined-basic"
                    label="Outlined" variant="outlined"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <Button
                    type='submit'
                    variant="contained">Contained</Button>
            </form>
            <ul>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>{task.name}</li>
                    ))}
                </ul>
            </ul>
        </div>
    )
}

export default DoTask