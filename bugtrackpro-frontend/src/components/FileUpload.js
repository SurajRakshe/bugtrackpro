import React, { useState } from 'react';
import axios from '../api';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadResult(res.data);
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Upload File</h2>
      <input type="file" onChange={handleChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>

      {uploadResult && (
        <div className="mt-4">
          ✅ Uploaded: <a className="text-blue-600 underline" href={uploadResult.url} target="_blank" rel="noreferrer">{uploadResult.filename}</a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
