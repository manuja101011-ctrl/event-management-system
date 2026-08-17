import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function EventDetails() {

  const { id } = useParams();

  const [event, setEvent] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getEvent();
  }, [id]);

  const getEvent = async () => {

    try {

      const response = await api.get(`/api/events/${id}`);

      setEvent(response.data);

    } catch (error) {

      console.log("Error:", error);

      setError("Unable to load event");
    }
  };

  const registerForEvent = async () => {

    setMessage("");
    setError("");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setError("Please login first");
      return;
    }

    try {

      await api.post(
        `/api/registrations/user/${user.id}/event/${id}`
      );

      setMessage("Registration successful!");

    } catch (error) {

      console.log("Registration error:", error);

      if (error.response) {

        setError(
          error.response.data?.message ||
          "Registration failed"
        );

      } else {

        setError("Unable to connect to server");

      }
    }
  };

  if (error && !event) {

    return (
      <div>

        <h1>{error}</h1>

        <Link to="/events">
          Back to Events
        </Link>

      </div>
    );
  }

  if (!event) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>

      <h1>{event.eventName}</h1>

      <p>
        <strong>Description:</strong>{" "}
        {event.description}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {event.category}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {event.eventDate}
      </p>

      <p>
        <strong>Time:</strong>{" "}
        {event.eventTime}
      </p>

      <p>
        <strong>Venue:</strong>{" "}
        {event.venue}
      </p>

      <p>
        <strong>Capacity:</strong>{" "}
        {event.capacity}
      </p>

      <p>
        <strong>Ticket Price:</strong>{" "}
        ₹{event.ticketPrice}
      </p>

      <br />

      <button onClick={registerForEvent}>
        Register for Event
      </button>

      {message && (
        <p>{message}</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      <br />

      <Link to="/events">
        Back to Events
      </Link>

    </div>
  );
}

export default EventDetails;