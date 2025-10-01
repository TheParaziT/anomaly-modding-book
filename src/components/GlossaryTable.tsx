import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import type { GlossaryTerm, GlossaryData, GlossaryTableProps, SortConfig } from '../types';

const GlossaryTable: React.FC<GlossaryTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig<GlossaryTerm>>({
    key: 'term',
    direction: 'asc',
  });

  // Filter and sort terms
  const filteredAndSortedTerms = useMemo(() => {
    let filtered = data.terms;

    // Filter by search query
    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Sorting
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
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    // Optional: show a toast/notification on successful copy
  };

  return (
    <div className="glossary-container">
      <div className="glossary-controls">
        <input
          type="text"
          placeholder="Search terms..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="glossary-search"
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="glossary-filter"
        >
          <option value="all">All Categories</option>
          {data.categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="glossary-stats">
        Showing {filteredAndSortedTerms.length} of {data.terms.length} terms
      </div>

      <div className="glossary-table-container">
        <table className="glossary-table">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('term')}
                className={clsx(
                  'sortable',
                  sortConfig.key === 'term' && `sort-${sortConfig.direction}`
                )}
              >
                Term
                <span className="sort-indicator"></span>
              </th>
              <th>Definition</th>
              <th
                onClick={() => handleSort('category')}
                className={clsx(
                  'sortable',
                  sortConfig.key === 'category' && `sort-${sortConfig.direction}`
                )}
              >
                Category
                <span className="sort-indicator"></span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTerms.map(item => (
              <tr key={item.id} id={item.id}>
                <td className="glossary-term">
                  <a href={`#${item.id}`} className="term-anchor">
                    {item.term}
                  </a>
                </td>
                <td className="glossary-definition">{item.definition}</td>
                <td className="glossary-category">{item.category}</td>
                <td className="glossary-actions">
                  <button
                    onClick={() => handleCopyLink(item.id)}
                    className="copy-link-button"
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
          <div className="glossary-empty">No terms found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default GlossaryTable;
