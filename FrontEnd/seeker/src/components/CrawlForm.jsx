import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function CrawlForm() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleCrawl = async (e) => {
    e.preventDefault();
    setMessage('Crawling...');

    try {
      const res = await fetch(`${API_BASE_URL}/crawler/crawl`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setMessage(data.message || 'Crawled successfully');
    } catch (error) {
      setMessage('Error crawling URL');
    }
  };

  return (
    <form onSubmit={handleCrawl}>
      <input
        type="url"
        placeholder="Enter URL to crawl"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        style={{ width: '300px' }}
      />
      <button type="submit">Crawl</button>
      <p>{message}</p>
    </form>
  );
}
