
import React, { useState, useEffect, useRef } from 'react';
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
  const tableRef = useRef<HTMLTableElement>(null);
  const retryButtonRef = useRef<HTMLButtonElement>(null);


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

  /**
   * Обработчик клавиатурных событий для таблицы
   */
  const handleTableKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    const table = tableRef.current;
    if (!table) return;

    const focusedElement = document.activeElement;
    const cells = Array.from(table.querySelectorAll('td, th'));
    const currentIndex = cells.indexOf(focusedElement as HTMLElement);

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < cells.length - 1) {
          (cells[currentIndex + 1] as HTMLElement).focus();
        }
        break;

      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) {
          (cells[currentIndex - 1] as HTMLElement).focus();
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        const nextRowIndex = currentIndex + 2; // +2 чтобы пропустить заголовок
        if (nextRowIndex < cells.length) {
          (cells[nextRowIndex] as HTMLElement).focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        const prevRowIndex = currentIndex - 2;
        if (prevRowIndex >= 0) {
          (cells[prevRowIndex] as HTMLElement).focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        if (e.ctrlKey) {
          (cells[0] as HTMLElement).focus(); // Первая ячейка
        } else {
          // Первая ячейка текущей строки
          const currentRow = focusedElement?.closest('tr');
          if (currentRow) {
            const firstCell = currentRow.querySelector('td, th');
            (firstCell as HTMLElement)?.focus();
          }
        }
        break;

      case 'End':
        e.preventDefault();
        if (e.ctrlKey) {
          (cells[cells.length - 1] as HTMLElement).focus(); // Последняя ячейка
        } else {
          // Последняя ячейка текущей строки
          const currentRow = focusedElement?.closest('tr');
          if (currentRow) {
            const rowCells = Array.from(currentRow.querySelectorAll('td, th'));
            (rowCells[rowCells.length - 1] as HTMLElement)?.focus();
          }
        }
        break;
    }
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

  // Автофокус на кнопке retry при ошибке
  useEffect(() => {
    if (error && retryButtonRef.current) {
      retryButtonRef.current.focus();
    }
  }, [error]);

  useEffect(() => {
    loadTableData();
  }, [fileName, basePath]);

  if (isLoading) {
    return <LoadingSpinner text={`Loading data from ${basePath}/${fileName}...`} centered />;
  }

  if (error) {
    return (
      <div className={styles.detailError} role="alert" aria-live="polite">
        <p>
          <strong>Error loading data:</strong> {error}
        </p>
        <p className={styles.errorDetails}>
          File: {basePath}/{fileName}
        </p>
        <button
          ref={retryButtonRef}
          onClick={loadTableData}
          className={styles.retryButton}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              e.stopPropagation(); // Предотвращаем закрытие родительской таблицы
            }
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!tableData || tableData.sections.length === 0) {
    return (
      <div className={styles.detailNoData} role="status" aria-live="polite">
        No data available to display
      </div>
    );
  }

  return (
    <div className={styles.detailContainer} role="region" aria-label="Detailed data table">
      {tableData.sections.map((section, sectionIndex) => (
        <div key={section.sectionName || sectionIndex} className={styles.detailSection}>
          {tableData.isNested && (
            <h3
              className={styles.sectionTitle}
              tabIndex={0} // Делаем заголовок фокусируемым
            >
              {section.sectionName}
            </h3>
          )}
          <div className={styles.detailTableWrapper}>
            <table
              ref={tableRef}
              className={styles.detailTable}
              onKeyDown={handleTableKeyDown}
              role="grid"
              aria-label={
                tableData.isNested ? `Parameters for ${section.sectionName}` : 'Data parameters'
              }
            >
              <thead>
                <tr role="row">
                  <th
                    className={styles.detailParameterCell}
                    scope="col"
                    role="columnheader"
                    tabIndex={0}
                  >
                    Parameter
                  </th>
                  <th
                    className={styles.detailValueCell}
                    scope="col"
                    role="columnheader"
                    tabIndex={0}
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {section.parameters.map((param, paramIndex) => (
                  <tr
                    key={`${param.parameter}-${paramIndex}`}
                    className={paramIndex % 2 === 0 ? styles.evenRow : styles.oddRow}
                    role="row"
                  >
                    <td className={styles.detailParameterCell} role="gridcell" tabIndex={0}>
                      {param.parameter}
                    </td>
                    <td className={styles.detailValueCell} role="gridcell" tabIndex={0}>
                      {renderValue(param.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Скрытые инструкции для скринридеров */}
      <div className={styles.visuallyHidden} aria-live="polite">
        Use arrow keys to navigate through table cells. Ctrl+Home to go to first cell, Ctrl+End to
        go to last cell.
      </div>
    </div>
  );
};

export default DetailTable;
