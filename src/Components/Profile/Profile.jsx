import React, { useReducer, useState } from 'react'
import { initialState, reducer } from '../../formAction/formAction';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Profile = () => {
  const [state] = useReducer(reducer, initialState);


  const allUsers = JSON.parse(localStorage.getItem('users')) || [];
  console.log(allUsers);
  // if (user) {
  //   Navigate('/');
  //   toast.success('Successfully logged in!');
  // } else {
  //   alert('Login failed. Please check your email and password.');
  //   toast.error('Login failed. Please check your email and password.');
  // }

  return (
    <Container maxWidth="sm">
      <Grid
        mt={2} container spacing={2}>
        {allUsers.map((user) => (
          <Grid key={user?.email} item xs={6}>
            <Card
              sx={{ maxWidth: 345 }}>
              <Box
              display="flex"
              direction="row"
              justifyContent="center"
              alignItems="center"
              >
              <CardMedia
                sx={{ width: 200, height: 200 }}
                component="img"
                alt="green iguana"
                // height="180"
                image={user?.image}
                loading='lazy'
              />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography variant="h7" component="div">
                  {user?.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Profile