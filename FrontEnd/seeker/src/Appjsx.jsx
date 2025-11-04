import React, { useState } from 'react';
import CrawlForm from './components/CrawlForm';
import BuildIndexButton from './components/BuildIndexButton';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

export default function App() {
  const [results, setResults] = useState([]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mini Search Engine</h1>

      <section>
        <h2>Crawl a URL</h2>
        <CrawlForm />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Build Index</h2>
        <BuildIndexButton />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Search</h2>
        <SearchForm onResults={setResults} />
        <SearchResults results={results} />
      </section>
    </div>
  );
}
