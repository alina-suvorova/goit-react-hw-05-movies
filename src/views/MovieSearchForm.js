import { fetchMovieByQuery } from "../service/api";
import { useEffect, useState } from 'react';
import './MovieSearchForm.css';
import { ListOfMoviesSearch } from '../components/ListOfMoviesSearch/ListOfMoviesSearch';
import { loadingStatus } from "../utils/loadingStatus";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MovieFormOnly } from '../components/MovieFormOnly/MovieFormOnly'

function MoviesSearchForm({ saveQuery, queryApp, changePage }) {
    const [query, setQuery] = useState(queryApp);
    const [results, setResults] = useState([]);
    const [loadStatus, setLoadStatus] = useState(loadingStatus.IDLE);

    const onSubmitForm = value => {
        setQuery(value);
    };
    useEffect(() => {
        if (!query) {
            return;
        }
        saveQuery(query);
        if (query.trim() === '') {
            setLoadStatus(loadingStatus.RESOLVED);
            return;
        } else {
            fetchMovieByQuery(query).then(data => {
                if (data.results.length === 0) {
                    setLoadStatus(loadingStatus.RESOLVED);
                    setResults([]);
                    return toast.error('Please enter a valid name');
                } else {
                    setResults(data.results);
                    setLoadStatus(loadingStatus.RESOLVED);
                }
            });
        }
    }, [query, saveQuery]);

    return (
        <>
            <ToastContainer autoClose={3000} />
            <div className="searchPage">
                <MovieFormOnly handleFormSubmit={onSubmitForm} />
                {loadStatus === loadingStatus.RESOLVED && (
                    <ListOfMoviesSearch
                        results={results}
                        query={query}
                        pageForCard={changePage}
                    />
                )}
            </div>
        </>
    );
}

export { MoviesSearchForm };