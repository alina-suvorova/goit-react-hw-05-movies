import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

function Navigation({ changeQuery }) {
    const onClickMovieLink = () => {
        changeQuery("");
    };
    return (
        <nav>
            <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>Home</NavLink>
            <NavLink to="/movies" className={s.link} activeClassName={s.activeLink} onClick={onClickMovieLink}>Movies</NavLink>
        </nav>
    );
}

export { Navigation };
