import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/user')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])

    const hanadleDeleteUser = id => {
        const proceed = window.confirm('Are you sure you wnat to delete?');
        if (proceed) {
            console.log('user dlt id:', id);
            const url = `http://localhost:5000/user/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deleteCount > 0) {
                        console.log('ssss');
                        const remaining = users.filter(user => user._id !== id); // ক্সজ করে না...এটা Ui থেকে ডিলেট হয় না 
                        setUsers(remaining);
                    }
                });
        }
    }
    return (
        <div>
            <h2>Total users: {users.length}</h2>
            <ul>
                {
                    users.map(user => <li
                        key={user._id}
                    >name:{user.name}
                        <br />
                        mail:{user.email}
                        <Link to={`/update/${user._id}`}><button>Edit</button></Link>
                        <button onClick={() => hanadleDeleteUser(user._id)}>Delate User</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Home;