import { useState } from "react";
import API from '../../src/axios.js'
import { Link } from 'react-router-dom'
import styles from '../../styles/auth.module.css'

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            setError(null)
            await API.post('api/user/login', { email, password })
            const { data } = await API.get('/api/user/me')
            setUser(data.user);
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError("login failed")
        }
    }

    return (
        <>
            <input className={styles.input} placeholder='enter email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className={styles.input} placeholder='enter password' type="password" onChange={e => setPassword(e.target.value)} value={password} />
            <button className={styles.login} onClick={handleLogin}>Login</button>

            {error && (
                <div>
                    <Link to="/register" className={styles.register}>Register</Link>
                </div>
            )}

        </>
    )
}

export default Login;