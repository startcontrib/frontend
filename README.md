# GitHub Repository Analyzer Frontend

A React application that provides a user-friendly interface for exploring and analyzing GitHub repositories using AI-powered insights.

## Features

- Search for GitHub repositories by keywords
- View detailed repository information including:
  - Languages used
  - Open issues and pull requests
  - Discussion topics
  - Dependencies
- AI-powered summaries of repositories
- Interactive analysis of repository issues, PRs, and discussions
- Error analysis tool to help understand error messages in the context of the repository

## Technologies

- React 19
- React Router v7
- Axios for API requests
- React Markdown for rendering README content
- Vite for fast development and optimized builds

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- Backend API service running (see the backend README for setup)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```
   Adjust the URL if your backend is running on a different port.

### Development

Run the development server:
```
npm run dev
```

This will start the application on http://localhost:5173 (default Vite port).

### Building for Production

Build the application for production:
```
npm run build
```

Preview the production build:
```
npm run preview
```

## Application Structure

- `src/`: Source code
  - `components/`: Reusable UI components
  - `pages/`: Main application pages
    - `SearchPage.jsx`: Repository search interface
    - `AnalysisPage.jsx`: Detailed repository analysis
  - `services/`: API client and services
  - `styles/`: CSS stylesheets
  - `assets/`: Static resources
  - `App.jsx`: Main application component

## Key Components

- **SearchBar**: Allows users to search for repositories
- **ResultsList**: Displays search results
- **AnalysisPage**: Main page for detailed repository analysis
- **OverallSummary**: Displays AI-generated repository overview
- **IssuesList/PullsList/DiscussionsList**: Interactive components to view repository activity
- **ErrorAnalyzer**: Tool to analyze error messages in the context of the repository

## API Integration

The application communicates with the backend API using the `apiClient.js` service, which provides functions for:
- Searching repositories
- Fetching repository analysis data
- Generating AI summaries
- Analyzing specific items (issues, PRs)
- Processing error messages

## UI Features

- Responsive design for mobile and desktop
- Loading states with spinners
- Error handling with user-friendly messages
- Tabbed interface for repository activity
- Markdown rendering for repository content
