import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Instructor = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [editid, setEditId] = useState(null);
    //single instructor



    useEffect(() => {
        fetch('http://localhost:8080/api/instructor/2')
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error("Error fetching user", error));
    }, []);

    //fetching all users 
    useEffect(() => {
        fetch('http://localhost:8080/api/instructor')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching user", error));
    }, []);

    //handle delete 
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



//handle update 
 const navigate=useHistory();
const handleUpdate = (id) => {
  navigate.push(`/update/${id}`);
  window.location.reload();

}

//     fetch(`http://localhost:8080/api/instructor/update/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedInstructor),
//     })
//         .then(response => response.json())
//         .then(data => {
//             // Update the list with the edited instructor
//             setUsers(users.map(user => (user.id === id ? data : user)));
//             setEditingUser(null);
//         })
//         .catch(error => console.error("Error updating instructor", error));
// };
return (
    <>
        <div>
            <h1>Instructor Details:</h1>
            {user ? (
                <ul>
                    <li>ID: {user.iid}</li>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Role: {user.role ? user.role : 'No role assigned'}</li>
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>


        {/* this is for all the Instructors  */}
        <div>
            <h1>Instructors</h1>
            {users.length > 0 ? (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((instructor) => (
                            <tr key={instructor.iid}>

                                <td>

                                    {instructor.name}
                                    {instructor.iid}


                                </td>
                                <td>

                                    {instructor.email}

                                </td>
                                <td>
                            <Button onClick={() => handleUpdate(instructor.iid)}>Update</Button>
                            <Button onClick={() => handleDelete(instructor.iid)}>Delete</Button>
                        </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <> no instructor found </>
            )}
        </div>




    </>
);
};
export default Instructor;
