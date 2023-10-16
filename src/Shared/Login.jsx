import { useReducer } from 'react';
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { initialState, reducer } from '../formAction/formAction';
import { INPUT } from '../actionHook/actionType';

const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = allUsers.find(
      (u) => u.email === state.email && u.password === state.password
    );

    if (user) {
      navigate('/');
      toast.success('Successfully logged in!');
    } else {
      alert('Login failed. Please check your email and password.');
      toast.error('Login failed. Please check your email and password.');
    }};

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                name="email"
                value={state.email}
                onChange={(e) =>
                  dispatch({
                    type: INPUT,
                    payload: { name: "email", value: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                name="password"
                value={state.password}
                onChange={(e) =>
                  dispatch({
                    type: INPUT,
                    payload: { name: "password", value: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            fullWidth
            type='submit'
          >
            Login
          </Button>

          <Typography variant="body2"
          sx={{ mt: 1 }}
          >
            New user ? <Link
            color="error" 
            to="/register">
            register
            </Link>
          </Typography>

        </Box>
      </div>
    </Container>
  )
}

export default Login