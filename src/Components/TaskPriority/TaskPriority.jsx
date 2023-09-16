import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import PopModal from '../Modal/PopModal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDrag, useDrop } from 'react-dnd';

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
                        <Section status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} done={done} handleSubmit={handleSubmit}/>
                    </Grid>
                ))}

            </Grid>
        </Box>
        </>
    )
}

export default TaskPriority;

const Section = ({ status, setTasks, tasks, todos, inProgress, done, handleSubmit }) => {

    const [{isOver}, drop] = useDrop(() =>({
        accept: 'task',
        drop: (item) => addItemToSection(item?.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

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

    const addItemToSection = (id) =>{
        setTasks((prev) => {
            const updatedTasks  = prev.map(t => {
                if(t.id === id){
                    return {...t, status: status}
                }else{
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
            ...(isOver ? { backgroundColor: 'red' } : {}),
          }}
        >
            <Header text={text} bg={bg} count={taskPriority?.length} handleSubmit={handleSubmit}/>
            {taskPriority?.length > 0 && taskPriority?.map(task => 
            <Task key={task?.id} task={task} tasks={tasks} setTasks={setTasks} />
            )}
        </Box>
    </>
}

const Header = ({ text, bg, count, handleSubmit }) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Box className={`${bg} flex`}>
            <Item
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
            >
            <h2>{text}
                <span className="">{count}</span>
            </h2>
            {text === 'todo' && (
          <Button 
          onClick={handleSubmit} 
          startIcon={<AddOutlinedIcon 
          sx={{fill: 'inherit'}}
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
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
    const [{isDragging}, drag] = useDrag(() =>({
        type: 'task',
        item: {id: task?.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    console.log(isDragging);

    return (
        <Box>
            <Item
            ref={drag}
            sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>{task?.title}</h4>
                <Box>
                    <Button
                    sx={{minWidth: '28px', paddingX: '6px', paddingY: '10px'}} 
                    variant="delete" 
                    startIcon={<DeleteOutlinedIcon />} 
                    onClick={() => handleDelete(task?.id)}
                    />
                    <Button
                    sx={{minWidth: '28px', paddingX: '6px', paddingY: '10px'}} 
                    variant="edit" 
                    startIcon={<EditOutlinedIcon />} 
                    onClick={handleOpen}
                    />
                    <Button
                    sx={{minWidth: '28px', paddingX: '6px', paddingY: '10px', color: 'inherit'}} 
                    onClick={handleOpen}  
                    startIcon={<MoreVertIcon />}
                    />
                </Box>
            </Item>
            <PopModal 
            open={open} 
            handleClose={handleClose} 
            task={task} tasks={tasks} 
            setTasks={setTasks}/>
        </Box>
    )
};