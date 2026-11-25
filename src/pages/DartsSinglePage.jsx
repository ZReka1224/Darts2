import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

export const DartsSinglePage = () => {
  const { dartsId } = useParams();
  const [player, setPlayer] = useState({});
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    axios
      .get(`https://sulla.hu{dartsId}`)
      .then((res) => setPlayer(res.data))
      .catch((error) => console.log(error))
      .finally(() => setPending(false));
  }, [dartsId]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !player.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3 col-md-6 mx-auto">
          <div className="card-body">
            <h5 className="card-title">{player.name}</h5>
            <div className="lead">Születési dátum: {player.birth_date}</div>
            <div className="lead">Nyert világbajnokságok: {player.world_ch_won}</div>
            <img
              alt={player.name}
              className="img-fluid rounded my-3"
              style={{ maxHeight: "400px" }}
              src={player.image_url ? player.image_url : "https://placeholder.com"}
            />
            <br />
            <a href={player.profile_url} target="_blank" rel="noreferrer" className="btn btn-info me-2">
              Wikipédia
            </a>
            <NavLink to="/" className="btn btn-secondary">
              Vissza
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
