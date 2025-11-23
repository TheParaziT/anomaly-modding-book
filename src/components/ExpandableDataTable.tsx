// ExpandableDataTable.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import DetailTable from './DetailTable';
import type { ExpandableDataTableProps, DataItem } from '../types';
import styles from './ExpandableDataTable.module.css';

/**
 * Расширяемая таблица данных с поддержкой категорий, превью и детальной информацией
 * с полной клавиатурной навигацией
 */
const ExpandableDataTable: React.FC<ExpandableDataTableProps> = ({
  items,
  basePath = '/data/tables',
  defaultColumns = { showCategory: false, showPreview: false },
}) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(0);
  const tableRef = useRef<HTMLTableElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const { hasCategory, hasPreview } = useMemo(() => {
    const categoryExists = items.some(item => item.category || item.columns?.showCategory);
    const previewExists = items.some(item => item.preview || item.columns?.showPreview);

    return {
      hasCategory: defaultColumns.showCategory || categoryExists,
      hasPreview: defaultColumns.showPreview || previewExists,
    };
  }, [items, defaultColumns]);

  const columnCount = useMemo(() => {
    let count = 3; // Name, Description, Expand icon
    if (hasCategory) count++;
    if (hasPreview) count++;
    return count;
  }, [hasCategory, hasPreview]);

  /**
   * Обработчик клавиатурной навигации
   */
  const handleKeyDown = (e: React.KeyboardEvent, itemId: string, index: number) => {
    const totalRows = items.length;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleRow(itemId);
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (index < totalRows - 1) {
          setFocusedRowIndex(index + 1);
          rowRefs.current[index + 1]?.focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (index > 0) {
          setFocusedRowIndex(index - 1);
          rowRefs.current[index - 1]?.focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        setFocusedRowIndex(0);
        rowRefs.current[0]?.focus();
        break;

      case 'End':
        e.preventDefault();
        setFocusedRowIndex(totalRows - 1);
        rowRefs.current[totalRows - 1]?.focus();
        break;

      case 'Escape':
        if (expandedRow) {
          setExpandedRow(null);
          // Возвращаем фокус на развернутую строку
          const expandedIndex = items.findIndex(item => item.id === expandedRow);
          if (expandedIndex !== -1) {
            rowRefs.current[expandedIndex]?.focus();
          }
        }
        break;

      case 'Tab':
        // Разрешаем стандартное поведение Tab для навигации между элементами
        if (!expandedRow) break;

        // Если строка развернута и пользователь Tab'ом уходит из таблицы,
        // предотвращаем закрытие деталей
        if (e.shiftKey && focusedRowIndex === 0) {
          // Если Shift+Tab на первой строке - разрешаем уход
          break;
        }
        if (!e.shiftKey && focusedRowIndex === totalRows - 1) {
          // Если Tab на последней строке - разрешаем уход
          break;
        }
        // В других случаях Tab будет циклически перемещаться по строкам
        e.preventDefault();
        const nextIndex = e.shiftKey
          ? focusedRowIndex > 0
            ? focusedRowIndex - 1
            : totalRows - 1
          : focusedRowIndex < totalRows - 1
            ? focusedRowIndex + 1
            : 0;

        setFocusedRowIndex(nextIndex);
        rowRefs.current[nextIndex]?.focus();
        break;
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(prev => (prev === id ? null : id));
  };

  // Сброс refs при изменении items
  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, items.length);
  }, [items]);

  // Автофокус на первую строку при монтировании
  useEffect(() => {
    if (items.length > 0 && rowRefs.current[0]) {
      rowRefs.current[0]?.focus();
    }
  }, []);

  if (!items || items.length === 0) {
    return <div className={styles.emptyState}>No data items available.</div>;
  }

  return (
    <div className={styles.dataTableContainer} role="grid" aria-label="Expandable data table">
      <table ref={tableRef} className={styles.dataTable} role="presentation">
        <thead>
          <tr>
            <th className={styles.headerCell} scope="col">
              Name
            </th>
            <th className={styles.headerCell} scope="col">
              Description
            </th>
            {hasCategory && (
              <th className={styles.headerCell} scope="col">
                Category
              </th>
            )}
            {hasPreview && (
              <th className={styles.headerCell} scope="col">
                Preview
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const isExpanded = expandedRow === item.id;
            const showCategory = hasCategory && item.category;
            const showPreview = hasPreview && item.preview;

            return (
              <React.Fragment key={item.id}>
                <tr
                  ref={el => (rowRefs.current[index] = el)}
                  className={`${styles.dataTableRow} ${isExpanded ? styles.expandedRow : ''} ${focusedRowIndex === index ? styles.focusedRow : ''}`}
                  onClick={() => toggleRow(item.id)}
                  onKeyDown={e => handleKeyDown(e, item.id, index)}
                  tabIndex={0}
                  role="row"
                  aria-expanded={isExpanded}
                  aria-label={`${item.title} ${item.description}`}
                >
                  <td className={styles.dataTitleCell} role="gridcell">
                    <div className={styles.titleWrapper}>
                      <span
                        className={`${styles.expandIcon} ${isExpanded ? styles.rotated : ''}`}
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                      {item.title}
                    </div>
                  </td>
                  <td className={styles.dataDescriptionCell} role="gridcell">
                    {item.description}
                  </td>
                  {showCategory && (
                    <td className={styles.dataCategoryCell} role="gridcell">
                      <span className={styles.categoryBadge}>{item.category}</span>
                    </td>
                  )}
                  {showPreview && (
                    <td className={styles.dataPreviewCell} role="gridcell">
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
                  <tr className={styles.detailRowVisible} role="row">
                    <td colSpan={columnCount} className={styles.detailCell} role="gridcell">
                      <div
                        className={styles.detailContent}
                        // Предотвращаем всплытие событий клавиатуры из детальной таблицы
                        onKeyDown={e => e.stopPropagation()}
                      >
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
