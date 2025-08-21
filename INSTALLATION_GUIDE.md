# Installation Guide

This guide will walk you through setting up the Star Wars Character Explorer application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (version 18.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 500MB free space
- **Internet Connection**: Required for SWAPI integration

## Step-by-Step Installation

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/your-username/star-wars-character-explorer.git

# Or using SSH
git clone git@github.com:your-username/star-wars-character-explorer.git

# Navigate to the project directory
cd star-wars-character-explorer
```

### 2. Backend Setup

#### 2.1 Install Backend Dependencies
```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your preferred editor
# Windows
notepad .env

# macOS/Linux
nano .env
# or
vim .env
```

#### 2.3 Environment Configuration
Update the `.env` file with the following values:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# External API
SWAPI_BASE_URL=https://swapi.tech/api

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

#### 2.4 Verify Backend Installation
```bash
# Run tests to ensure everything is working
npm test

# Start the development server
npm run dev
```

You should see:
```
🚀 Server running on port 3001
📍 Environment: development
🔗 Health check: http://localhost:3001/health
```

#### 2.5 Test Backend API
Open your browser or use curl to test:
```bash
# Health check
curl http://localhost:3001/health

# Get characters
curl http://localhost:3001/api/characters
```

### 3. Frontend Setup

#### 3.1 Install Frontend Dependencies
```bash
# Open a new terminal window/tab
cd frontend
npm install
```

#### 3.2 Configure Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file
# Windows
notepad .env

# macOS/Linux
nano .env
```

#### 3.3 Environment Configuration
Update the `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api
```

#### 3.4 Verify Frontend Installation
```bash
# Run tests
npm test

# Start the development server
npm run dev
```

You should see:
```
VITE v7.1.3  ready in 1949 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Verify Complete Installation

#### 4.1 Access the Application
1. Open your web browser
2. Navigate to `http://localhost:5173`
3. You should see the Star Wars Character Explorer homepage

#### 4.2 Test Core Functionality
1. **Character List**: Verify characters are loading
2. **Search**: Try searching for "Luke" or "Vader"
3. **Pagination**: Navigate through different pages
4. **Character Details**: Click on a character card
5. **Navigation**: Use the back button and navigation links

## Alternative Installation Methods

### Using Yarn Instead of npm

If you prefer yarn over npm:

```bash
# Backend
cd backend
yarn install
yarn dev

# Frontend
cd frontend
yarn install
yarn dev
```

### Using Docker (Optional)

If you have Docker installed, you can run the application in containers:

#### Backend Docker Setup
```bash
cd backend

# Create Dockerfile
cat > Dockerfile << EOF
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
EOF

# Build and run
docker build -t star-wars-backend .
docker run -p 3001:3001 --env-file .env star-wars-backend
```

#### Frontend Docker Setup
```bash
cd frontend

# Create Dockerfile
cat > Dockerfile << EOF
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Build and run
docker build -t star-wars-frontend .
docker run -p 5173:80 star-wars-frontend
```

## Development Workflow

### Starting Development Servers

You'll need two terminal windows/tabs:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Making Changes

#### Backend Changes
- Edit files in `backend/src/`
- Server automatically restarts (hot reload)
- Check terminal for any errors

#### Frontend Changes
- Edit files in `frontend/src/`
- Browser automatically refreshes (hot reload)
- Check browser console for any errors

### Running Tests

#### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run with coverage report
```

#### Frontend Tests
```bash
cd frontend
npm test                   # Run all tests
npm run test:ui           # Run with UI interface
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3001`

**Solution**:
```bash
# Find process using the port
# Windows
netstat -ano | findstr :3001

# macOS/Linux
lsof -i :3001

# Kill the process (replace PID with actual process ID)
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

#### 2. Node Version Issues
**Error**: `The engine "node" is incompatible with this module`

**Solution**:
```bash
# Check your Node.js version
node --version

# Update Node.js to version 18 or higher
# Visit https://nodejs.org/ to download the latest version
```

#### 3. npm Install Failures
**Error**: Various npm install errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

#### 4. CORS Errors
**Error**: `Access to fetch at 'http://localhost:3001/api/characters' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution**:
1. Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
2. Restart the backend server after changing environment variables

#### 5. API Connection Issues
**Error**: Network errors when fetching data

**Solution**:
1. Verify backend is running on port 3001
2. Check `VITE_API_URL` in frontend `.env`
3. Test backend API directly: `curl http://localhost:3001/health`

#### 6. TypeScript Errors
**Error**: Various TypeScript compilation errors

**Solution**:
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Getting Help

If you encounter issues not covered here:

1. **Check the logs**: Look at terminal output for error messages
2. **Browser DevTools**: Check console for frontend errors
3. **Network Tab**: Verify API requests are being made
4. **GitHub Issues**: Search existing issues or create a new one
5. **Documentation**: Review the technical documentation

## Performance Tips

### Development Performance
1. **Use SSD**: Install on SSD for faster file operations
2. **Close Unused Apps**: Free up RAM for development tools
3. **Use Latest Node.js**: Newer versions have performance improvements

### Build Performance
```bash
# Backend - Production build
cd backend
npm run build
npm start

# Frontend - Production build
cd frontend
npm run build
npm run preview
```

## Next Steps

After successful installation:

1. **Explore the Code**: Familiarize yourself with the project structure
2. **Run Tests**: Ensure all tests pass
3. **Make Changes**: Try modifying components or adding features
4. **Read Documentation**: Review technical documentation for architecture details
5. **Contribute**: Consider contributing to the project

## Environment Verification Checklist

Use this checklist to verify your installation:

- [ ] Node.js 18+ installed
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] Backend `.env` file configured
- [ ] Frontend `.env` file configured
- [ ] Backend server starts without errors (`npm run dev`)
- [ ] Frontend server starts without errors (`npm run dev`)
- [ ] Backend health check responds (`http://localhost:3001/health`)
- [ ] Frontend loads in browser (`http://localhost:5173`)
- [ ] Characters load on homepage
- [ ] Search functionality works
- [ ] Character detail pages load
- [ ] All tests pass (both backend and frontend)

## Support

If you need additional help:

- **Documentation**: Check `TECHNICAL_DOCUMENTATION.md`
- **Issues**: Create an issue on GitHub
- **Email**: Contact the development team
- **Community**: Join our Discord/Slack channel

---

**Happy coding! May the Force be with you!** ⭐