import { Link, useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>

      <h1>Welcome to Event Management System</h1>

      {user && (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <hr />

      <nav>

        <Link to="/events">
          Events
        </Link>

        {" | "}

        <Link to="/my-registrations">
          My Registrations
        </Link>

        {" | "}

        {user?.role === "ADMIN" && (
          <Link to="/admin/dashboard">
            Admin Dashboard
          </Link>
        )}

        {" | "}

        <button onClick={logout}>
          Logout
        </button>

      </nav>

    </div>
  );
}

export default Home;