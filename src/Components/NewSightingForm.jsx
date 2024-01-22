import { useState } from "react";
import axios from "axios";
import { backendURL } from "../db";
import { useNavigate } from "react-router-dom";

export default function NewSightingForm() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // send request to localhost
    axios
      .post(`${backendURL}/sightings`, {
        date,
        location,
        notes,
      })
      .then((res) => {
        // empty states
        setDate("");
        setLocation("");
        setNotes("");
        // view sightings as single sightings
        // set in params
        nav(`/${res.data.id}`);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error, show user feedback, etc.
      });
  };

  return (
    <div>
      <h3>Report your sighting:</h3>
      <form onSubmit={handleSubmit}>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <label>Location: </label>
        <input
          type="text"
          value={location}
          placeholder="Singapore"
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />
        <label>Notes: </label>
        <textarea
          value={notes}
          placeholder="Describe the incident."
          onChange={(e) => setNotes(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
