import React, { useState, useEffect } from 'react';
import styles from './table-styles.module.css';
import DetailTable from './DetailTable';

interface DataItem {
  id: string;
  fileName: string;
  title: string;
  description: string;
  category?: string;
  preview?: string;
}

interface ExpandableDataTableProps {
  items: DataItem[];
  basePath?: string;
  columns?: {
    showCategory?: boolean;
    showPreview?: boolean;
  };
}

const ExpandableDataTable: React.FC<ExpandableDataTableProps> = ({
  items,
  basePath = '/data/tables',
  columns = { showCategory: false, showPreview: false },
}) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [hasCategory, setHasCategory] = useState<boolean>(false);
  const [hasPreview, setHasPreview] = useState<boolean>(false);

  useEffect(() => {
    const categoryExists = items.some(item => item.category);
    const previewExists = items.some(item => item.preview);

    setHasCategory(columns.showCategory && categoryExists);
    setHasPreview(columns.showPreview && previewExists);
  }, [items, columns]);

  const toggleRow = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  const getColumnCount = () => {
    let count = 3;
    if (hasCategory) count++;
    if (hasPreview) count++;
    return count;
  };

  return (
    <div className={styles.dataTableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Name</th>
            <th className={styles.headerCell}>Description</th>
            {hasCategory && <th className={styles.headerCell}>Shader Type</th>}
            {hasPreview && <th className={styles.headerCell}>Preview</th>}
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <React.Fragment key={item.id}>
              <tr
                className={`${styles.dataTableRow} ${expandedRow === item.id ? styles.expandedRow : ''}`}
                onClick={() => toggleRow(item.id)}
              >
                <td className={styles.dataTitleCell}>
                  <div className={styles.titleWrapper}>
                    <span
                      className={`${styles.expandIcon} ${expandedRow === item.id ? styles.rotated : ''}`}
                    >
                      ▼
                    </span>
                    {item.title}
                  </div>
                </td>
                <td className={styles.dataDescriptionCell}>{item.description}</td>
                {hasCategory && (
                  <td className={styles.dataCategoryCell}>
                    {item.category && <span className={styles.categoryBadge}>{item.category}</span>}
                  </td>
                )}
                {hasPreview && (
                  <td className={styles.dataPreviewCell}>
                    {item.preview && (
                      <img
                        src={item.preview}
                        alt={`Preview for ${item.title}`}
                        className={styles.dataPreviewImage}
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    )}
                  </td>
                )}
              </tr>
              {expandedRow === item.id && (
                <tr className={styles.detailRowVisible}>
                  <td colSpan={getColumnCount()} className={styles.detailCell}>
                    <div className={styles.detailContent}>
                      <DetailTable fileName={item.fileName} basePath={basePath} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpandableDataTable;