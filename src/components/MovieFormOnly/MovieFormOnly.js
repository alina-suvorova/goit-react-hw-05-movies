import { useState } from 'react';
function MovieFormOnly({ handleFormSubmit }) {
    const [query, setQuery] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit(query);
        setQuery("");
    };
    const handleInput = (e) => {
        const value = e.currentTarget.value;
        setQuery(value);
    };

    return (
        <form onSubmit={onSubmit} className='fromForSearch'>
            <input
                value={query}
                className='searchFormInput'
                type='text'
                autoComplete='off'
                autoFocus
                placeholder='Search movies'
                onChange={handleInput}
            />
            <button type='submit' className='btn'>
                Search
            </button>
        </form>
    );
}

export { MovieFormOnly };