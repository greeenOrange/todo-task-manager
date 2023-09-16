import { useState } from 'react'
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const PopModal = ({ open, handleClose, task, tasks, setTasks }) => {
  const [editedTaskTitle, setEditedTaskTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [priority, setPriority] = useState('medium'); 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: editedTaskTitle,
      description,
      date,
      priority,
    };

    const updatedTasks = tasks.map((t) =>
      t?.id === task?.id ? updatedTask : t
    );

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTasks(updatedTasks);

    handleClose();
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={style}
        onSubmit={handleSave}
      >
        <TextField
          value={editedTaskTitle}
          onChange={(e) => setEditedTaskTitle(e.target.value)}
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          label="priority"
        >
          <MenuItem value="low">low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="now">Now!</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Modal>
  )
}

export default PopModal