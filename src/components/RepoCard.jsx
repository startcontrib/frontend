import React from 'react';
import { Link } from 'react-router-dom';

const StarIcon = () => <span role="img" aria-label="star">⭐</span>;

const RepoCard = ({ repo }) => {
    return (
        <li className="repo-card">
            <Link to={`/repo/${repo.owner}/${repo.repo_name}`}>
                <h3>{repo.full_name}</h3>
                <p>{repo.description || "No description provided."}</p>
                <div className="repo-card-meta">
                     {repo.avatar_url && (
                        <span>
                           <img src={repo.avatar_url} alt={`${repo.owner} avatar`} />
                           {repo.owner}
                        </span>
                     )}
                    <span><StarIcon /> {repo.stars?.toLocaleString() || 0}</span>
                    {repo.language && <span>{repo.language}</span>}
                </div>
            </Link>
        </li>
    );
};

export default RepoCard;