import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnalysisData, getOverallSummary } from '../services/apiClient';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import OverallSummary from '../components/Analysis/OverallSummary';
import LanguageInfo from '../components/Analysis/LanguageInfo';
import IssuesList from '../components/Analysis/IssuesList';
import PullsList from '../components/Analysis/PullsList';
import DiscussionsList from '../components/Analysis/DiscussionsList';
import ErrorAnalyzer from '../components/Analysis/ErrorAnalyzer';

const DependenciesInfo = ({ dependencies }) => (
    <div className="analysis-section">
        <h4>📦 Dependencies</h4>
        {dependencies && dependencies.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
                {dependencies.slice(0, 30).map(dep => ( 
                    <li key={dep.package_name} style={{ marginBottom: '3px', fontSize: '0.85rem' }}>
                        <code>{dep.package_name}</code>
                    </li>
                ))}
                {dependencies.length > 30 && <li style={{fontSize: '0.8rem', color:'#666'}}>...and more</li>}
            </ul>
        ) : (
            <p>No dependency data available or found.</p>
        )}
    </div>
);


const AnalysisPage = () => {
    const { owner, repoName } = useParams();
    const [analysisData, setAnalysisData] = useState(null);
    const [readmeContent, setReadmeContent] = useState(null); // Keep separate for potential future use
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchErrors, setFetchErrors] = useState(null);

    const [overallSummary, setOverallSummary] = useState(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState(null);

    const [activeTab, setActiveTab] = useState('issues'); // Default to 'issues'


    const fetchCoreData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setFetchErrors(null);
        setAnalysisData(null);
        setReadmeContent(null);
        setOverallSummary(null);
        setActiveTab('issues'); 

        try {
            const response = await getAnalysisData(owner, repoName);
            const { readme, repo_data, fetch_errors } = response.data;

            setReadmeContent(readme);
            setAnalysisData(repo_data);
            if (fetch_errors) {
                 console.warn("Partial fetch errors:", fetch_errors);
                 setFetchErrors(fetch_errors.join('; '));
            }
            if (repo_data) {
                 fetchOverallSummary(readme, repo_data);
             }

        } catch (err) {
            console.error("Analysis fetch failed:", err);
            const errorMsg = err.response?.data?.error || err.message || "Failed to fetch repository analysis.";
            setError(errorMsg);
            if (err.response?.status === 404) {
                 setError(`Repository ${owner}/${repoName} not found.`);
            }
        } finally {
            setIsLoading(false);
        }
    }, [owner, repoName]);

    const fetchOverallSummary = async (readme, repoData) => {
        setIsSummaryLoading(true);
        setSummaryError(null);
        try {
            const summaryResponse = await getOverallSummary(owner, repoName, readme, repoData);
            setOverallSummary(summaryResponse.data.summary);
        } catch (err) {
             console.error("Overall summary fetch failed:", err);
             const errorMsg = err.response?.data?.error || err.message || "Failed to generate overall summary.";
             setSummaryError(errorMsg);
        } finally {
             setIsSummaryLoading(false);
        }
    };

    useEffect(() => {
        fetchCoreData();
    }, [fetchCoreData]);


    // --- Render Logic ---
    if (isLoading) return (
        <div className="full-page-loader"> 
            <LoadingSpinner text={`Loading analysis for ${owner}/${repoName}...`} size="large" />
        </div>
     );

     if (error) return (
        <div className="container">
            <ErrorMessage message={error} />
            <p><Link to="/">Go back to search</Link></p>
        </div>
    );

    if (!analysisData) return (
        <div className="container">
            <p>Analysis data could not be loaded.</p>
            <p><Link to="/">« Back to Search</Link></p>
        </div>
    );

    const repoUrl = `https://github.com/${owner}/${repoName}`;

    return (
        <div className="analysis-page"> 
            <div className="container analysis-container"> 

                 <main className="analysis-main">
                    <div className='analysis-header'>
                        <h1>Analysis: <a href={repoUrl} target="_blank" rel="noopener noreferrer">{owner}/{repoName}</a></h1>
                        <p>{analysisData.description || "No description available."}</p>
                        {fetchErrors && <ErrorMessage message={`Note: Some data might be incomplete. Issues encountered: ${fetchErrors}`} />}
                        <p><Link to="/">« Back to Search</Link></p>
                    </div>

                    {/* AI Overall Summary Section */}
                     <OverallSummary
                        summary={overallSummary}
                        isLoading={isSummaryLoading}
                        error={summaryError}
                        onRetry={readmeContent !== undefined ? () => fetchOverallSummary(readmeContent, analysisData) : undefined}
                     />

                    {/* Contribution & Activity Details (Tabs) */}
                    <div className="analysis-section">
                        <h4>🎯 Contribution & Activity Details</h4>
                        {/* Tab Buttons */}
                        <div className="tabs">
                             <button
                                className={`tab-button ${activeTab === 'issues' ? 'active' : ''}`}
                                onClick={() => setActiveTab('issues')}
                             >
                                Open Issues ({analysisData.open_issues?.length ?? 0})
                             </button>
                              <button
                                className={`tab-button ${activeTab === 'pulls' ? 'active' : ''}`}
                                onClick={() => setActiveTab('pulls')}
                             >
                                Open PRs ({analysisData.open_pulls?.length ?? 0})
                             </button>
                              <button
                                className={`tab-button ${activeTab === 'discussions' ? 'active' : ''}`}
                                onClick={() => setActiveTab('discussions')}
                             >
                                Discussions ({analysisData.discussions?.length ?? 0})
                             </button>
                        </div>

                         {/* Tab Content */}
                        <div className="tab-content">
                             {activeTab === 'issues' && (
                                <IssuesList issues={analysisData.open_issues} owner={owner} repoName={repoName} />
                             )}
                             {activeTab === 'pulls' && (
                                <PullsList pulls={analysisData.open_pulls} owner={owner} repoName={repoName} />
                             )}
                              {activeTab === 'discussions' && (
                                <DiscussionsList discussions={analysisData.discussions} />
                             )}
                        </div>
                    </div> 

                    {/* Error Analysis Section */}
                     <ErrorAnalyzer
                        owner={owner}
                        repoName={repoName}
                        // Pass only necessary parts of issues/deps to avoid large prop drilling if optimizing
                        issues={analysisData.open_issues}
                        dependencies={analysisData.dependencies}
                     />

                 </main> 


                {/* --- Sidebar Column --- */}
                <aside className="analysis-sidebar">
                    <LanguageInfo languages={analysisData.languages} />

                    <DependenciesInfo dependencies={analysisData.dependencies} />

                     <div className="analysis-section">
                        <h4>📊 Stats</h4>
                         <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>⭐ Stars: {analysisData.stars?.toLocaleString() ?? 'N/A'}</li>
                         </ul>
                         <p style={{fontSize:'0.8rem', color:'#666'}}>
                            <a href={repoUrl} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                         </p>
                     </div>

                </aside> 

            </div> 
        </div>
    );
};

export default AnalysisPage;