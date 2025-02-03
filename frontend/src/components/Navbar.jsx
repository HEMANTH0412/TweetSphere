import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">TweetSphere</Link>
      </div>
      <div className="navbar-right">
        {
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        }
      </div>
    </nav>
  );
}

export default Navbar;
