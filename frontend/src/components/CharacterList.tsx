import React, { useState, useEffect, useCallback } from 'react';
import type { Character, PaginatedResponse, SearchParams } from '../types/api';
import { apiClient } from '../services/api';
import { CharacterCard } from './CharacterCard';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import './CharacterList.css';

export const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Partial<Character>[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  // Fetch characters
  const fetchCharacters = useCallback(async (params: SearchParams = {}, isPageChange = false) => {
    try {
      console.log('Fetching characters:', params, 'isPageChange:', isPageChange);
      
      // Set loading states more carefully
      if (characters.length === 0 && !params.query) {
        // First time loading (no search)
        setInitialLoading(true);
        setPageLoading(false);
        setSearchLoading(false);
      } else if (isPageChange) {
        // Page navigation
        setPageLoading(true);
        setInitialLoading(false);
        setSearchLoading(false);
      } else if (params.query && params.query.trim()) {
        // Search operation - use search loading instead of page loading
        setSearchLoading(true);
        setPageLoading(false);
        setInitialLoading(false);
      } else {
        // Regular navigation without search
        setPageLoading(false);
        setInitialLoading(false);
        setSearchLoading(false);
      }
      
      setError(null);
      
      const response: PaginatedResponse<Partial<Character>> = await apiClient.getCharacters({
        page: params.page,
        limit: 12,
        query: params.query
      });
      
      console.log('API Response:', response);
      
      // Small delay to prevent rapid state changes
      await new Promise(resolve => setTimeout(resolve, 50));
      
      setCharacters(response.data);
      setPagination(response.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch characters';
      setError(errorMessage);
      console.error('Error fetching characters:', err);
    } finally {
      setInitialLoading(false);
      setPageLoading(false);
      setSearchLoading(false);
    }
  }, [characters.length]); // Only depend on characters.length for loading state logic

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    // Don't call fetchCharacters here - let useEffect handle it
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Don't call fetchCharacters here - let useEffect handle it
  };

  // Handle retry
  const handleRetry = () => {
    fetchCharacters({ query: searchQuery, page: currentPage });
  };

  // Load characters when page or search changes
  useEffect(() => {
    const isPageChange = currentPage > 1;
    fetchCharacters({ query: searchQuery, page: currentPage }, isPageChange);
  }, [currentPage, searchQuery, fetchCharacters]); // fetchCharacters is now memoized

  // Initial loading state
  if (initialLoading && characters.length === 0) {
    return (
      <div className="character-list-container">
        <div className="character-list-header">
          <h1 className="page-title">Star Wars Characters</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <LoadingSpinner size="large" message="Loading characters from a galaxy far, far away..." />
      </div>
    );
  }

  // Error state
  if (error && characters.length === 0) {
    return (
      <div className="character-list-container">
        <div className="character-list-header">
          <h1 className="page-title">Star Wars Characters</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <ErrorMessage 
          message={error} 
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="character-list-container">
      <div className="character-list-header">
        <h1 className="page-title">Star Wars Characters</h1>
        <p className="page-subtitle">
          Explore the heroes, villains, and legends of the Star Wars universe
        </p>
        <SearchBar 
          onSearch={handleSearch} 
          initialValue={searchQuery}
        />
      </div>

      {/* Results info */}
      <div className="results-info">
        {searchQuery ? (
          <p>
            {searchLoading ? (
              <span className="search-loading">
                Searching for "{searchQuery}"...
              </span>
            ) : (
              <>
                Found {pagination.total} character{pagination.total !== 1 ? 's' : ''} 
                {searchQuery && ` matching "${searchQuery}"`}
                {pagination.total > 0 && (
                  <span className="page-range">
                    {' '}(showing {((pagination.page - 1) * pagination.limit) + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total})
                  </span>
                )}
              </>
            )}
          </p>
        ) : (
          <p>
            Showing {pagination.total > 0 ? `${((pagination.page - 1) * pagination.limit) + 1}-${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total}` : '0'} character{pagination.total !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Loading overlay for pagination */}
      {pageLoading && (
        <div className="loading-overlay">
          <LoadingSpinner size="medium" />
        </div>
      )}

      {/* Characters grid */}
      {characters.length > 0 ? (
        <>
          <div className="characters-grid">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                searchQuery={searchQuery}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            hasNext={pagination.hasNext}
            hasPrev={pagination.hasPrev}
          />
        </>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No characters found</h3>
          <p>
            {searchQuery 
              ? `No characters match "${searchQuery}". Try a different search term.`
              : 'No characters available at the moment.'
            }
          </p>
          {searchQuery && (
            <button 
              className="btn btn-primary"
              onClick={() => handleSearch('')}
            >
              Show All Characters
            </button>
          )}
        </div>
      )}
    </div>
  );
};