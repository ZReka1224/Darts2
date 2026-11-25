import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const DartsListPage = () => {
  const [dartsPlayers, setDartsPlayers] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  const fetchDarts = async () => {
    setFetchPending(true);
    try {
      const response = await axios.get("https://darts.sulla.hu/darts");
      setDartsPlayers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchPending(false);
    }
  };

  useEffect(() => {
    fetchDarts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a dartsozót?")) return;
    try {
      await axios.delete(`https://sulla.hu{id}`);
      fetchDarts(); // Lista frissítése törlés után
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Dartsozók</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {dartsPlayers.map((player) => (
              <div key={player.id} className="card col-sm-3 d-inline-block m-1 p-2">
                <p className="text-dark fw-bold">{player.name}</p>
                <p className="text-danger">Születési dátum: {player.birth_date}</p>
                <p className="text-danger">Világbajnoki címek: {player.world_ch_won}</p>
                <div className="card-body">
                  <NavLink to={`/darts/${player.id}`}>
                    <img
                      alt={player.name}
                      className="img-fluid"
                      style={{ maxHeight: 200 }}
                      src={player.image_url ? player.image_url : "https://placeholder.com"}
                    />
                  </NavLink>
                  <br />
                  <a href={player.profile_url} target="_blank" rel="noreferrer">
                    Wikipédia profil
                  </a>
                  <br />
                  <div className="mt-2">
                    <NavLink to={`/mod-darts/${player.id}`} className="btn btn-warning btn-sm me-2">
                      Módosítás
                    </NavLink>
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Törlés
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
