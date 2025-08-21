# Technical Documentation

## Architecture Overview

The Star Wars Character Explorer follows a modern three-tier architecture:

1. **Presentation Layer**: React frontend with TypeScript
2. **Business Logic Layer**: Node.js Express API
3. **Data Layer**: SWAPI (Star Wars API) integration

## Technology Stack

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **CSS Modules**: Scoped styling with Star Wars theme
- **Vitest**: Modern testing framework
- **React Testing Library**: Component testing utilities

### Backend Stack
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **TypeScript**: Type safety for backend code
- **Axios**: HTTP client for SWAPI integration
- **Jest**: Testing framework
- **Supertest**: HTTP assertion library
- **ESLint**: Code linting and formatting

## API Design

### RESTful Endpoints

#### Character Endpoints
```typescript
GET /api/characters
Query Parameters:
- page?: number (default: 1)
- limit?: number (default: 10, max: 50)
- query?: string (search by name)

Response:
{
  success: boolean;
  data: {
    data: Character[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  timestamp: string;
}
```

```typescript
GET /api/characters/:id
Response:
{
  success: boolean;
  data: Character;
  timestamp: string;
}
```

### Data Models

#### Character Model
```typescript
interface Character {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld?: Planet;
  films: Film[];
  species: Species[];
  image_url?: string;
  created: string;
  edited: string;
}
```

#### Related Models
```typescript
interface Planet {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  population: string;
  diameter: string;
  gravity: string;
}

interface Film {
  id: string;
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
}

interface Species {
  id: string;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  language: string;
  homeworld?: string;
}
```

## Component Architecture

### Frontend Components

#### Core Components
1. **App**: Main application wrapper with routing
2. **Navigation**: Header navigation with branding
3. **CharacterList**: Paginated character grid with search
4. **CharacterCard**: Individual character preview card
5. **CharacterDetail**: Comprehensive character information
6. **SearchBar**: Real-time search with debouncing

#### Utility Components
1. **LoadingSpinner**: Configurable loading indicator
2. **ErrorMessage**: Error display with retry functionality
3. **Pagination**: Navigation controls for paginated data

### Component Props and State

#### CharacterList Component
```typescript
interface CharacterListState {
  characters: Partial<Character>[];
  initialLoading: boolean;
  pageLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  pagination: PaginationInfo;
}
```

#### SearchBar Component
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceMs?: number;
}
```

## Data Flow

### Frontend Data Flow
1. **User Interaction**: User navigates or searches
2. **State Update**: React state updated via hooks
3. **API Call**: Axios request to backend API
4. **Response Processing**: Data transformed and cached
5. **UI Update**: Components re-render with new data

### Backend Data Flow
1. **Request Reception**: Express receives HTTP request
2. **Validation**: Input validation and sanitization
3. **Cache Check**: Check in-memory cache for data
4. **SWAPI Integration**: Fetch data from external API if needed
5. **Data Transformation**: Convert SWAPI format to our format
6. **Response**: Send structured JSON response

## Caching Strategy

### Backend Caching
```typescript
class InMemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL: number;

  // Cache with TTL
  set<T>(key: string, data: T, ttl?: number): void;
  get<T>(key: string): T | null;
  
  // Automatic cleanup
  private cleanup(): void;
}
```

#### Cache Configuration
- **Character List**: 30 minutes TTL
- **Character Details**: 1 hour TTL
- **Related Data**: 2 hours TTL

### Frontend Caching
- **Component State**: React state for current view
- **Browser Cache**: HTTP cache headers respected
- **Search Results**: Temporary caching during session

## Error Handling

### Backend Error Handling
```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Error Response Format
{
  success: false;
  error: ApiError;
  timestamp: string;
}
```

#### Error Types
- `INVALID_ID`: Invalid character ID format
- `CHARACTER_NOT_FOUND`: Character doesn't exist
- `MISSING_QUERY`: Search query required
- `SWAPI_ERROR`: External API error
- `INTERNAL_SERVER_ERROR`: Unexpected server error

### Frontend Error Handling
1. **Network Errors**: Display user-friendly messages
2. **API Errors**: Show specific error information
3. **Loading States**: Prevent user confusion
4. **Retry Mechanisms**: Allow users to retry failed operations

## Performance Optimizations

### Backend Optimizations
1. **Caching**: Reduce SWAPI API calls
2. **Parallel Requests**: Fetch related data concurrently
3. **Request Validation**: Early validation to prevent unnecessary processing
4. **Response Compression**: Gzip compression for responses

### Frontend Optimizations
1. **Lazy Loading**: Images loaded on demand
2. **Debounced Search**: Reduce API calls during typing
3. **Pagination**: Load data in chunks
4. **Component Memoization**: Prevent unnecessary re-renders

## Security Considerations

### Backend Security
1. **Input Validation**: All inputs validated and sanitized
2. **CORS Configuration**: Specific origin allowlist
3. **Rate Limiting**: Prevent API abuse
4. **Error Information**: Limited error details in production

### Frontend Security
1. **XSS Prevention**: Proper input escaping
2. **HTTPS Enforcement**: Secure communication
3. **Content Security Policy**: Prevent code injection
4. **Input Sanitization**: Clean user inputs

## Testing Strategy

### Backend Testing
```typescript
// Unit Tests
describe('CharacterController', () => {
  it('should return paginated characters', async () => {
    // Test implementation
  });
});

