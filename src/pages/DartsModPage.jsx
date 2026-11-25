import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const DartsModPage = () => {
  const { dartsId } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState({
    name: "",
    birth_date: "",
    world_ch_won: 0,
    profile_url: "",
    image_url: "",
  });

  useEffect(() => {
    axios
      .get(`https://sulla.hu{dartsId}`)
      .then((res) => setPlayer(res.data))
      .catch((error) => console.log(error));
  }, [dartsId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name]: name === "world_ch_won" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://sulla.hu{dartsId}`, player);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 content bg-ivory text-center">
      <h2>Dartsozó módosítása</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="name"
              className="form-control"
              value={player.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Születési dátum:</label>
          <div className="col-sm-9">
            <input
              type="date"
              name="birth_date"
              className="form-control"
              value={player.birth_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Nyert VB-k száma:</label>
          <div className="col-sm-9">
            <input
              type="number"
              name="world_ch_won"
              className="form-control"
              value={player.world_ch_won}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Profil URL (Wiki):</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="profile_url"
              className="form-control"
              value={player.profile_url}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép URL:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="image_url"
              className="form-control"
              value={player.image_url}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Mentés
        </button>
      </form>
    </div>
  );
};
