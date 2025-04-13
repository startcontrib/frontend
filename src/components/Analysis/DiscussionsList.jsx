import React from 'react';

const DiscussionsList = ({ discussions }) => {
    if (!discussions || discussions.length === 0) {
        return <p>No recent discussions found or data unavailable.</p>;
    }
     // Limit display
    const displayLimit = 10;
    const displayedDiscussions = discussions.slice(0, displayLimit);

    return (
        <div>
            <h5>Recent Discussions ({discussions.length} fetched{discussions.length > displayLimit ? `, showing ${displayLimit}`: ''})</h5>
             <p style={{fontSize: '0.85rem', color: '#666'}}><i>Note: Individual discussion summarization not yet implemented.</i></p>
            <ul>
                {displayedDiscussions.map(disc => (
                    <li key={disc.number}>
                        <a href={disc.url} target="_blank" rel="noopener noreferrer">
                            #{disc.number}: {disc.title}
                        </a>
                    </li>
                ))}
            </ul>
            {discussions.length > displayLimit && <p>...</p>}
        </div>
    );
};

export default DiscussionsList;