const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "83a8c8f79e6fa9c051e4c0afa10f501c"

async function fetchWithError(url = "", config = {}) {
    const response = await fetch(url, config);
    return response.ok
        ? await response.json()
        : Promise.reject(new Error("Not found"));
}

export function fetchTranding() {
    return fetchWithError(
        `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
    );
}

export function fetchMovieById(movie_id) {
    return fetchWithError(
        `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    );
}

export function fetchMovieCastCrewById(movie_id) {
    return fetchWithError(
        `${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
    );
}

export function fetchMovieReviewById(movie_id) {
    return fetchWithError(
        `${BASE_URL}/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    )
}

export function fetchMovieByQuery(query) {
    return fetchWithError(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
    );
}