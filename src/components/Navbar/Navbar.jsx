
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        CivicFix
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>About</li>
        <li>Features</li>
        <li>Contact</li>
      </ul>

      <Link to="/login" className="login-btn">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;
