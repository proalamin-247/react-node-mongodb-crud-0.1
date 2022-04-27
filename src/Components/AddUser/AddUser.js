import React from 'react';

const AddUser = () => {
    const handleAddUser = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const user = { name, email };
        console.log(user)

        // send data to server
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                console.log('Success:', data);
                alert('user added successfully');
                event.target.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <div>
            <h1>Please Add a user</h1>
            <form onSubmit={handleAddUser}>
                <input type="text" name='name' placeholder='Name' required />
                <br />
                <input type="email" name='email' placeholder='Email' required />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddUser;