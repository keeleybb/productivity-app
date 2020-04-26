import React, { useEffect, useRef, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import userContext from '../../utils/userContext';
import API from "../../utils/API";

const Nav = (props) => {
  const { user, goals } = useContext(userContext);
  console.log(goals)
  const handleLogout = () => {
    API.logout().then(res => {
      window.location.assign("/");
    });
  };


  let slide = useRef(null);

  useEffect(() => {
    let sidenav = slide;
    console.log("SLIDE ", sidenav)
    M.Sidenav.init(sidenav, {});
  })

  const handleClick = () => {
    console.log("CLICK")
    let sidenav = slide;
    var instance = M.Sidenav.getInstance(sidenav);
    instance.close();
  }


  return (
    <div>

      <nav>
        <div className="nav-wrapper">
          <a href="#" data-target="slide-out" className="sidenav-trigger show-on-med"><i className="material-icons">menu</i></a>
          <a href="/" class="brand-logo">
            Surată
          </a>

          <ul className="right hide-on-med-and-down active">
            <li><Link to="/goals">My Goals</Link></li>
            <li><Link to="/calendar">My Plan</Link></li>
            <li><Link to="/pomodor">My Time</Link></li>
            <li><Link to="/mysoul">My Soul</Link></li>
            {/* <li><Link to="#">My Food</Link></li> */}
            {props.isLoggedIn ? (<li><a className="nav-link" onClick={handleLogout}>Logout</a></li>) : (<li><Link to="/signup" >Sign Up/Log In</Link></li>)}
          </ul>
        </div>
      </nav>

      <ul className="sidenav right" ref={el => slide = el} id="slide-out">
        <li><Link to="/goals" onClick={handleClick}>My Goals</Link></li>
        <li><Link to="/calendar" onClick={handleClick}>My Plan</Link></li>
        <li><Link to="/pomodor" onClick={handleClick}>My Time</Link></li>
        <li><Link to="/mysoul" onClick={handleClick}>My Soul</Link></li>
        {props.isLoggedIn ? (<li><a className="nav-link" onClick={handleLogout}>Logout</a></li>) : (<li><Link to="/signup" onClick={handleClick} >Sign Up/Log In</Link></li>)}
      </ul>
    </div>
  );
}

export default Nav;