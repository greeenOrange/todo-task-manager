import { useReducer } from 'react';
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { initialState, reducer } from '../formAction/formAction';
import { INPUT } from '../actionHook/actionType';

const Login = () => {

  const navigate = useNavigate();
  const from = location.state?.from.pathname || '/'

  const [state, dispatch] = useReducer(reducer, initialState);

 const handleSubmit = (e) => {
  e.preventDefault();
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (state.email === storedUser?.email && state.password === storedUser?.password) {
    state.email === storedUser?.email && state.password === storedUser?.password
    toast.success('Successfully created!');
      navigate('/');
  }
  else {
    toast.error('Invalid email or password.');
  }

};

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

          <Typography variant="body2" color="error">
            ERROR
          </Typography>

        </Box>
      </div>
    </Container>
  )
}

export default Login