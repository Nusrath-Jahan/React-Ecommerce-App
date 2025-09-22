import React, { useState } from 'react';
import { TextField , Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword }  from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <Typography variant='h4'>Login</Typography>
      <TextField
      label="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      margin='normal'
      />
      <TextField
      label="Password"
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      margin='normal'
      />
      <Button variant='contained' color='primary' onClick={handleLogin}>Login</Button>

    </div>
  )

}
export default Login;