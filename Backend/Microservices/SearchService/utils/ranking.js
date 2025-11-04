export const calculateTFIDF = (doc, indexEntry, queryTokens) => {
  const termFrequency = doc.frequency / doc.positions.length;
  const documentFrequency = indexEntry.documents.length;
  const inverseDocumentFrequency = Math.log(indexEntry.documents.length / documentFrequency || 1);
  return termFrequency * inverseDocumentFrequency;
};
