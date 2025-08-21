import React, { useState, useEffect, useCallback } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search characters...",
  initialValue = "",
  debounceMs = 300
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      setIsSearching(false);
      setShowSpinner(false);
      onSearch(searchQuery);
    }, debounceMs),
    [onSearch, debounceMs]
  );

  // Delayed spinner function to prevent blinking
  const delayedSpinner = useCallback(
    debounce(() => {
      if (isSearching) {
        setShowSpinner(true);
      }
    }, 200), // Increased delay to 200ms to prevent blinking
    [isSearching]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      setIsSearching(true);
      setShowSpinner(false); // Reset spinner immediately
      delayedSpinner(); // Start delayed spinner
    } else {
      // Clear search immediately without spinner
      setIsSearching(false);
      setShowSpinner(false);
    }
    
    debouncedSearch(value);
  };

  // Handle clear search
  const handleClear = () => {
    setQuery('');
    setIsSearching(false);
    setShowSpinner(false);
    onSearch('');
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  // Update query when initialValue changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <div className="search-icon">
          {showSpinner ? (
            <div className="search-spinner"></div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          )}
        </div>
        
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Search characters"
        />
        
        {query && (
          <button
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      
      {query && (
        <div className="search-info">
          Searching for "{query}"
        </div>
      )}
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}