import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import PopModal from '../Modal/PopModal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDrag, useDrop } from 'react-dnd';
import { red, green, purple, grey } from '@mui/material/colors';

const TaskPriority = ({ tasks, setTasks, handleSubmit }) => {
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
                            <Section status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} done={done} handleSubmit={handleSubmit} />
                        </Grid>
                    ))}

                </Grid>
            </Box>
        </>
    )
}

export default TaskPriority;

const Section = ({ status, setTasks, tasks, todos, inProgress, done, handleSubmit }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addItemToSection(item?.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "todo";
    let bg = red[500];
    let taskPriority = todos

    if (status === "inprogress") {
        text = "In Progress";
        bg = purple[500];
        taskPriority = inProgress
    }
    if (status === "done") {
        text = "done";
        bg = green[500];
        taskPriority = done
    }

    const addItemToSection = (id) => {
        setTasks((prev) => {
            const updatedTasks = prev.map(t => {
                if (t.id === id) {
                    return { ...t, status: status }
                } else {
                    return t
                }
            })
            if (JSON.stringify(prev) === JSON.stringify(updatedTasks)) {
                toast.error('No status changed.');
            } else {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                toast.success('Successfully task status changed.');
            }
            return updatedTasks
        })
    }

    return <>
        <Box
            ref={drop}
            sx={{
                padding: 3,
                ...(isOver ? { backgroundColor: grey[400] } : {}),
            }}
        >
            <Header text={text} bg={bg} count={taskPriority?.length} handleSubmit={handleSubmit} />
            {taskPriority?.length > 0 && taskPriority?.map(task =>
                <Task key={task?.id} task={task} tasks={tasks} setTasks={setTasks} />
            )}
        </Box>
    </>
}

const Header = ({ text, bg, count, handleSubmit }) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: bg,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        textTransform: 'uppercase',
        color: theme.palette.text.secondary,
    }));
    return (
        <Box>
            <Item
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Typography variant="h5" component="h5"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >{text}
                    <Typography sx={{ ml: '4px', p: '4px', backgroundColor: grey[300] }}
                        variant="body1" component="body1">{count}</Typography >
                </Typography>
                {text === 'todo' && (
                    <Button
                        onClick={handleSubmit}
                        startIcon={<AddOutlinedIcon
                            sx={{ fill: 'inherit' }}
                        />}>
                    </Button>
                )}
            </Item>

        </Box>
    )
};

const Task = ({ task, tasks, setTasks }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        justifyContent: 'space-between',
        alighItems: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleDelete = (id) => {
        const shortTodo = tasks.filter(task => task?.id !== id);
        localStorage.setItem('tasks', JSON.stringify(shortTodo));
        setTasks(shortTodo);
        toast.success('Successfully Delete!')
    }
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task?.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <Box>
            <Card
                ref={drag}
                sx={{ maxWidth: 345, mt: '8px' }}>
                <CardHeader
                    title={task?.title || "No Title"}
                    subheader={task?.date}
                    action={
                        <>
                            <MoreVertIcon
                                onClick={handleOpen}
                            />
                            <DeleteOutlinedIcon
                                onClick={() => handleDelete(task?.id)}
                            />
                        </>

                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {task?.description}
                    </Typography>
                </CardContent>
            </Card>
            <PopModal
                open={open}
                handleClose={handleClose}
                task={task} tasks={tasks}
                setTasks={setTasks} />
        </Box>
    )
};