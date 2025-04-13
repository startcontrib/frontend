import React from 'react';
import ItemSummary from './ItemSummary';

const PullsList = ({ pulls, owner, repoName }) => {
     if (!pulls || pulls.length === 0) {
        return <p>No open pull requests found or data unavailable.</p>;
    }

    const displayLimit = 10;
    const displayedPulls = pulls.slice(0, displayLimit);

    return (
        <div>
            <h5>Open Pull Requests ({pulls.length} fetched{pulls.length > displayLimit ? `, showing ${displayLimit}`: ''})</h5>
            {displayedPulls.map(pr => (
                 <ItemSummary
                    key={pr.number}
                    item={pr} 
                    itemType="pull_request" 
                    owner={owner}
                    repoName={repoName}
                />
            ))}
            {pulls.length > displayLimit && <p>...</p>}
        </div>
    );
};

export default PullsList;