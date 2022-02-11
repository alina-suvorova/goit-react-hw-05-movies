import { Link, useRouteMatch, useLocation } from "react-router-dom";
import s from "./ListOfMoviesHomePage.module.css"

import slugify from 'slugify';

const makeSlug = string => slugify(string, { lower: true });

function ListOfMoviesHomePage({ movies, changePage }) {
    const { url } = useRouteMatch();
    const location = useLocation();

    const onLinkListHomeClick = () => {
        changePage(url);
    };
    return (
        <ul className={s.ImageGallery}>
            {movies &&
                movies.map(movie => {
                    return (
                        <li key={movie.id} className={s.ImageGalleryItem}>
                            <Link to={{
                                pathname: `/movies/${makeSlug(`${movie.title} ${movie.id}`)}`,
                                state: {
                                    from: location,
                                },
                            }}
                                className={s.LinkOfListHomepage}
                                onClick={onLinkListHomeClick}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt={movie.title}
                                    className={s.ImageGalleryItem_image} />
                                {movie.name ? (
                                    <h3 className={s.CardTitleHomePage}>{movie.name}</h3>
                                ) : (
                                    <h3 className={s.CardTitleHomePage}>{movie.title}</h3>
                                )}
                            </Link>
                        </li>
                    );
                })}
        </ul>
    );
}

export { ListOfMoviesHomePage };