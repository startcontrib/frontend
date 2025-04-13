import React, { useState } from 'react';
import { analyzeError } from '../../services/apiClient';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ErrorAnalyzer = ({ owner, repoName, issues, dependencies }) => {
    const [userInput, setUserInput] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!userInput.trim()) {
            setError("Please enter an error message or description.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            // Pass only necessary context (issues and dependencies might be large)
            // Backend expects lists of objects:
            const issueContext = issues?.map(i => ({
                number: i.number,
                title: i.title,
                labels: i.labels,
                body: i.body?.substring(0, 150), // Keep body snippet
                url: i.url 
               })) || [];
            const depContext = dependencies?.map(d => ({ package_name: d.package_name })) || [];

            const response = await analyzeError(owner, repoName, userInput, issueContext, depContext);
            setAnalysisResult(response.data.analysis);
        } catch (err) {
             console.error("Error analysis failed:", err);
             setError(err.response?.data?.error || err.message || "Failed to analyze error.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="analysis-section error-analyzer">
            <h4>🤔 Analyze Your Error</h4>
            <p>Paste your error message or describe the problem. Analysis is based on metadata, <strong>not</strong> source code.</p>
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Paste your error message here..."
                disabled={isLoading}
            />
            <button onClick={handleAnalyze} disabled={isLoading || !userInput.trim()}>
                {isLoading ? 'Analyzing...' : 'Analyze with AI'}
            </button>

            {error && <ErrorMessage message={error} />}
            {analysisResult && (
                <div className="error-analyzer-result markdown-content">
                    <h5>Analysis Result:</h5>
                     <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysisResult}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default ErrorAnalyzer;