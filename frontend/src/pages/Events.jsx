import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Events() {

  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {

    try {

      const response = await api.get("/api/events");

      setEvents(response.data);

    } catch (error) {

      console.log("Error:", error);

      setError("Unable to load events");
    }
  };

  return (
    <div>

      <h1>Events</h1>

      {error && <p>{error}</p>}

      {events.length === 0 && !error && (
        <p>No events available.</p>
      )}

      {events.map((event) => (

        <div key={event.id}>

          <h2>{event.eventName}</h2>

          <p>
            {event.description}
          </p>

          <p>
            Category: {event.category}
          </p>

          <p>
            Date: {event.eventDate}
          </p>

          <p>
            Time: {event.eventTime}
          </p>

          <p>
            Venue: {event.venue}
          </p>

          <p>
            Capacity: {event.capacity}
          </p>

          <p>
            Ticket Price: ₹{event.ticketPrice}
          </p>

          <Link to={`/events/${event.id}`}>
            View Details
          </Link>

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

export default Events;