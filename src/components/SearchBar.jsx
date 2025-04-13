import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                // Updated Placeholder
                placeholder="Find a repository (e.g., 'react', 'openai/gpt-3', 'beginner-friendly python')"
                disabled={isLoading}
                aria-label="Search GitHub Repositories" // Accessibility
            />
            <button type="submit" disabled={isLoading || !query.trim()}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};

export default SearchBar;