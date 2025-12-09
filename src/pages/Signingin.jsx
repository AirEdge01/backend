import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signingin = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const res = await axios.post('http://localhost:3600/user/signingin', userData)
            // const res = await axios.post('https://nodeass3.onrender.com/user/signingin', userData)
            console.log('Response:', res.data);

            if (res.data.token) {
                localStorage.setItem('token', token)
                alert('Signin successful ! Welcome back')
                navigate('/Dashboard')
            }
            setEmail('');
            setPassword('');
        } catch (err) {
            console.log('Error', err.response ? err.response.data : err);
            alert(err.response?.data?.message || "Signin Failed,try again")

        }
    }
    return (
        <>
            <div>
                <div >
                    <h2 >Welcome Back</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button style={{ marginTop: '30px' }} type="submit" >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signingin;
