import { PaginationParams, SearchParams } from '../types/api';

// Validation utilities
export const validatePagination = (params: any): PaginationParams => {
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  
  return {
    page: Math.max(1, page),
    limit: Math.min(Math.max(1, limit), 50) // Max 50 items per page
  };
};

export const validateSearch = (params: any): SearchParams => {
  const pagination = validatePagination(params);
  const query = typeof params.query === 'string' ? params.query.trim() : undefined;
  
  return {
    ...pagination,
    query: query && query.length > 0 ? query : undefined
  };
};

export const validateCharacterId = (id: string): boolean => {
  return /^\d+$/.test(id);
};

export const sanitizeString = (str: string): string => {
  return str.replace(/[<>]/g, '').trim();
};