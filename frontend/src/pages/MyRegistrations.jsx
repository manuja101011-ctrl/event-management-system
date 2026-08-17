import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyRegistrations() {

  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRegistrations();
  }, []);

  const getRegistrations = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setError("Please login first");
      return;
    }

    try {

      const response = await api.get(
        `/api/registrations/user/${user.id}`
      );

      setRegistrations(response.data);

    } catch (error) {

      console.log("Error:", error);

      setError("Unable to load registrations");
    }
  };

  return (
    <div>

      <h1>My Registrations</h1>

      {error && <p>{error}</p>}

      {registrations.length === 0 && !error && (
        <p>You have not registered for any events.</p>
      )}

      {registrations.map((registration) => (

        <div key={registration.id}>

          <h2>
            {registration.event.eventName}
          </h2>

          <p>
            Category: {registration.event.category}
          </p>

          <p>
            Date: {registration.event.eventDate}
          </p>

          <p>
            Time: {registration.event.eventTime}
          </p>

          <p>
            Venue: {registration.event.venue}
          </p>

          <p>
            Ticket Price: ₹{registration.event.ticketPrice}
          </p>

          <p>
            Registration Date:{" "}
            {registration.registrationDate}
          </p>

          <p>
            Status: {registration.status}
          </p>

          <hr />

        </div>

      ))}

      <br />

      <Link to="/home">
        Back to Home
      </Link>

    </div>
  );
}

export default MyRegistrations;