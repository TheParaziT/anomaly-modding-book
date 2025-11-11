// DetailTable.tsx
import React, { useState, useEffect } from 'react';
import styles from './table-styles.module.css';

interface DetailTableProps {
  fileName: string;
  basePath?: string;
}

interface TableData {
  sections: Array<{
    sectionName: string;
    parameters: Array<{
      parameter: string;
      value: any;
    }>;
  }>;
  isNested: boolean;
}

const DetailTable: React.FC<DetailTableProps> = ({ fileName, basePath = '/data/tables' }) => {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTableData();
  }, [fileName, basePath]);

  const processNestedData = (data: any): TableData => {
    const sections: TableData['sections'] = [];
    
    for (const [sectionName, sectionData] of Object.entries(data)) {
      if (typeof sectionData === 'object' && sectionData !== null && !Array.isArray(sectionData)) {
        const parameters = Object.entries(sectionData).map(([parameter, value]) => ({
          parameter,
          value
        }));
        sections.push({
          sectionName,
          parameters
        });
      } else {
        // Если это не объект, добавляем как отдельную секцию с одним параметром
        sections.push({
          sectionName,
          parameters: [{
            parameter: 'Value',
            value: sectionData
          }]
        });
      }
    }
    
    return {
      sections,
      isNested: true
    };
  };

  const processFlatData = (data: any): TableData => {
    // Если данные - массив объектов
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      const columns = Array.from(
        new Set(data.flatMap(item => Object.keys(item)))
      );
      
      return {
        sections: [{
          sectionName: 'Data',
          parameters: data.flatMap((item, index) => 
            columns.map(column => ({
              parameter: `${column} [${index}]`,
              value: item[column]
            }))
          )
        }],
        isNested: false
      };
    }
    
    // Если данные - одиночный объект (key-value)
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      return {
        sections: [{
          sectionName: 'Parameters',
          parameters: Object.entries(data).map(([parameter, value]) => ({
            parameter,
            value
          }))
        }],
        isNested: false
      };
    }
    
    // Если данные - простой массив или примитив
    return {
      sections: [{
        sectionName: 'Value',
        parameters: Array.isArray(data) 
          ? data.map((item, index) => ({
              parameter: `Item ${index}`,
              value: item
            }))
          : [{
              parameter: 'Value',
              value: data
            }]
      }],
      isNested: false
    };
  };

  const processData = (data: any): TableData => {
    // Проверяем, является ли данные вложенным объектом (как в примере)
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      const values = Object.values(data);
      const hasNestedObjects = values.some(value => 
        typeof value === 'object' && value !== null && !Array.isArray(value)
      );
      
      if (hasNestedObjects) {
        return processNestedData(data);
      }
    }
    
    return processFlatData(data);
  };

  const loadTableData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const fullPath = `${basePath}/${fileName}`.replace(/\/+/g, '/');
      console.log('Loading file:', fullPath);

      const response = await fetch(fullPath);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}. Response: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`JSON expected, received: ${contentType || 'unknown type'}`);
      }

      const data = await response.json();
      console.log('Data received:', data);

      const processedData = processData(data);
      setTableData(processedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown data loading error';
      console.error('Data loading error:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderValue = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
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

  if (!tableData || tableData.sections.length === 0) {
    return <div className={styles.detailNoData}>No data to display</div>;
  }

  return (
    <div className={styles.detailContainer}>
      {tableData.sections.map((section, sectionIndex) => (
        <div key={section.sectionName || sectionIndex} className={styles.detailSection}>
          {tableData.isNested && (
            <h3 className={styles.sectionTitle}>{section.sectionName}</h3>
          )}
          <div className={styles.detailTableWrapper}>
            <table className={styles.detailTable}>
              <thead>
                <tr>
                  <th className={styles.detailParameterCell}>Parameter</th>
                  <th className={styles.detailValueCell}>Value</th>
                </tr>
              </thead>
              <tbody>
                {section.parameters.map((param, paramIndex) => (
                  <tr key={param.parameter} className={paramIndex % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td className={styles.detailParameterCell}>{param.parameter}</td>
                    <td className={styles.detailValueCell}>{renderValue(param.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailTable;