import React, { useState, useEffect } from 'react';
import styles from './table-styles.module.css';

interface DetailTableProps {
  fileName: string;
  basePath?: string;
}

const DetailTable: React.FC<DetailTableProps> = ({ fileName, basePath = '/data/tables' }) => {
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTableData();
  }, [fileName, basePath]);

  const loadTableData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const fullPath = `${basePath}/${fileName}`.replace(/\/+/g, '/');
      console.log('Loading file:', fullPath);

      const response = await fetch(fullPath);

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response text:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}. Response: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.log('Non-JSON content received:', text.substring(0, 200));
        throw new Error(`JSON expected, received: ${contentType || 'unknown type'}`);
      }

      const data = await response.json();
      console.log('Data received:', data);

      if (typeof data !== 'object' || data === null) {
        throw new Error('Incorrect JSON data structure');
      }

      setParameters(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown data loading error';
      console.error('Data loading error:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.detailLoading}>
        <span className={styles.loadingSpinner}></span>
        Loading data from {basePath}/{fileName}...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detailError}>
        <p>
          <strong>Error loading:</strong> {error}
        </p>
        <p className={styles.errorDetails}>
          File: {basePath}/{fileName}
        </p>
        <button
          onClick={loadTableData}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  if (Object.keys(parameters).length === 0) {
    return <div className={styles.detailNoData}>No data to display</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailTableWrapper}>
        <table className={styles.detailTable}>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(parameters).map(([key, value], index) => (
              <tr key={key} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={styles.detailParameterCell}>{key}</td>
                <td className={styles.detailValueCell}>{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailTable;
