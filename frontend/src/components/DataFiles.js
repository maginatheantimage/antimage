import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DataFiles.css';

function DataFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFiles();
  }, []);

  const fetchDataFiles = async () => {
    try {
      const response = await axios.get('/api/data/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching data files:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) return <div className="loading">⏳ Loading data files...</div>;

  return (
    <div className="data-files">
      <h2>Stored Data Files ({files.length})</h2>
      <div className="files-grid">
        {files.map((file, index) => (
          <div key={index} className="file-card">
            <div className="file-icon">📄</div>
            <h3>{file.name}</h3>
            <p>Size: {formatSize(file.size)}</p>
            <p>Modified: {new Date(file.modified).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataFiles;
