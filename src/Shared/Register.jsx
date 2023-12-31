import { useReducer, useState, } from 'react'
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { initialState, reducer } from '../formAction/formAction';
import { INPUT, TOGGLE } from '../actionHook/actionType';
import toast from 'react-hot-toast';
import { Link, Navigate, useLocation } from 'react-router-dom';

const Register = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState)
  const location = useLocation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageBase64 = reader.result;
        setImagePreview(imageBase64);
        dispatch({
          type: INPUT,
          payload: { name: "image", value: imageBase64 }, // Store the base64 image data
        });
      });
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: state?.firstName,
      lastName: state?.lastName,
      email: state?.email,
      password: state?.password,
      image: state?.image,
    };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    if (!state.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    toast.success('Successfully Register in!');
    alert("register successfully.");
    <Navigate to="/login" state={{ from: location }} replace />

    if (state?.image) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        localStorage.setItem("image", reader.result);
        const userDataWithImage = {
          ...state,
          image: reader.result,
        };
        localStorage.setItem('user', JSON.stringify(userDataWithImage));
      });
      reader.readAsDataURL(state.image);
    }
  };


  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="first name"
                fullWidth
                variant="outlined"
                name="firstName"
                onChange={(e) => dispatch({
                  type: INPUT,
                  payload: { name: e.target.name, value: e.target.value },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="last name"
                fullWidth
                variant="outlined"
                name="lastName"
                onChange={(e) => dispatch({
                  type: INPUT,
                  payload: { name: e.target.name, value: e.target.value },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                fullWidth
                variant="outlined"
                name="email"
                onChange={(e) => dispatch({
                  type: INPUT,
                  payload: { name: e.target.name, value: e.target.value },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                name="password"
                onChange={(e) => dispatch({
                  type: INPUT,
                  payload: { name: e.target.name, value: e.target.value },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected Image Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
            </Grid>
            <Grid 
            item 
            xs={12}
            >
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item 
            xs={12}>
              <FormControlLabel required
                onClick={() => dispatch({ type: TOGGLE })}
                control={<Checkbox />} label="Agree to Terms and Conditions." />
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            color="primary"
            fullWidth
            disabled={!state.term}
            type="submit"
          >
            Register
          </Button>
          <Typography
          sx={{ mt: 1 }}
          >
            Already register? <Link to="/login">
            login
            </Link>
          </Typography>
        </Box>
        <img alt="" />
      </div>
    </Container>
  )
}

export default Register