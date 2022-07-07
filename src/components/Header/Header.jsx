import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/GoScrum.png";
import "./Header.styles.css";

export const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => state.tasksReducer);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <img src={Logo} alt="Logo" />
      <div className="wrapper-right-header">
        <div>
          <button onClick={() => navigate("/donate", { replace: true })}>
            Donar
          </button>
        </div>
        <div className="black">Tareas creadas: {tasks ? tasks.length : 0}</div>
        <div className="black">{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>X</div>
      </div>
    </header>
  );
};
