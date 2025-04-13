import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import ErrorMessage from '../components/ErrorMessage';
import RepoCard from '../components/RepoCard'; 
import { searchRepos } from '../services/apiClient';

const recommendedRepos = [
   {
    category: "🚀 Getting Started",
    repos: [
      { full_name: "firstcontributions/first-contributions", owner: "firstcontributions", repo_name: "first-contributions", description: "🚀✨ Help beginners to contribute to open source projects", language: "HTML", stars: 40136, avatar_url: "https://avatars.githubusercontent.com/u/28414867?v=4", url: "https://github.com/firstcontributions/first-contributions" },
      { full_name: "MunGell/awesome-for-beginners", owner: "MunGell", repo_name: "awesome-for-beginners", description: "A list of awesome beginners-friendly projects.", language: null, stars: 60432, avatar_url: "https://avatars.githubusercontent.com/u/8006763?v=4", url: "https://github.com/MunGell/awesome-for-beginners" },
       { full_name: "EddieHubCommunity/BioDrop", owner: "EddieHubCommunity", repo_name: "BioDrop", description: "Connect to your audience with a single link. Showcase the content you create and your projects in one place.", language: "JavaScript", stars: 5893, avatar_url: "https://avatars.githubusercontent.com/u/66388388?v=4", url: "https://github.com/EddieHubCommunity/BioDrop"},
    ]
  },
  {
    category: "🐍 Python Projects",
    repos: [
       { full_name: "streamlit/streamlit", owner: "streamlit", repo_name: "streamlit", description: "Streamlit — A faster way to build and share data apps.", language: "Python", stars: 30146, avatar_url: "https://avatars.githubusercontent.com/u/45109972?v=4", url: "https://github.com/streamlit/streamlit" },
      { full_name: "tiangolo/fastapi", owner: "tiangolo", repo_name: "fastapi", description: "FastAPI framework, high performance, easy to learn, fast to code, ready for production", language: "Python", stars: 69767, avatar_url: "https://avatars.githubusercontent.com/u/22031471?v=4", url: "https://github.com/tiangolo/fastapi" },
      { full_name: "pallets/flask", owner: "pallets", repo_name: "flask", description: "The Python micro framework for building web applications.", language: "Python", stars: 66293, avatar_url: "https://avatars.githubusercontent.com/u/16740686?v=4", url: "https://github.com/pallets/flask" },

    ]
  },
];


const SearchPage = () => {
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed

    const handleSearch = async (query) => {
        setIsLoading(true);
        setError(null);
        setResults(null);
        setHasSearched(true); // Mark that a search attempt was made
        try {
            const response = await searchRepos(query);
            setResults(response.data);
        } catch (err) {
            console.error("Search failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch search results.");
            setResults([]); // Set to empty on error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container search-page-container"> 
            {/* --- Header --- */}
            <div className="search-page-header">
                 <h1>Contrib 🧭</h1> 
                 <p>Your AI-Powered Guide to Exploring GitHub Repositories</p>
            </div>

            {/* --- Search Area --- */}
            <div className="search-area">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                {/* Display search results OR specific message if search yielded nothing */}
                {hasSearched && (
                    <div className="search-results-section">
                        <h3>Search Results</h3>
                        <ResultsList results={results} isLoading={isLoading} error={error} />
                    </div>
                )}
            </div>

            {/* --- Recommendations Area (Only show if no search performed yet) --- */}
            {!hasSearched && (
                <div className="recommendations-section">
                    <h2>Discover Projects</h2>
                    <p>Explore these projects or search for specific repositories above.</p>
                    {recommendedRepos.map((category) => (
                        <div key={category.category} className="recommendation-category">
                            <h3>{category.category}</h3>
                            <ul className="recommendation-list"> {/* Use ul for list semantics */}
                                {category.repos.map((repo) => (
                                    <RepoCard key={repo.full_name} repo={repo} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;