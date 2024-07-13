/**
 * @file This is the entry point for the React application.
 */

// Imports
import React from "react";
import { createRoot } from "react-dom/client";

// Components
import { App } from "./app.jsx";

// Styles
import "./styles/root.scss";

/**
 * Get the root DOM node where the React application will be mounted.
 * @type {HTMLElement}
 */
const container = document.getElementById("root");

/**
 * Create a root React fiber. This is the starting point for the React rendering process.
 * @type {ReactRoot}
 */
const root = createRoot(container);

/**
 * Render the React application.
 * Wrap the App component in React's StrictMode to highlight potential problems in an application during development.
 * This has no impact on the production build.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
