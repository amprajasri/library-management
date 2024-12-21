import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  {Login}  from './Signin';
import axios from 'axios';
import { useSnackbar } from 'notistack'

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()
const handleRegister=(e)=>{
  e.preventDefault();
  
  // Ensure matching passwords
  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  // Use the correct backend port
  axios.post('http://localhost:8888/Register', {
    username,
    password
  })
  .then(result => {
    console.log(result);
    enqueueSnackbar('account created successfully ', {variant:'success'})
    navigate('/'); // Redirect to login
  })
  .catch(err => {
    console.error('Registration error:', err.response);
    
    // Check for specific username exists error
    if (err.response && err.response.data.message === 'Username already exists') {
      setError('Username is already taken. Please choose a different username.');
    } else {
      setError('Registration failed. Please try again.');
    }
  });
}

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister}>
          <div className='mb-4'>
            <label 
              htmlFor='new-username' 
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Username
            </label>
            <input
              type='text'
              id='new-username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Choose a username'
              required
            />
          </div>
          
          <div className='mb-4'>
            <label 
              htmlFor='new-password' 
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Create a password'
              required
            />
          </div>
          
          <div className='mb-6'>
            <label 
              htmlFor='confirm-password' 
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirm-password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Confirm your password'
              required
            />
          </div>
          
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Register
            </button>
            
            <button
              type='button'
              onClick={() => navigate('/')}
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register