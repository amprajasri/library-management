import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Register}  from './Register' 
import axios from 'axios';
import { useSnackbar } from 'notistack'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()
 
  const handleRegisterRedirect=()=>{
    
    navigate('/Register');
  }

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setError('');
  //   console.log("hello");
  
  //   axios.post('https://library-management-backend-blond.vercel.app/Login', { username, password })
  //     .then(result => {
  //       console.log('Server response:', result.data); // Debug log
        
  //       if (result?.data?.message === 'Success') { // Note the capital 'S'
  //         sessionStorage.setItem("userId", result.data?.data?._id);
  //         sessionStorage.setItem("username", username);
  //         enqueueSnackbar('login successful', {variant: 'success'});
  //         navigate('/Home');
  //       } else {
  //         // Show the exact error message from server
  //         setError(result.data.message);
  //       }
  //     })
  //     .catch(err => {
  //       // Log the full error response
  //       console.log('Error response:', err.response?.data);
        
  //       // Use the server's error message if available
  //       if (err.response?.data?.message) {
  //         setError(err.response.data.message);
  //       } else if (err.response?.status === 400) {
  //         if (err.response.data === 'User not found') {
  //           setError('Username does not exist');
  //         } else if (err.response.data === 'The password is incorrect') {
  //           setError('Password is incorrect');
  //         } else {
  //           setError(err.response.data);
  //         }
  //       } else {
  //         setError('An error occurred during login. Please try again.');
  //       }
  //     });
  // };
 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios({
        method: 'post',
        url: 'https://library-management-backend-blond.vercel.app/Login',
        data: { username, password },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      if (response?.data?.message === 'Success') {
        sessionStorage.setItem("userId", response.data?.data?._id);
        sessionStorage.setItem("username", username);
        enqueueSnackbar('Login successful', { variant: 'success' });
        navigate('/Home');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label 
              htmlFor='username' 
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your username'
              required
            />
          </div>
          
          <div className='mb-6'>
            <label 
              htmlFor='password' 
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your password'
              required
            />
          </div>
          
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Sign In
            </button>
            
            <button
              type='button'
              onClick={handleRegisterRedirect}
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default Login