import { useState, useEffect } from 'react';
import {
    useParams,
    NavLink,
    Route,
    useRouteMatch,
    useLocation,
} from 'react-router-dom';
import { Title } from '../components/Title/Title';
import { fetchMovieById } from '../service/api';
import { CastView } from '../views/CastView';
import { ReviewsView } from './ReviewsView';
import './MovieCardView.css';
import { loadingStatus } from '../utils/loadingStatus';

function MovieCardView({ query, saveQuery, currentPage }) {
    const [loadStatus, setLoadStatus] = useState(loadingStatus.IDLE);
    const [movie, setMovie] = useState(null);
    const { slug } = useParams();
    const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];
    const { url, path } = useRouteMatch();
    const location = useLocation();
    const [prevLocation] = useState(location?.state?.from ?? '/');

    useEffect(() => {
        setLoadStatus(loadingStatus.PENDING);
        fetchMovieById(movieId).then(movies => {
            setMovie(movies);
            setLoadStatus(loadingStatus.RESOLVED);
        });
    }, [movieId]);

    return (
        <>
            {loadStatus === loadingStatus.RESOLVED && (
                <>
                    <NavLink to={prevLocation} className="linkBack">
                        Go Back
                    </NavLink>

                    <Title title={movie.title + '' + movie.release_date.slice(0, 4)} />
                    <div className="wrapperCardInfo">
                        <div className="imgOverview">
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="imgCard"
                                />
                            ) : (
                                <img
                                    src="https://w.zhinka.tv/templates/Default/dleimages/no_image.jpg"
                                    alt={movie.title}
                                    className="imgCard"
                                />
                            )}
                            <div className="overview">
                                <h3>Overview</h3>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                        <div className="genresLinkDiv">
                            <div className="genresDiv">
                                <h3>Genres</h3>
                                <ul className="genresList">
                                    {movie.genres.map(item => (
                                        <li key={item.id} className='genresListItem'>
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="addInformDiv">
                                <h3>Additional information</h3>
                                <ul className='castReviewList'>
                                    <li key={100}>
                                        <NavLink
                                            to={{
                                                pathname: `${url}/cast`,
                                                state: {
                                                    from: location,
                                                },
                                            }}
                                            className="castReviewListItem"
                                        >
                                            Cast
                                        </NavLink>
                                    </li>
                                    <li key={101}>
                                        <NavLink
                                            to={{
                                                pathname: `${url}/review`,
                                                state: {
                                                    from: location,
                                                },
                                            }}
                                            className="castReviewListItem"
                                        >
                                            Reviews
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Route path={`${path}/cast`}>
                        <CastView movieId={movieId} />
                    </Route>
                    <Route path={`${path}/review`}>
                        <ReviewsView movieId={movieId} />
                    </Route>
                </>
            )}
        </>
    );
}

export { MovieCardView };