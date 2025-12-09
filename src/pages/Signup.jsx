import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password) {
            alert("Please fill in all fields");
            return;
        }

        const newUser = { firstName, lastName, email, password };

        axios.post('http://localhost:3600/user/signup', newUser)
            .then((res) => {
                console.log('Response:', res);
                alert('Signing up successful! please login')
                navigate('/Signingin');
            })
            .catch((err) => {
                console.error('Error', err.response ? err.response.data : err);
                alert('Signup failed,try again')

            })

    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create an Account</h2>
                <p style={styles.subtitle}>Join our community today</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        // value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        // value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b7a35, #4ec57a)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
    },
    card: {
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "420px",
        padding: "40px 30px",
        textAlign: "center",
        animation: "fadeIn 0.8s ease-in-out",
    },
    title: {
        color: "#0b7a35",
        fontSize: "26px",
        fontWeight: "600",
        marginBottom: "10px",
    },
    subtitle: {
        color: "#777",
        fontSize: "14px",
        marginBottom: "30px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "12px 15px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        fontSize: "15px",
        outline: "none",
        transition: "0.3s",
    },
    button: {
        background: "#0b7a35",
        color: "#fff",
        padding: "12px",
        border: "none",
        borderRadius: "10px",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        transition: "0.3s ease",
    },
    userList: {
        background: "#fff",
        marginTop: "30px",
        width: "100%",
        maxWidth: "420px",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.05)",
    },
    userListTitle: {
        color: "#0b7a35",
        fontSize: "18px",
        marginBottom: "15px",
    },
    userCard: {
        borderBottom: "1px solid #eee",
        padding: "10px 0",
    },
};
