import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Loader from './components/Loader';
import ResultsView from './components/ResultsView';
import { extractTextFromPDF } from './utils/pdfExtractor';
import { extractTextFromImage } from './utils/imageExtractor';

function App() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState(null);

  const processFile = async (uploadedFile) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setExtractedText('');

    try {
      let text = '';
      if (uploadedFile.type === 'application/pdf') {
        // We don't have progress for PDF, so just show an indeterminate loader message
        setProgress(null);
        text = await extractTextFromPDF(uploadedFile);
      } else if (uploadedFile.type.startsWith('image/')) {
        // Tesseract provides progress updates
        text = await extractTextFromImage(uploadedFile, setProgress);
      } else {
        throw new Error("Unsupported file type");
      }

      setExtractedText(text);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during extraction.");
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText('');
    setError(null);
    setProgress(null);
  };

  return (
    <div className="container">
      <header className="text-center mb-8 mt-4">
        <h1>Content Analyzer</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Extract text from PDFs and Scanned Images instantly to analyze engagement potential.
        </p>
      </header>

      <main>
        {!file && !isProcessing && (
          <FileUpload onFileProcess={processFile} />
        )}

        {isProcessing && (
          <div className="glass-panel text-center">
            <Loader 
              message={`Processing ${file?.name}...`} 
              progress={progress} 
            />
          </div>
        )}

        {error && !isProcessing && (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="text-error mb-4">
              <strong>Error:</strong> {error}
            </div>
            <button className="btn btn-primary" onClick={handleReset}>
              Try Again
            </button>
          </div>
        )}

        {extractedText && !isProcessing && !error && (
          <ResultsView 
            text={extractedText} 
            fileName={file?.name}
            onReset={handleReset} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
