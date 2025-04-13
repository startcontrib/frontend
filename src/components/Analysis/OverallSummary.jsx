import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For tables, strikethrough etc.


const OverallSummary = ({ summary, isLoading, error, onRetry }) => {
    return (
        <div className="analysis-section">
            <h4>✨ AI Repository Overview</h4>
            {isLoading && <LoadingSpinner text="Generating summary..." />}
            {error && <ErrorMessage message={error} />}
            {error && onRetry && <button onClick={onRetry} style={{marginTop: '5px'}}>Retry Summary</button>}
            {summary && !isLoading && !error && (
                <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
                </div>
            )}
            {!summary && !isLoading && !error && <p>No summary available.</p>}
        </div>
    );
};

export default OverallSummary;