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

const Register = () => {
  const classes = useStyles();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        username,
        password,
      });

      // Handle successful registration, e.g., show a success message

      toast.success('successfully logged in | Redirecting to login page...');

      setTimeout(() => {
       
        window.location.href = '/'
      }, 3000);
    ;
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration error, display error message, etc.
    }
  };

  return (
    <>
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
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
            <Link underline="none" href="/" variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
          <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
    <ToastContainer />
    </>
  );
};

export default Register;
