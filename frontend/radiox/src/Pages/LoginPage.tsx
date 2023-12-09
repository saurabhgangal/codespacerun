import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  // You can define props if needed
}

const LoginPage: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Replace these values with your actual login credentials
    const validUsernames = ['abc@gmail.com', 'test@gmail.com'];
    const validPassword = 'password'; // Replace with your actual password

    // Check if the entered credentials are valid
    if (validUsernames.includes(username) && password === validPassword) {
      // Store user information in local storage
      localStorage.setItem('username', username);

      // Navigate to /dashboard
      navigate('/doctor');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <form>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ marginTop: '20px' }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
