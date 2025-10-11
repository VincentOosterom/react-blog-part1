import './NavBar.css'
import logo from '../../assets/logo-small.png'
import {NavLink} from "react-router-dom";

function NavBar() {
    return (

        <nav className="nav-bar">
            <div className="logo-container">
                <img src={logo} alt="Company Logo"/>
                <h3>BIOgventure</h3>
            </div>
            <ul className="navbar-links">
                <li><NavLink to="/homepage" className={({isActive}) => isActive ? "active" : "default"}>Home</NavLink></li>
                <li><NavLink to="/blog-overview" className={({isActive}) => isActive ? "active" : "default"}>Alle posts</NavLink></li>
                <li><NavLink to="/new-post" className={({isActive}) => isActive ? "active" : "default"}>Nieuwe post maken</NavLink></li>
            </ul>

        </nav>


    )
}

export default NavBar;