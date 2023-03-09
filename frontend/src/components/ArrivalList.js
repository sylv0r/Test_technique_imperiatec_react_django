import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "../utils/useAxios";
function ArrivalList({ onLogout }) {
  const [arrivals, setArrivals] = useState([]);
  const [user_name, setUserName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [res, setRes] = useState("");
  const api = useAxios();
  
  useEffect(() => {
    const fetchArrivals = async () => {
      try {
      const response = await api.get("http://localhost:8000/api/arrivals/");
      setArrivals(response.data);
    } catch {
      setRes("error lors de la récupération des données et de l'affichage");
    }
    };
    fetchArrivals();
  }, []);


  const handleCreate = async () => {
    try {
      const response = await api.post("arrivals/", {
        user_name,
        arrival_date: arrivalDate,
        arrival_time: arrivalTime,
      });
      setArrivals([...arrivals, response.data]);
      setUserName("");
      setArrivalDate("");
      setArrivalTime("");
    } catch (error) {
      setRes("error lors de la création");
    }
  };
  


  const handleDelete = async (id) => {
    try {
      await api.delete(`arrivals/${id}/`);
      setArrivals(arrivals.filter((arrival) => arrival.id !== id));
    } catch {
      setRes("error lors de la suppression");
    }
  };
  
  const handleEdit = async (id, newUserName, newDate, newTime) => {
    try {
      const response = await api.patch(`arrivals/${id}/`, {
        user_name: newUserName,
        arrival_date: newDate,
        arrival_time: newTime,
      });
      setArrivals(
        arrivals.map((arrival) =>
          arrival.id === id ? { ...response.data } : arrival
        )
      );
    } catch {
      setRes("erreur lors de la modification");
    }
  };
  

  return (
    <div>
      <h1>Liste des arrivées</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date d'arrivée</th>
            <th>Heure d'arrivée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <p>{res}</p>
          {arrivals.map((arrival) => (
            <tr key={arrival.id}>
              <td>{arrival.user_name}</td>
              <td>{arrival.arrival_date}</td>
              <td>{arrival.arrival_time}</td>
              <td>
                <button onClick={() => handleDelete(arrival.id)}>Supprimer</button>
                <button
                  onClick={() =>
                    handleEdit(
                      arrival.id,
                      prompt("Nouveau nom", arrival.user_name),
                      prompt("Nouvelle date d'arrivée", arrival.arrival_date),
                      prompt("Nouvelle heure d'arrivée", arrival.arrival_time)
                    )
                  }
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
        <h2>Ajouter une arrivée</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleCreate();
        }}>
          <div>
            <label htmlFor="user_name">Nom de l'utilisateur:</label>
            <input
              type="text"
              id="user_name"
              value={user_name}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="arrival-date">Date d'arrivée:</label>
            <input
              type="date"
              id="arrival-date"
              value={arrivalDate}
              onChange={(event) => setArrivalDate(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="arrival-time">Heure d'arrivée:</label>
            <input
              type="time"
              id="arrival-time"
              value={arrivalTime}
              onChange={(event) => setArrivalTime(event.target.value)}
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default ArrivalList;
