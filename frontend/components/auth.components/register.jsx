import { useState } from "react";
import API from '../../src/axios.js'
import { Link } from "react-router-dom";
import styles from "../../styles/auth.module.css"

const Register = () => {
    const [regsts, setRegsts] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        try {
            await API.post('/api/user/register', { email, password })
            setRegsts(true)
        } catch (error) {
            console.log({ message: "registration failed: ", error })
        }
    }

    return (
        <>
            {regsts ? (<Link className={styles.login} to='/login'>Login</Link>) : (
                <>
                    <input className={styles.input} type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="enter email"/>
                    <input className={styles.input} type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="enter password"/>
                    <button className={styles.register} onClick={handleRegister}>Register</button>
                </>
            )}
        </>
    )
}

export default Register;