# Star Wars Character Explorer

A full-stack web application that provides an intuitive interface to explore characters from the Star Wars universe. Built with React frontend and Node.js backend, consuming data from the Star Wars API (SWAPI).

## 🌟 Features

- **Character Browsing**: Paginated grid view of Star Wars characters
- **Character Details**: Comprehensive information including films, homeworld, and species
- **Comprehensive Search**: Search across all characters from all pages with enhanced matching
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Caching**: Intelligent caching for improved performance
- **Error Handling**: Graceful error handling with retry mechanisms

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router for navigation
- **Styling**: CSS Modules with Star Wars theme
- **State Management**: React hooks and context
- **HTTP Client**: Axios for API communication
- **Testing**: Vitest with React Testing Library

### Backend (Node.js + TypeScript)
- **Framework**: Express.js with TypeScript
- **API Integration**: SWAPI (Star Wars API) client
- **Caching**: In-memory cache with TTL
- **Error Handling**: Structured error responses
- **Testing**: Jest with Supertest

### API Endpoints

#### Characters
- `GET /api/characters` - Get paginated list of characters
  - Query params: `page`, `limit`, `query` (search)
- `GET /api/characters/:id` - Get character details with related data
- `GET /api/characters/search` - Search characters by name
- `POST /api/characters/cache/clear` - Clear character cache (admin/debug)

#### Health Check
- `GET /health` - API health status

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd star-wars-character-explorer
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Backend
   cd ../backend
   cp .env.example .env
   
   # Frontend
   cd ../frontend
   cp .env.example .env
   ```

5. **Start the development servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
star-wars-character-explorer/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Utility functions
│   ├── tests/               # Backend tests
│   └── package.json
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client
│   │   ├── types/           # TypeScript interfaces
│   │   └── test/            # Test utilities
│   └── package.json
└── README.md
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:coverage      # Run with coverage
```

### Frontend Tests
```bash
cd frontend
npm test                   # Run all tests
npm run test:ui           # Run with UI
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev               # Start with hot reload
npm run build            # Build for production
npm run lint             # Run ESLint
```

### Frontend Development
```bash
cd frontend
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
```

## 📊 Performance Features

### Caching Strategy
- **Backend**: In-memory cache with configurable TTL
- **Frontend**: React Query for client-side caching
- **API**: Response caching headers

### Optimization
- **Lazy Loading**: Images and components
- **Debounced Search**: Reduces API calls
- **Pagination**: Efficient data loading
- **Error Boundaries**: Graceful error handling

## 🎨 UI/UX Features

### Design System
- **Theme**: Star Wars inspired color scheme
- **Typography**: Clean, readable fonts
- **Layout**: Responsive grid system
- **Animations**: Smooth transitions and hover effects

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels
- **Color Contrast**: WCAG compliant colors
- **Focus Management**: Clear focus indicators

## 🔒 Security

- **Input Validation**: Server-side validation
- **CORS**: Configured for specific origins
- **Rate Limiting**: API endpoint protection
- **XSS Protection**: Input sanitization

## 📈 Monitoring

### Logging
- **Request Logging**: All API requests logged
- **Error Logging**: Structured error information
- **Cache Statistics**: Cache hit/miss tracking

### Health Checks
- **API Health**: `/health` endpoint
- **Database Status**: Connection monitoring
- **External API**: SWAPI availability

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### Environment Variables

**Backend (.env)**
```env
PORT=3001
NODE_ENV=production
SWAPI_BASE_URL=https://swapi.tech/api
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-api-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SWAPI](https://swapi.tech/) - The Star Wars API
- [Star Wars Visual Guide](https://starwars-visualguide.com/) - Character images
- React and Node.js communities for excellent documentation

## 📞 Support

If you have any questions or issues, please:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**May the Force be with you!** ⭐