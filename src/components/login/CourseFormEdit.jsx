import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom'; // Correct import
import axios from 'axios';

const CourseFormEdit = () => {

    const history = useHistory(); // Correctly use useHistory

    const user= JSON.parse(localStorage.getItem('user'));
    if(user.role != 'instructor'){
      history.push('/')
    }
    
    const nav = useHistory();
    const { cid } = useParams(); // Get course ID from URL

    const [loading, setLoading] = useState(true);
    
    const [courseData, setCourseData] = useState({
        name: '',
        price: '',
        description: '',
        video: null,
    });

    // Fetch course details by ID when component mounts
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/course/${cid}`);
                const course = response.data;

                // Log the fetched course data for debugging
                console.log('Fetched course data:', course);

                // Set course data only if the structure is as expected
                if (course && course.name && course.price && course.description) {
                    setCourseData({
                        name: course.name,
                        price: course.price,
                        description: course.description,
                        video: null, // Video files can't be prefilled
                    });
                } else {
                    console.error('Fetched data is not in expected format:', course);
                }
            } catch (error) {
                console.error('Error fetching course data:', error);
            } finally {
                setLoading(false); // Set loading to false after the fetch completes
            }
        };

        fetchCourseData();
    }, [cid]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setCourseData({
            ...courseData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', courseData.name);
        formData.append('price', courseData.price);
        formData.append('description', courseData.description);
        if (courseData.video) {
            formData.append('video', courseData.video);
        }

        try {
            const response = await fetch(`http://localhost:8080/api/course/update/${cid}`, {
                method: 'PUT',
                body: formData, // Use the FormData object directly
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedData = await response.json();
            console.log("Course updated:", updatedData);
            nav.push('/instructordash'); // Navigate to the desired route
            window.location.reload(); // Reload the page if needed
        } catch (error) {
            console.error("Error updating course", error);
            alert("Failed to update course. Please try again."); // Notify the user
        }
    };

    // Loading indicator or return null while loading
    if (loading) {
        return <div>Loading...</div>; // Simple loading state
    }

    return (
        <div className='w-full h-screen bg-slate-100 flex flex-col justify-center items-center'>
            <div className='w-2/4'>
                <h1 className='text-center text-3xl'>Update Course</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        fullWidth
                        margin='normal'
                        label="Input course name"
                        variant='standard'
                        name="name"
                        value={courseData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        type="text"
                        fullWidth
                        margin='normal'
                        label="Input course price"
                        variant='standard'
                        name="price"
                        value={courseData.price}
                        onChange={handleChange}
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
                    />
                    <input
                        type="file"
                        name="video"
                        onChange={handleChange}
                    />
                    <Button variant='outlined' type="submit">Update</Button>
                </form>
            </div>
        </div>
    );
};

export default CourseFormEdit;
