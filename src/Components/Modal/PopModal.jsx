import { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PopModal = ({ open, handleClose, task, tasks, setTasks }) => {
  console.log(task);
  const [editedTaskName, setEditedTaskName] = useState(task?.name || '');
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

    const updatedTasks = tasks.map((t) =>
      t?.id === task?.id ? { ...t, name: editedTaskName } : t );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    handleClose();
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          value={editedTaskName}
          onChange={(e) => setEditedTaskName(e.target.value)}
          id="outlined-basic"
          label="Outlined" variant="outlined" />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Button
        onClick={handleSave}
        type='submit'
        variant="contained">save</Button>
      </Box>
    </Modal>
  )
}

export default PopModal