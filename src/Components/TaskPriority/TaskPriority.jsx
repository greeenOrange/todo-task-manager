import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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
        <Box mt={3}
        sx={{ width: '75%' }}
        >
            <Grid
                container
                spacing={2}>
                {stateUses?.map((status, index) => (
                    <Grid key={index} item xs={4}>
                        <Section status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgres={inProgress} done={done} />
                    </Grid>
                ))}

            </Grid>
        </Box>
    )
}

export default TaskPriority;

const Section = ({ status, setTasks, tasks, todos, inProgres, done }) => {
    let text = "Todo";
    let bg = "bg-slate-500"
    return <>
        <div>
            <Header text={text} bg={bg} count={todos?.length} />
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
            </h2>List</Item>
        </div>
    )
}