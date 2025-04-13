import React from 'react';
import ItemSummary from './ItemSummary';

const IssuesList = ({ issues, owner, repoName }) => {
    if (!issues || issues.length === 0) {
        return <p>No open issues found or data unavailable.</p>;
    }

    // Limit display
    const displayLimit = 10;
    const displayedIssues = issues.slice(0, displayLimit);

    return (
        <div>
            <h5>Open Issues ({issues.length} fetched{issues.length > displayLimit ? `, showing ${displayLimit}`: ''})</h5>
            {displayedIssues.map(issue => (
                <ItemSummary
                    key={issue.number}
                    item={issue}
                    itemType="issue"
                    owner={owner}
                    repoName={repoName}
                />
            ))}
             {issues.length > displayLimit && <p>...</p>}
        </div>
    );
};

export default IssuesList;