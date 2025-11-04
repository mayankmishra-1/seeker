import React from 'react';

export default function SearchResults({ results }) {
  if (!results.length) return <p>No results found.</p>;

  return (
    <ul>
      {results.map(({ url, score }) => (
        <li key={url}>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> - Score: {score.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}
