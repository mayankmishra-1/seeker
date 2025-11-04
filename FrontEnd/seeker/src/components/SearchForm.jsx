import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function SearchForm({ onResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const res = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
      const results = await res.json();
      onResults(results);
    } catch {
      onResults([]);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '300px' }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
