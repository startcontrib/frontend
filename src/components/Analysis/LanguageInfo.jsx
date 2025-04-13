import React from 'react';
// Basic list for now, plotting can be added later
const LanguageInfo = ({ languages }) => {
    if (!languages || Object.keys(languages).length === 0) {
        return (
            <div className="analysis-section">
                <h4>Languages</h4>
                <p>Language data unavailable.</p>
            </div>
        );
    }

    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    if (totalBytes === 0) return <p>No language bytes reported.</p>;

    const sortedLangs = Object.entries(languages)
        .map(([lang, bytes]) => ({ lang, bytes, percent: (bytes / totalBytes) * 100 }))
        .filter(item => item.percent >= 0.1) // Filter out tiny percentages
        .sort((a, b) => b.bytes - a.bytes);

    return (
        <div className="analysis-section">
            <h4>Languages</h4>
            {sortedLangs.length > 0 ? (
                 <ul style={{ listStyle: 'none', padding: 0 }}>
                    {sortedLangs.map(({ lang, percent }) => (
                        <li key={lang} style={{ marginBottom: '5px' }}>
                            {lang}: {percent.toFixed(1)}%
                        </li>
                    ))}
                </ul>
            ) : (
                 <p>Languages constitute less than 0.1% each.</p>
            )}

        </div>
    );
};

export default LanguageInfo;