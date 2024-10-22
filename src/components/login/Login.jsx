import React, { useState } from 'react';
import { login } from '../../backendServices/Auth';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
const Login = () => {
  const history = useHistory(); 

  

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
    setError(''); // Clear error on input change
  };

  const validateForm = () => {

    const { email, password } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return 'Email and password cannot be empty.';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return ''; // No errors
  };

  const submitForm = (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    console.log(data);

    login(data)
      .then((resp) => {
        console.log(resp);


        if (resp.role === 'admin') {
          localStorage.setItem('user',JSON.stringify({
            id:resp.id, role:'admin'
          }))
          history.push('/admin'); // Redirect to admin page
        } else if (resp.role === 'instructor') {
            localStorage.setItem('user',JSON.stringify({
            id:resp.id, role:'instructor'  }))
          history.push('/'); 
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-slate-300'>
      <div className='sm:w-2/4 w-full md:h-1/2 lg:w-1/3  shadow  p-5 rounded'>
        <h1 className='text-center underline py-5 text-2xl font-bold'>Log In</h1>
        
        {/* Error Message Display */}
        {error && <p className='text-red-500 text-center'>{error}</p>}

        <form onSubmit={submitForm}>
          <div className='flex flex-col gap-5'>
            <div className='flex justify-evenly'>
              <span className='text-center w-auto'>Email</span>
              <input
                type='text'
                name='email'
                onChange={(e) => handleChange(e, 'email')}
                value={data.email}
                className='border border-gray-300 rounded p-2'
              />
            </div>
            <div className='flex justify-evenly'>
              <span>Password</span>
              <input
                type='password'
                name='password'
                onChange={(e) => handleChange(e, 'password')}
                value={data.password}
                className='border border-gray-300 rounded p-2'
              />
            </div>
          </div>
          <div className='text-center font-serif font-bold mt-5'>
            <input type='submit' className='cursor-pointer text-blue-950 underline hover:bg-blue-100 p-2 rounded' value='Submit' />
            <Link to='/signup'>signUp </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
