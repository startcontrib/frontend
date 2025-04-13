import React, { useState } from 'react';
import { summarizeItem } from '../../services/apiClient';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ItemSummary = ({ item, itemType, owner, repoName }) => {
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showBody, setShowBody] = useState(false); // State to toggle body visibility

    const fetchSummary = async () => {
        setIsLoading(true);
        setError(null);
        setSummary(null); // Clear previous summary

        // Prepare context expected by the backend
        const itemContext = {
            title: item.title,
            body: item.body,
            comments: item.comments || [] // Ensure comments is an array
        };

        try {
            const response = await summarizeItem(owner, repoName, itemType, item.number, itemContext);
            setSummary(response.data.summary);
        } catch (err) {
            console.error(`Summary fetch failed for ${itemType} #${item.number}:`, err);
            setError(err.response?.data?.error || err.message || "Failed to generate summary.");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleBody = () => setShowBody(!showBody);

    // Determine label display
    const labelsDisplay = item.labels && item.labels.length > 0
        ? item.labels.map(label => <code key={label}>{label}</code>)
        : 'None';

    // Truncate body for initial display
    const bodySnippet = item.body ? (item.body.length > 300 ? item.body.substring(0, 300) + "..." : item.body) : null;

    return (
        <div className="item-summary">
            <div className="item-summary-header">
                <span className="item-summary-title">
                     <a href={item.url} target="_blank" rel="noopener noreferrer">#{item.number}: {item.title}</a>
                     {item.labels && item.labels.length > 0 && (
                        <span className="item-summary-labels">(Labels: {labelsDisplay})</span>
                    )}
                 </span>
                <button onClick={fetchSummary} disabled={isLoading}>
                    {isLoading ? 'Summarizing...' : '📄 Summarize'}
                </button>
            </div>

             {item.body && (
                <div className="item-summary-body">
                    <button onClick={toggleBody} style={{ fontSize: '0.75rem', padding: '2px 5px', marginRight: '5px', marginBottom:'5px' }}>
                        {showBody ? 'Hide Body' : 'Show Body'}
                    </button>
                    {showBody ? (
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '300px', overflowY: 'auto', background:'#f9f9f9', padding:'5px' }}>
                            {item.body}
                        </pre>
                    ) : (
                        <p><i>{bodySnippet || '(No body content)'}</i></p>
                    )}
                </div>
            )}

            {error && <ErrorMessage message={error} />}
            {summary && (
                <div className="item-summary-ai markdown-content">
                    <strong>AI Summary:</strong>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default ItemSummary;