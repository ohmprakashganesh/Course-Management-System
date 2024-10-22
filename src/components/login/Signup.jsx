import React, { useState } from 'react';
import { signUp } from '../../backendServices/TeacherServices';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Signup = () => {
  const nav= useHistory();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
    setError(''); // Clear error on input change
  };

  const validateForm = () => {
    const { name, email, password } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password) {
      return 'All fields are required.';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
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

    signUp(data)
      .then((resp) => {
        console.log(resp);
        alert("successful to register ")
        nav.push('/')
        window.location.reload();
        // Redirect or clear the form after successful signup
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);  // Set the error message if email already exists
      });
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-slate-300'>
      <div className='sm:w-2/4 w-full md:h-1/2 lg:w-1/3 shadow p-5 rounded'>
        <h1 className='text-center underline py-5 text-2xl font-bold'>Sign Up</h1>
        
        {/* Error Message Display */}
        {error && <p className='text-red-500 text-center'>{error}</p>}

        <form onSubmit={submitForm}>
          <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
              <span>Name:</span>
              <input
                type='text'
                name='name'
                id='name'
                onChange={(e) => handleChange(e, 'name')}
                value={data.name}
                className='border border-gray-300 rounded p-2'
              />
            </div>
            <div className='flex justify-between'>
              <span>Email:</span>
              <input
                type='text'
                name='email'
                onChange={(e) => handleChange(e, 'email')}
                value={data.email}
                className='border border-gray-300 rounded p-2'
              />
            </div>
            <div className='flex justify-between'>
              <span>Password:</span>
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
            <Link to='/login'>have an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
