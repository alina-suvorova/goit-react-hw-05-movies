import { MovieCardView } from '../../views/MovieCardView';
import { Link, Route, useRouteMatch, useLocation } from 'react-router-dom';
import slugify from 'slugify';

const makeSlug = string => slugify(string, { lower: true });

function ListOfMoviesSearch({ results, query, pageForCard }) {
    const { path, url } = useRouteMatch();
    const location = useLocation();
    const changePageOfSearch = () => {
        pageForCard(url);
    };
    return (
        <>
            <ul>
                {results &&
                    results.map(movie => {
                        return (
                            <li key={movie.id}>
                                <Link
                                    to={{
                                        pathname: `${url}/${makeSlug(
                                            `${movie.title} ${movie.id}`,
                                        )}`,
                                        state: {
                                            from: location,
                                        }
                                    }}
                                    onClick={changePageOfSearch}
                                >
                                    {movie.title}
                                </Link>
                            </li>
                        );
                    })}
            </ul>
            <Route path={`${path}/:movieId`}>
                <MovieCardView query={query} props={Route.props} />
            </Route>
        </>
    );
}

export { ListOfMoviesSearch };