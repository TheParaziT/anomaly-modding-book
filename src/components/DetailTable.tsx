import React, { useState, useEffect } from 'react';
import { buildFilePath, validateFileResponse, safeJsonParse } from '../utils/fileUtils';
import { formatTime } from '../utils/stringUtils';
import LoadingSpinner from './LoadingSpinner';
import type { DetailTableProps } from '../types';
import styles from './ExpandableDataTable.module.css';

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

  const processNestedData = (data: any): TableData => {
    const sections: TableData['sections'] = [];

    for (const [sectionName, sectionData] of Object.entries(data)) {
      if (typeof sectionData === 'object' && sectionData !== null && !Array.isArray(sectionData)) {
        const parameters = Object.entries(sectionData).map(([parameter, value]) => ({
          parameter,
          value,
        }));
        sections.push({ sectionName, parameters });
      } else {
        sections.push({
          sectionName,
          parameters: [{ parameter: 'Value', value: sectionData }],
        });
      }
    }

    return { sections, isNested: true };
  };

  const processFlatData = (data: any): TableData => {
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      const columns = Array.from(new Set(data.flatMap(item => Object.keys(item))));

      return {
        sections: [
          {
            sectionName: 'Data',
            parameters: data.flatMap((item, index) =>
              columns.map(column => ({
                parameter: `${column} [${index}]`,
                value: item[column],
              }))
            ),
          },
        ],
        isNested: false,
      };
    }

    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      return {
        sections: [
          {
            sectionName: 'Parameters',
            parameters: Object.entries(data).map(([parameter, value]) => ({
              parameter,
              value,
            })),
          },
        ],
        isNested: false,
      };
    }

    return {
      sections: [
        {
          sectionName: 'Value',
          parameters: Array.isArray(data)
            ? data.map((item, index) => ({
                parameter: `Item ${index}`,
                value: item,
              }))
            : [{ parameter: 'Value', value: data }],
        },
      ],
      isNested: false,
    };
  };

  const processData = (data: any): TableData => {
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      const values = Object.values(data);
      const hasNestedObjects = values.some(
        value => typeof value === 'object' && value !== null && !Array.isArray(value)
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

      const fullPath = buildFilePath(fileName, basePath);
      console.log('Loading table data from:', fullPath);

      const response = await fetch(fullPath);
      await validateFileResponse(response);

      const data = await safeJsonParse(response);
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
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  useEffect(() => {
    loadTableData();
  }, [fileName, basePath]);

  if (isLoading) {
    return <LoadingSpinner text={`Loading data from ${basePath}/${fileName}...`} centered />;
  }

  if (error) {
    return (
      <div className={styles.detailError}>
        <p>
          <strong>Error loading data:</strong> {error}
        </p>
        <p className={styles.errorDetails}>
          File: {basePath}/{fileName}
        </p>
        <button onClick={loadTableData} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  if (!tableData || tableData.sections.length === 0) {
    return <div className={styles.detailNoData}>No data available to display</div>;
  }

  return (
    <div className={styles.detailContainer}>
      {tableData.sections.map((section, sectionIndex) => (
        <div key={section.sectionName || sectionIndex} className={styles.detailSection}>
          {tableData.isNested && <h3 className={styles.sectionTitle}>{section.sectionName}</h3>}
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
                  <tr
                    key={`${param.parameter}-${paramIndex}`}
                    className={paramIndex % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
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
