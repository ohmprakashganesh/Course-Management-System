import { Button, Divider } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const InstructorDetails = () => {
  const history = useHistory(); // Use useHistory hook
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/instructor')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error("Error fetching user", error));
}, []);


  const handleDelete = (iid) => {
    fetch(`http://localhost:8080/api/instructor/delete/${iid}`, {
        method: 'DELETE'
    })
    .then(() => {
        // After deletion, update the list by filtering out the deleted instructor based on iid
        setUsers(users.filter(user => user.iid !== iid));
    })
    .catch(error => console.error("Error deleting instructor", error));
};



  return (
    <><div className='text-center flex justify-center flex-col overflow-scroll'>
      <h1 className='text-3xl font-bold mt-10'>Table Containing List Of Instructor</h1>
    </div>
    <div className='w-full flex justify-center'>
 
            {users.length > 0 ? (
                <table table className="w-5/6 mt-4 table-fixed overflow-scroll">
                    <thead className='bg-slate-400 mt-5 h-12'>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((instructor) => (

                            <tr key={instructor.iid} className='' >

                                <td className='text-center'>

                                    {instructor.name}
                                    {instructor.iid}


                                </td>

                                
                                <td className='text-center'>

                                    {instructor.email}

                                </td>
                                <td className='text-center'>
                            <Button variant='text' className='mt-3' onClick={() => handleDelete(instructor.iid)}>Delete</Button>
                        </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <> no instructor found </>
            )}
       
      {/* <table className="w-5/6 mt-4 table-fixed">
        <thead className='bg-slate-400 mt-5 h-12'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Courses</th>
            <th>Action</th>
          </tr>
        </thead>
        {users.length > 0 ?(
        <tbody>


        
          {users.map((user) => (
            <tr key={user.iid}>
              <td className='h-12'>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select>
                  {user.courses.map((course, index) => (
                    <option key={index}>{course}</option> // Ensure unique keys for each option
                  ))}
                </select>
              </td>
              <td>
                <Button variant='outlined' onClick={() => handleEdit(user.iid)}>
                  Edit
                </Button>
                <Button variant='outlined' onClick={() => handleDelete(user.iid)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
      
        
        </tbody>
          ):(
            alert ("no data found")
         )
       }
    
      </table> */}
    </div>
    </>
  );
};

export default InstructorDetails;
