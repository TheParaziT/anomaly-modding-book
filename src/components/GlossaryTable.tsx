// GlossaryTable.tsx
import React, { useState, useMemo } from 'react';
import type { GlossaryTerm, GlossaryData, GlossaryTableProps, SortConfig } from '../types';
import styles from './GlossaryTable.module.css';

/**
 * Интерактивная таблица глоссария с поиском, фильтрацией и сортировкой
 * 
 * @component
 * @example
 * ```tsx
 * <GlossaryTable data={glossaryData} />
 * ```
 * 
 * @param {GlossaryTableProps} props - Свойства компонента
 * @param {GlossaryData} props.data - Данные глоссария
 * 
 * @returns {JSX.Element} Таблица глоссария
 */
const GlossaryTable: React.FC<GlossaryTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig<GlossaryTerm>>({
    key: 'term',
    direction: 'asc',
  });

  const filteredAndSortedTerms = useMemo(() => {
    let filtered = data.terms;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.term.toLowerCase().includes(searchLower) ||
          item.definition.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data.terms, searchTerm, selectedCategory, sortConfig]);

  const handleSort = (key: keyof GlossaryTerm) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return (
    <div className={styles.glossaryContainer}>
      <div className={styles.glossaryControls}>
        <input
          type="text"
          placeholder="Search terms..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className={styles.categoryFilter}
        >
          <option value="all">All Categories</option>
          {data.categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.glossaryStats}>
        Showing {filteredAndSortedTerms.length} of {data.terms.length} terms
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.glossaryTable}>
          <thead>
            <tr>
              <th
                onClick={() => handleSort('term')}
                className={`${styles.sortableHeader} ${sortConfig.key === 'term' ? styles[sortConfig.direction] : ''}`}
              >
                Term
                <span className={styles.sortIndicator}></span>
              </th>
              <th>Definition</th>
              <th
                onClick={() => handleSort('category')}
                className={`${styles.sortableHeader} ${sortConfig.key === 'category' ? styles[sortConfig.direction] : ''}`}
              >
                Category
                <span className={styles.sortIndicator}></span>
              </th>
              <th className={styles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTerms.map(item => (
              <tr key={item.id} id={item.id} className={styles.tableRow}>
                <td className={styles.termCell}>
                  <a href={`#${item.id}`} className={styles.termLink}>
                    {item.term}
                  </a>
                </td>
                <td className={styles.definitionCell}>{item.definition}</td>
                <td className={styles.categoryCell}>
                  {item.category && <span className={styles.categoryTag}>{item.category}</span>}
                </td>
                <td className={styles.actionsCell}>
                  <button
                    onClick={() => handleCopyLink(item.id)}
                    className={styles.copyButton}
                    title="Copy link to this term"
                  >
                    🔗
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedTerms.length === 0 && (
          <div className={styles.emptyState}>No terms found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default GlossaryTable;