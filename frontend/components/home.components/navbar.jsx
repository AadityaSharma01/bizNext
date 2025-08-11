import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../src/axios';
import styles from '../../styles/navbar.module.css';

export const Navbar = () => {
    const [name, setName] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await API.get(`/api/user/me`);
                const username = data.user?.email?.split('@')[0] || 'Guest';
                setName(username);
            } catch (err) {
                console.error("Failed to fetch user info:", err);
                setName('Guest');
            }
        };

        getUser();
    }, []);

    return (
        <div className={styles.navbar}>
                <img src="/BN logo.png" alt="BN logo" className={styles.logo} />
                {name && <p className={styles.welcome}>Welcome, {name}!</p>}
            <div>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/postProd" className={styles.link}>Products-List</Link>
                <Link to="/chart" className={styles.link}>Chart</Link>
            </div>
        </div>
    );
};
