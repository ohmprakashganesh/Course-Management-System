import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // useParams to get the instructor ID from URL

const Instructor = () => {
    const history = useHistory(); // Correctly use useHistory

    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        if (user.role != 'instructor') {
            history.push('/')
        }
    }
  

    const iid = user.id;
    const [usr, setUser] = useState({
        name: 'hello',
        email: 'guys',
    });


 
   

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    // Initialize loading as true

    useEffect(() => {
        const fetchInstructorData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/instructor/${iid}`); // Fetch instructor data
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const fetchedData = await response.json();
                setUser(fetchedData);
            } catch (error) {
                console.error("Error fetching instructor details:", error);
            } finally {
                setLoading(false); // Ensure loading is set to false at the end
            }
        };

        fetchInstructorData();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/course/instructor/${iid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const fetchedCourses = await response.json();
                setCourses(fetchedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, [iid]);
    const handleEdit = (courseId) => {
        history.push(`/updatecourse/${courseId}`);
    };

    // const handleLogout = () => {
    //     localStorage.removeItem('user');
    //     history.push('/')
    //     window.location.reload();
    // };


    const handleDelete = async (courseId) => {
        try {
            await fetch(`http://localhost:8080/api/course/delete/${courseId}`, {
                method: 'DELETE',
            });
            setCourses(courses.filter(course => course.cid !== courseId)); // Update the state after deletion
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Simple loading message
    }
    return (
        <div>
            <div className='flex flex-col text-center gap-10'>
                <h1 className='w-full    text-3xl font-extrabold'>
                    Welcome to Instructor Dashboard
                </h1>
                <div className='flex flex-col items-center justify-center'>
                    <img
                        className="w-36 h-36 rounded-full object-cover"
                        src="https://media.istockphoto.com/id/1977348709/photo/laughing-young-businesswoman-talking-with-colleagues-in-an-office-hallway.jpg?s=1024x1024&w=is&k=20&c=jCROHhInM_uoa55qB6VkOaVnjeqI5zlGXDJ5hNMD46A="
                        alt="Instructor"
                    />
                    <p className='text-xl font-bold'>Hello Mr: {usr.name || 'Guest'}</p> {/* Use a fallback if user.name is empty */}
                </div>
                  <div>
                </div>
                <div className='text-center flex justify-center flex-col'>
                    <h1 className='text-3xl font-bold mt-10'>Table Containing List of Courses</h1>
                </div>
                <div className='w-full flex justify-center mb-20'>
                    <table className="w-10/12 mt-4 table-fixed">
                        <thead className='bg-slate-400 w-full mt-5 h-12'>
                            <tr>
                                <th>Course Name</th>
                                <th>Price</th>
                                <th>File</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className='h-12 text-center'>No courses found.</td>
                                </tr>
                            ) : (
                                courses.map(course => (
                                    <tr key={course.cid} > {/* Ensure to use a unique identifier */}
                                        <td className='h-12 text-center'>{course.name}</td>
                                        <td className='h-12 text-center'>{course.price}</td>
                                        <td className='h-12 text-center'>{course.video}</td>
                                        <td className='h-12 flex'>
                                            <div className='flex  mt-2'>
                                            <Button  variant='outlined' sx={{ marginRight:2}}   onClick={() => handleEdit(course.cid)}>Edit</Button>
                                            <Button variant='outlined'  onClick={() => handleDelete(course.cid)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};

export default Instructor;
