import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function BuildIndexButton() {
  const [message, setMessage] = useState('');

  const handleBuildIndex = async () => {
    setMessage('Building index...');
    try {
      const res = await fetch(`${API_BASE_URL}/indexer/build`, { method: 'POST' });
      const data = await res.json();
      setMessage(data.message || 'Index built successfully');
    } catch {
      setMessage('Failed to build index');
    }
  };

  return (
    <div>
      <button onClick={handleBuildIndex}>Build Index</button>
      <p>{message}</p>
    </div>
  );
}
