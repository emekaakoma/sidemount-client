import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logo from "../../logo/sidemount.png"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav className="navbar" class="navbar is-dark is-transparent">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img src={logo} ></img>
                </a>
            </div>

            <a className="navbar__item" class="navbar-item">
                <Link to="/events">Home</Link>
            </a>
            <a className="navbar__item" class="navbar-item ">
                <Link to="/createevent">Create Event</Link>
            </a>
            <a className="navbar__item" class="navbar-item">
                <Link to="/myevents">My Events</Link>
            </a>
            <a className="navbar__item" class="navbar-item">
                <Link to="/attendingevents">Attending Events</Link>
            </a>



            {
                (localStorage.getItem("sm_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink" class="button is-rounded"
                            onClick={() => {
                                localStorage.removeItem("sm_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" class="button is-rounded">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" class="button is-rounded">Register</Link>
                        </li>
                    </>
            }
        </nav>
    )
}
