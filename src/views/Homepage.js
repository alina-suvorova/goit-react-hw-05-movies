import { Title } from "../components/Title/Title";
import { fetchTranding } from "../service/api";
import { useState, useEffect } from "react";
import { loadingStatus } from "../utils/loadingStatus";
import { ListOfMoviesHomePage } from "../components/ListOfMoviesHomePage/ListOfMoviesHomePage";

function Homepage({ changePage }) {
    const [movies, setmovies] = useState(null);
    const [loadStatus, setLoadStatus] = useState(loadingStatus.IDLE);
    useEffect(() => {
        setLoadStatus(loadingStatus.PENDING);
        fetchTranding().then((movies) => {
            setmovies(movies);
            setLoadStatus(loadingStatus.RESOLVED);
        });
    }, []);

    return (
        <div>
            <Title title="Tranding today" />
            {loadStatus === loadingStatus.RESOLVED && (
                <ListOfMoviesHomePage movies={movies.results} changePage={changePage} />
            )}
        </div>
    );
}

export { Homepage };