import { useState } from 'react';
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const from = location.state?.from.pathname || '/'

  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (email === user?.email && password === user?.password) {
        localStorage.setItem('isLoggedIn', 'true');
        setAuth({user})
        navigate(from, { replace: true})
        toast.success('Successfully task status changed.');
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('User not found');
    }
  };
  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            sx={{mt: 2}}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </form>
      </div>
    </Container>
  )
}

export default Login