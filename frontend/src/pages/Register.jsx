import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const response = await api.post("/api/users", {
        name: name,
        email: email,
        password: password,
        role: role
      });

      console.log("Registration successful:", response.data);

      setMessage("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {

      console.log("Registration error:", error);

      if (error.response) {
        setError("Registration failed");
      } else {
        setError("Unable to connect to server");
      }
    }
  };

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        <div>
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <br />

        <button type="submit">
          Register
        </button>

      </form>

      {message && (
        <p>{message}</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      <p>
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>

    </div>
  );
}

export default Register;