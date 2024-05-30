import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const users = await fetchUsers();
            setUsers(users);
        };
        getUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.firstName} {user.lastName}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;