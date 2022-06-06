import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useUserContext } from '../stores/UserContext';

const SignUpView = () => {
  const userContext = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const validateSignUp = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (!confirmPassword) {
      setError('Confirm password is required');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };
  const handleSignUp = async () => {
    try {
      setError('');
      const valid = validateSignUp();
      if (!valid) {
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        userContext.setUser(response.data);
        navigate('/');
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
      <AuthForm
        signup={true}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmit={handleSignUp}
        error={error}
      ></AuthForm>
    </div>
  );
};

export default SignUpView;
