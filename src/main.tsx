
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create the root element and render the App
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<App />);
