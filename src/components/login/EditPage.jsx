import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';  // useParams to get the instructor ID from URL
const EditPage = () => {
  const history = useHistory(); // Correctly use useHistory

  const user= JSON.parse(localStorage.getItem('user'));
  if(user.role != null){
    history.push('/')
  }
  
  const { id } = useParams();  // Get the ID from URL
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Add loading state

  // Fetch instructor data on component mount
  useEffect(() => {
    fetch(`http://localhost:8080/api/instructor/${id}`)
      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData);  // Ensure the data matches your expected structure
        setLoading(false);  // Set loading to false once the data is fetched
      })
      .catch(error => {
        console.error("Error fetching instructor details", error);
        setLoading(false);  // Stop loading in case of an error
      });
  }, [id]);

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

    

    fetch(`http://localhost:8080/api/instructor/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(updatedData => {
        console.log("Instructor updated:", updatedData);
        history.push('/getuser');
        window.location.reload(); // Redirect back to the instructors list
      })
      .catch(error => {
        console.error("Error updating instructor", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;  // Display loading message while data is being fetched
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-slate-300'>
      <div className='sm:w-2/4 w-full md:h-1/2 lg:w-1/3  shadow  p-5 rounded'>
      <h1 className='text-center underline py-5 text-2xl font-bold'>Update Account</h1>

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
            <input type='submit' className='cursor-pointer text-blue-950 underline hover:bg-blue-100 p-2 rounded' value='Update' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
