import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import TaskPriority from '../TaskPriority/TaskPriority';

const DoTask = ({tasks, setTasks}) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.name.length < 3) return toast.error("Must Have min 3 characters.")
        setTasks((prevState) => {
            const updatedTasks = [...prevState, task];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        });
        toast.success('Successfully Assign tasks');

        setTask({
            id: "",
            name: "",
            status: "todo"
        });
    }

    return (
        <Box
        mt={3}
        container
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
        >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <form
            style={{display: "flex", alignItems: "center", justifyContent: "center"}}
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
            <TaskPriority tasks={tasks} setTasks={setTasks}/>
        </Box>
    )
}

export default DoTask