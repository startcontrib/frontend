import React from 'react';
import RepoCard from './RepoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ResultsList = ({ results, isLoading, error }) => {
    if (isLoading) return <LoadingSpinner text="Searching Repositories..." />;
    if (error) return <ErrorMessage message={error} />;
    if (!results || results.length === 0) return <p>No repositories found. Try a different search term.</p>;

    return (
        <ul className="results-list">
            {results.map((repo) => (
                <RepoCard key={repo.full_name} repo={repo} />
            ))}
        </ul>
    );
};

export default ResultsList;