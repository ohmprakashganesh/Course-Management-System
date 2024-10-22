import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const CreateCourse = () => {
    const history = useHistory(); // Correctly use useHistory

    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role !== 'instructor') {
        history.push('/');
    }

    const [courseData, setCourseData] = useState({
        name: '',
        price: '',
        description: '',
        video: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'file') {
            setCourseData({
                ...courseData,
                video: e.target.files[0], // Store the uploaded file
            });
        } else {
            setCourseData({
                ...courseData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', courseData.name);
        formData.append('price', courseData.price);
        formData.append('description', courseData.description);
        if (courseData.video) {
            formData.append('file', courseData.video); // Attach the file
        }

        try {
            const response = await fetch('http://localhost:8080/api/course/create', {
                method: 'POST',
                body: formData, // Use FormData object to send course details including the optional video
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const createdCourse = await response.json();
            console.log("Course created:", createdCourse);
            alert('Course created successfully!');
            // Reset form after successful creation
            setCourseData({
                name: '',
                price: '',
                description: '',
                video: null,
            });
            // Optionally redirect or reload
            window.location.reload(); // Reload the page if needed
        } catch (error) {
            console.error("Error creating course", error);
            alert("Failed to create course. Please try again.");
        }
    };

    return (
        <div className='w-full h-screen bg-slate-100 flex flex-col justify-center items-center'>
            <div className='w-2/4'>
                <h1 className='text-center text-3xl'>Create Course</h1>

                <form onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        fullWidth
                        margin='normal'
                        label="Input Course Name"
                        variant='standard'
                        name="name"
                        value={courseData.name}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        type="text"
                        fullWidth
                        margin='normal'
                        label="Input Course Price"
                        variant='standard'
                        name="price"
                        value={courseData.price}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        name="description"
                        label="Course Description"
                        value={courseData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        helperText="Enter the course description"
                        required
                    />

                    <label htmlFor="file">Upload Course Video/PDF (optional)</label>
                    <input
                        type="file"
                        name="file"
                        accept="video/*,application/pdf" // Corrected accept attribute
                        onChange={handleChange}
                    />

                    <Button variant='outlined' type="submit" style={{ marginTop: '20px' }}>
                        Create Course
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
