import { useNavigate } from "react-router-dom";
import axios from "axios";

export const DartsCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://darts.sulla.hu/darts", {
        name: event.target.elements.name.value,
        birth_date: event.target.elements.birth_date.value,
        world_ch_won: Number(event.target.elements.world_ch_won.value),
        profile_url: event.target.elements.profile_url.value,
        image_url: event.target.elements.image_url.value,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 content bg-ivory text-center">
      <h2>Új dartsozó</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
          <div className="col-sm-9">
            <input type="text" name="name" className="form-control" required />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Születési dátum:</label>
          <div className="col-sm-9">
            <input type="date" name="birth_date" className="form-control" required />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Nyert VB-k száma:</label>
          <div className="col-sm-9">
            <input type="number" name="world_ch_won" className="form-control" required />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Profil URL (Wiki):</label>
          <div className="col-sm-9">
            <input type="text" name="profile_url" className="form-control" />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép URL:</label>
          <div className="col-sm-9">
            <input type="text" name="image_url" className="form-control" />
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
};
