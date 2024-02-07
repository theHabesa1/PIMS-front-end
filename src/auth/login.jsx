import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "80px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "20px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  // console.log(process.env.REACT_APP_API_BASE_URL);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });

      const { token } = response.data;

      // Save the token to local storage or session storage
      localStorage.setItem('token', token);
      toast.success('successfully logged in');

      setTimeout(() => {
       
        window.location.href = '/dashboard';
      }, 3000);
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed, please try again');

    }
  };

  return (
    <>
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item>
                <Link underline="none"  href="/register" variant="body2">
                  Dont Have an account Register
                </Link>
              </Grid>
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
    <ToastContainer />
    </>
  );
};

export default Login;
