import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/api/users/login", {
        email: email,
        password: password
      });

      console.log("Login successful:", response.data);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      setMessage("Login successful!");

      setTimeout(() => {
       navigate("/home");
      }, 1000);

    } catch (error) {

      console.log("Login error:", error);

      setMessage("Login failed");

    }
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>

      </form>

      {message && <p>{message}</p>}

      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>

    </div>
  );
}

export default Login;