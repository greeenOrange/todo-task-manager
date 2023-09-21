import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import TaskPriority from '../TaskPriority/TaskPriority';

const DoTask = ({tasks, setTasks}) => {
    const [task, setTask] = useState({
        id: "",
        title: "",
        status: "todo"
    })

    const handleChange = (e) => {
        setTask({ ...task, id: uuidv4(), title: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const shortCutTask = {
          ...task,
          id: uuidv4(),
        };
        
        setTasks((prevState) => {
          const updatedTasks = [...prevState, shortCutTask];
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          return updatedTasks;
        });
        toast.success('Successfully assigned task.');
    
        setTask({
          id: '',
          title: '',
          status: 'todo',
        });
      };

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
                    label="title" variant="outlined"
                    value={task?.title}
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    variant="contained">ADD</Button>
            </form>
            <TaskPriority tasks={tasks} setTasks={setTasks} handleSubmit={handleSubmit}/>
        </Box>
    )
}

export default DoTask