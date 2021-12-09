import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const confirmPassword = useFormInput('');
    const name = useFormInput('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // handle button click of signup form
    const handleSignup = () => {
        if (password.value !== confirmPassword.value) {
            alert('Passwords don\'t match');

            return;
        }
        setError(null);
        setLoading(true);
        axios.post('http://localhost:4000/users/signup', {
            username: username.value,
            password: password.value,
            name: name.value
        }
        ).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            navigate('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response) {
                if (error.response.status === 401) {
                    setError(error.response.data.message);
                } else {
                    setError("Something went wrong. Please try again later.");
                }
            } else if (error.request) {
                setError(error.request);
            } else {
                setError(error.message);
            }
        });
    }

    return (
        <div>
            <h2>Signup</h2>
            <div>
                Username<br />
                <input type="text" {...username} autoComplete="new-username" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Confirm Password<br />
                <input type="password" {...confirmPassword} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Name<br />
                <input type="text" {...name} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Signup'} onClick={handleSignup} disabled={loading} /><br />
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Signup;