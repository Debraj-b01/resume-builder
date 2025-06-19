import React, { useState } from 'react';
import { app } from '../../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../api';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoogle = async () => {
        try {
            dispatch(signInStart());
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const formData = {
                username: result?.user?.displayName,
                email: result?.user?.email,
                avatar: result?.user?.photoURL
            };

            const response = await axios.post(`${BASE_URL}/auth/google-sign-in`, formData);
            dispatch(signInSuccess(response?.data?.user));

            toast.success(response?.data?.message, {
                position: "top-left",
                autoClose: 1500,
            });

            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            dispatch(signInFailure(error.message));
            toast.error("Login failed. Please try again.", {
                position: "top-left",
                autoClose: 1500,
            });
        }
    };

    const Bubble = ({ size, color, delay }) => {
        const generateRandomPosition = () => ({
            x: Math.random() * (window.innerWidth - size),
            y: Math.random() * (window.innerHeight - size)
        });

        return (
            <motion.div
                initial={generateRandomPosition()}
                animate={generateRandomPosition()}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay
                }}
                style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: '50%',
                    opacity: 0.2,
                    zIndex: 0,
                }}
            />
        );
    };

    const bubbles = Array.from({ length: 20 }).map((_, i) => (
        <Bubble
            key={i}
            size={Math.random() * 80 + 40}
            color={`hsla(${Math.random() * 360}, 70%, 75%, 0.5)`}
            delay={Math.random() * 10}
        />
    ));

    return (
        <div style={styles.wrapper}>
            {bubbles}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={styles.card}
            >
                <h2 style={styles.heading}>Welcome Back</h2>
                <p style={styles.subtext}>Sign in to get started</p>
                <button style={styles.button} onClick={handleGoogle}>
                    {loading ? (
                        <CircularProgress size={28} />
                    ) : (
                        <>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google"
                                style={styles.icon}
                            />
                            <span style={styles.text}>Sign in with Google</span>
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
}

const styles = {
    wrapper: {
        position: 'relative',
        height: '100vh',
        background: 'linear-gradient(to top right, #f6d365, #fda085)',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.75)',
        padding: '40px 30px',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        zIndex: 1,
        width: '350px',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '10px',
        fontSize: '24px',
        color: '#333',
    },
    subtext: {
        marginBottom: '25px',
        color: '#666',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#fff',
        color: '#333',
        fontWeight: 600,
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    icon: {
        width: '22px',
        height: '22px',
    },
    text: {
        margin: 0,
    }
};
