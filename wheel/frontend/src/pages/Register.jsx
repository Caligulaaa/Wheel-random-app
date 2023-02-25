import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PostService from '../API/PostService'
import { AuthContext } from '../utils/context'
import jwt_decode from "jwt-decode";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';   


const Login = () => {
  const {setIsAuth} = useContext(AuthContext);
  const {setUsername} = useContext(AuthContext);  

  const navigate = useNavigate()


  const register = async (e) => {
    e.preventDefault()
    const userRegister = await PostService.postRegister(e.target.username.value,
                                                    e.target.password.value,
                                                    e.target.password2.value,
                                                    e.target.email.value)


    if(userRegister.status === 201){
        const userToken = await PostService.postLogin(e.target.username.value,e.target.password.value)

        var decode = jwt_decode(userToken.data.access);
        setUsername(decode.username);
        setIsAuth(true);    
        localStorage.setItem('authToken',JSON.stringify(userToken.data.access));    
        navigate('/');

      }   

  }
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>

          <Typography component="h1" variant="h5">Sign up</Typography>
          <Box component="form" onSubmit={register} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="text"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Password repeat"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="E-mail"
              type="email"
              id="email"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me" disabled checked
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
  )
}

export default Login