import React, { useState, useMemo } from 'react';
import DetailTable from './DetailTable';
import type { ExpandableDataTableProps, DataItem } from '../types';
import styles from './ExpandableDataTable.module.css';

const ExpandableDataTable: React.FC<ExpandableDataTableProps> = ({
  items,
  basePath = '/data/tables',
  defaultColumns = { showCategory: false, showPreview: false },
}) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Вычисляем hasCategory и hasPreview отдельно
  const { hasCategory, hasPreview } = useMemo(() => {
    const categoryExists = items.some(item => item.category || item.columns?.showCategory);
    const previewExists = items.some(item => item.preview || item.columns?.showPreview);

    return {
      hasCategory: defaultColumns.showCategory || categoryExists,
      hasPreview: defaultColumns.showPreview || previewExists,
    };
  }, [items, defaultColumns]);

  // Вычисляем columnCount отдельно, после hasCategory и hasPreview
  const columnCount = useMemo(() => {
    let count = 3; // Name, Description, Expand icon
    if (hasCategory) count++;
    if (hasPreview) count++;
    return count;
  }, [hasCategory, hasPreview]);

  const toggleRow = (id: string) => {
    setExpandedRow(prev => (prev === id ? null : id));
  };

  if (!items || items.length === 0) {
    return <div className={styles.emptyState}>No data items available.</div>;
  }

  return (
    <div className={styles.dataTableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Name</th>
            <th className={styles.headerCell}>Description</th>
            {hasCategory && <th className={styles.headerCell}>Category</th>}
            {hasPreview && <th className={styles.headerCell}>Preview</th>}
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            const isExpanded = expandedRow === item.id;
            const showCategory = hasCategory && item.category;
            const showPreview = hasPreview && item.preview;

            return (
              <React.Fragment key={item.id}>
                <tr
                  className={`${styles.dataTableRow} ${isExpanded ? styles.expandedRow : ''}`}
                  onClick={() => toggleRow(item.id)}
                >
                  <td className={styles.dataTitleCell}>
                    <div className={styles.titleWrapper}>
                      <span className={`${styles.expandIcon} ${isExpanded ? styles.rotated : ''}`}>
                        ▼
                      </span>
                      {item.title}
                    </div>
                  </td>
                  <td className={styles.dataDescriptionCell}>{item.description}</td>
                  {showCategory && (
                    <td className={styles.dataCategoryCell}>
                      <span className={styles.categoryBadge}>{item.category}</span>
                    </td>
                  )}
                  {showPreview && (
                    <td className={styles.dataPreviewCell}>
                      <img
                        src={item.preview}
                        alt={`Preview for ${item.title}`}
                        className={styles.dataPreviewImage}
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </td>
                  )}
                </tr>
                {isExpanded && (
                  <tr className={styles.detailRowVisible}>
                    <td colSpan={columnCount} className={styles.detailCell}>
                      <div className={styles.detailContent}>
                        <DetailTable fileName={item.fileName} basePath={basePath} />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpandableDataTable;
