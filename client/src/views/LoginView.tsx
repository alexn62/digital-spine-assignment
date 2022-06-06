import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useUserContext } from '../stores/UserContext';

const LoginView = () => {
  const userContext = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const validateLogin = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    try {
      setError('');
      const valid = validateLogin();
      if (!valid) {
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        userContext.setUser(response.data);
        navigate('/');
      }
      if (response.status === 401) {
        setError('Invalid email or password');
      }
    } catch (e) {
      console.log(e);
      // @ts-ignore
      if (e.response.data.error) {
        // @ts-ignore
        setError(e.response.data.error);
      }
    }
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <AuthForm setEmail={setEmail} setPassword={setPassword} onSubmit={handleLogin} error={error}></AuthForm>
    </div>
  );
};

export default LoginView;
