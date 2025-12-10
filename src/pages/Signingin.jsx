import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const Signingin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [entered, setEntered] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setEntered(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const res = await axios.post('https://react-4dfo.onrender.com/user/signingin', userData);

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                alert('Signin successful — welcome back!');
                navigate('/Dashboard');
            }

            setEmail('');
            setPassword('');
        } catch (err) {
            alert(err.response?.data?.message || 'Signin failed, try again');
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.bgAccent} aria-hidden="true" />
            <div style={{ ...styles.card, ...(entered ? styles.cardEnter : styles.cardInitial) }}>
                <div style={styles.brand}>
                    <div style={styles.logo}>AE</div>
                    <div>
                        <h1 style={styles.title}>Welcome Back</h1>
                        <p style={styles.subtitle}>Sign in to continue to your dashboard</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label} htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label} htmlFor="password">Password</label>
                    <div style={styles.passwordWrapper}>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ ...styles.input, paddingRight: 48 }}
                            required
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            onClick={() => setShowPassword((s) => !s)}
                            style={styles.eyeButton}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div style={styles.rowBetween}>
                        <Link to="/forgot" style={styles.link}>Forgot password?</Link>
                    </div>

                    <button type="submit" style={styles.primaryButton}>Sign in</button>

                    <div style={styles.divider} />

                    <div style={styles.footerText}>
                        <span>Don’t have an account? </span>
                        <Link to="/Signup" style={{ ...styles.link, fontWeight: 600 }}>Create one</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signingin;

const styles = {
    page: {
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'linear-gradient(135deg,#0f172a 0%, #0b7a35 60%)',
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    },
    card: {
        width: '100%',
        maxWidth: 460,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
        borderRadius: 16,
        padding: 28,
        boxShadow: '0 8px 30px rgba(2,6,23,0.35)',
        backdropFilter: 'blur(6px)',
        zIndex: 2,
    },
    cardInitial: {
        transform: 'translateY(40px) scale(0.995)',
        opacity: 0,
        transition: 'transform 520ms cubic-bezier(.2,.9,.2,1), opacity 520ms ease'
    },
    cardEnter: {
        transform: 'translateY(0) scale(1)',
        opacity: 1
    },
    brand: {
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        marginBottom: 18,
    },
    logo: {
        width: 52,
        height: 52,
        borderRadius: 12,
        background: 'linear-gradient(135deg,#0b7a35,#4ec57a)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 18,
    },
    title: {
        margin: 0,
        fontSize: 22,
        color: '#0b3f25',
        lineHeight: 1.1,
    },
    subtitle: {
        margin: 0,
        marginTop: 4,
        color: '#5b6b66',
        fontSize: 13,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginTop: 6,
    },
    label: {
        fontSize: 13,
        color: '#32433a',
        marginBottom: 6,
    },
    input: {
        padding: '12px 14px',
        borderRadius: 10,
        border: '1px solid rgba(15,23,42,0.08)',
        fontSize: 15,
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        background: '#fff',
    },
    passwordWrapper: {
        position: 'relative',
        width: '100%',
    },
    eyeButton: {
        position: 'absolute',
        right: 8,
        top: '50%',
        transform: 'translateY(-50%)',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 8,
        color: '#4b5563',
        fontSize: 16,
    },
    primaryButton: {
        marginTop: 8,
        background: 'linear-gradient(90deg,#0b7a35,#2ecc71)',
        color: '#fff',
        border: 'none',
        padding: '12px 14px',
        borderRadius: 10,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 6px 18px rgba(11,122,53,0.18)'
    },
    divider: {
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(15,23,42,0.06), transparent)',
        margin: '18px 0'
    },
    footerText: {
        textAlign: 'center',
        color: '#475851',
        fontSize: 14,
    },
    link: {
        color: '#0b7a35',
        textDecoration: 'none',
    },
    rowBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    ,
    bgAccent: {
        position: 'absolute',
        width: 420,
        height: 420,
        borderRadius: 9999,
        right: '8%',
        bottom: '8%',
        background: 'radial-gradient(circle at 30% 30%, rgba(78,197,122,0.35), rgba(11,122,53,0.12) 40%, transparent 60%)',
        filter: 'blur(40px) saturate(120%)',
        zIndex: 1,
        transform: 'translateY(20px)'
    }
};

//   <input
//                                 type={showPassword ? 'text' : "password"}
//                                 name='password'
//                                 placeholder="Password"
//                                 className="auth-input"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             <span className='input-icon' >
//                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                             </span>