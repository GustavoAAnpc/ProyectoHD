import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (res.ok) {
        const text = await res.text();
        setMessage(text);
      } else {
        const error = await res.text();
        setMessage(error);
      }
    } catch (err) {
      setMessage("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
        <p>{message}</p>
      </div>
      <div className="login-image-container">
        <img src="/logoacademy.jpg" alt="Ilustración de Login Forca & Fitness" />
      </div>
    </div>
  );
}

export default Login;
