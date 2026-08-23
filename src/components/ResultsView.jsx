import React from 'react';
import { RefreshCw, CheckCircle, TrendingUp } from 'lucide-react';

const ResultsView = ({ text, fileName, onReset }) => {
  // Mock engagement suggestions based on text characteristics
  const getSuggestions = (content) => {
    const suggestions = [];
    if (!content) return suggestions;
    
    const words = content.split(/\s+/).length;
    const hasHashtags = /#\w+/.test(content);
    const hasMentions = /@\w+/.test(content);
    
    if (words > 100) {
      suggestions.push({
        id: 1,
        text: "Content is quite long. Consider breaking it down into a thread or using bullet points for better readability.",
        type: "warning"
      });
    } else {
      suggestions.push({
        id: 2,
        text: "Good length! Short and concise posts typically see higher engagement rates.",
        type: "success"
      });
    }
    
    if (!hasHashtags) {
      suggestions.push({
        id: 3,
        text: "Missing hashtags. Add 2-3 relevant hashtags to increase discoverability.",
        type: "warning"
      });
    }
    
    if (!hasMentions) {
      suggestions.push({
        id: 4,
        text: "No mentions found. Tagging relevant accounts can boost your reach significantly.",
        type: "info"
      });
    }
    
    return suggestions;
  };

  const suggestions = getSuggestions(text);

  return (
    <div className="result-card glass-panel" style={{ padding: '2rem' }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Analysis Results</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Extracted from: {fileName}</p>
        </div>
        <button className="btn btn-primary" onClick={onReset}>
          <RefreshCw size={18} /> Process Another
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Extracted Text Column */}
        <div>
          <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.2rem' }}>
            <CheckCircle size={20} color="var(--secondary)" /> Extracted Content
          </h3>
          <div className="text-content">
            {text || "No text could be extracted."}
          </div>
        </div>

        {/* Engagement Suggestions Column */}
        <div>
          <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.2rem' }}>
            <TrendingUp size={20} color="var(--primary)" /> Engagement Insights
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {suggestions.map((suggestion) => (
              <div 
                key={suggestion.id} 
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: `4px solid ${
                    suggestion.type === 'success' ? 'var(--secondary)' : 
                    suggestion.type === 'warning' ? '#f59e0b' : 'var(--primary)'
                  }`
                }}
              >
                <p style={{ fontSize: '0.95rem' }}>{suggestion.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