// Integration Tests
describe('SWAPI Integration', () => {
  it('should fetch character data from SWAPI', async () => {
    // Test implementation
  });
});
```

### Frontend Testing
```typescript
// Component Tests
describe('CharacterCard', () => {
  it('renders character information correctly', () => {
    // Test implementation
  });
});

// User Interaction Tests
describe('SearchBar', () => {
  it('calls onSearch when user types', async () => {
    // Test implementation
  });
});
```

## Deployment Architecture

### Development Environment
```
Frontend (Vite Dev Server) :5173
Backend (ts-node-dev) :3001
SWAPI (External API) :443
```

### Production Environment
```
Frontend (Static Files) → CDN
Backend (Node.js) → Load Balancer
Cache (Redis/Memory) → Backend
SWAPI (External) → Backend
```

## Monitoring and Logging

### Backend Logging
```typescript
// Request Logging
console.log(`📥 ${req.method} ${req.originalUrl} - ${req.ip}`);

// Response Logging
console.log(`📤 ${statusCode} ${req.method} ${req.originalUrl} - ${duration}ms`);

// Error Logging
console.error('Error:', err);
```

### Cache Monitoring
```typescript
// Cache Operations
console.log(`💾 Cache SET: ${key} (TTL: ${ttl}ms)`);
console.log(`✅ Cache HIT: ${key}`);
console.log(`❌ Cache MISS: ${key}`);
```

## Configuration Management

### Environment Variables
```typescript
// Backend Configuration
interface Config {
  PORT: number;
  NODE_ENV: string;
  SWAPI_BASE_URL: string;
  FRONTEND_URL: string;
}

// Frontend Configuration
interface FrontendConfig {
  VITE_API_URL: string;
}
```

## API Rate Limiting

### SWAPI Rate Limits
- No official rate limits documented
- Implemented client-side throttling
- Caching to reduce external API calls

### Internal Rate Limiting
```typescript
// Future implementation
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

## Future Enhancements

### Planned Features
1. **User Authentication**: User accounts and favorites
2. **Advanced Search**: Filter by species, films, etc.
3. **Offline Support**: Service worker for offline access
4. **Real-time Updates**: WebSocket for live data
5. **Analytics**: User behavior tracking

### Technical Improvements
1. **Database Integration**: Replace SWAPI with local database
2. **GraphQL API**: More efficient data fetching
3. **Microservices**: Split into smaller services
4. **Container Deployment**: Docker containerization
5. **CI/CD Pipeline**: Automated testing and deployment

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check frontend URL in backend config
2. **API Timeouts**: SWAPI may be slow or unavailable
3. **Cache Issues**: Clear cache or restart backend
4. **Build Errors**: Check TypeScript types and dependencies

### Debug Mode
```bash
# Backend Debug
DEBUG=* npm run dev

# Frontend Debug
npm run dev -- --debug
```