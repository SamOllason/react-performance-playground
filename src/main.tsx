import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// StrictMode removed to prevent double-rendering in development
// which would flood the console with duplicate logs
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
