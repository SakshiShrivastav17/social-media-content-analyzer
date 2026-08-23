import React, { useCallback, useState } from 'react';
import { UploadCloud, FileType, Image as ImageIcon } from 'lucide-react';

const FileUpload = ({ onFileProcess }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const validateAndProcessFile = (file) => {
    setError(null);
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or an Image (PNG, JPG) file.");
      return;
    }

    onFileProcess(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <div 
        className={`upload-zone ${isDragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <input 
          id="file-upload" 
          type="file" 
          style={{ display: 'none' }}
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleChange}
        />
        
        <UploadCloud size={48} color={isDragActive ? "var(--secondary)" : "var(--primary)"} style={{ margin: '0 auto 1rem' }} />
        
        <h3 className="mb-4" style={{ color: 'var(--text-primary)' }}>
          Drag & Drop your document here
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          or click to browse from your computer
        </p>

        <div className="flex justify-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span className="flex items-center gap-2">
            <FileType size={16} /> PDF Files
          </span>
          <span className="flex items-center gap-2">
            <ImageIcon size={16} /> Scanned Images (PNG, JPG)
          </span>
        </div>
      </div>
      
      {error && (
        <div className="text-center mt-4 text-error bg-error/10 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
