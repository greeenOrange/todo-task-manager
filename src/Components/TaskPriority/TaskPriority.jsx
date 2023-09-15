import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import PopModal from '../Modal/PopModal';


const TaskPriority = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setProgress] = useState([]);
    const [done, setDone] = useState([]);
    const stateUses = ["todo", "inprogress", "done"];

    useEffect(() => {
        const shortTodo = tasks.filter(task => task.status === "todo");
        const shortInProgress = tasks.filter(task => task.status === "inprogress");
        const shortDone = tasks.filter(task => task.status === "done");
        setTodos(shortTodo)
        setProgress(shortInProgress)
        setDone(shortDone);
    }, [tasks]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
        <Box mt={3}
            sx={{ width: '75%' }}
        >
            <Grid
                container
                spacing={2}>
                {stateUses?.map((status, index) => (
                    <Grid key={index} item xs={4}>
                        <Section status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} done={done} />
                    </Grid>
                ))}

            </Grid>
        </Box>
        </>
    )
}

export default TaskPriority;

const Section = ({ status, setTasks, tasks, todos, inProgress, done }) => {
    console.log(todos);
    let text = "todo";
    let bg = "bg-slate-500";
    let taskPriority = todos

    if (status === "inprogress") {
        text = "In Progress";
        bg = "bg-purple-500"
        taskPriority = inProgress
    }
    if (status === "done") {
        text = "done";
        bg = "bg-green-500"
        taskPriority = done
    }

    return <>
        <div>
            <Header text={text} bg={bg} count={taskPriority?.length} />
            {taskPriority?.length > 0 && taskPriority?.map(task => <Task key={task?.id} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    </>
}

const Header = ({ text, bg, count }) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <div className={`${bg} flex`}>
            <Item><h2>{text}
                <span className="">{count}</span>
            </h2>
            </Item>
        </div>
    )
};

const Task = ({ task, tasks, setTasks }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = (id) => {
        const shortTodo = tasks.filter(task => task?.id !== id);
        localStorage.setItem('tasks', JSON.stringify(shortTodo));
        setTasks(shortTodo);
        toast.success('Successfully Delete!')
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        justifyContent: 'space-between',
        alighItems: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Box>
            <Item
            onClick={handleOpen} 
            sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <h4>{task?.title}</h4>
                <span>
                    <Button 
                    variant="outlined" 
                    startIcon={<DeleteOutlinedIcon />} 
                    onClick={() => handleDelete(task?.id)}
                    >
                        Delete
                    </Button>
                </span>
            </Item>
            <PopModal 
            open={open} 
            handleClose={handleClose} 
            task={task} tasks={tasks} 
            setTasks={setTasks}/>
        </Box>
    )
};