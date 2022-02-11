import { fetchMovieReviewById } from "../service/api";
import { useState, useEffect } from "react";

function ReviewsView({ movieId }) {
    const [review, setReview] = useState(null);

    useEffect(() => {
        fetchMovieReviewById(movieId).then((data) => {
            setReview(data.results);
        });
    }, [movieId]);
    return (
        <ul>
            {review === null || review.length === 0 ? (
                <p>There are not any informations...</p>
            ) : (
                review.map((item) => (
                    <li key={item.id}>
                        <p>Author: {item.author}</p>
                        <p>{item.content}</p>
                    </li>
                ))
            )}
        </ul>
    );
}

export { ReviewsView };