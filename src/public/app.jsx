// Imports
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import Splash from "./routes/Splash/Splash.jsx";
import Play from "./routes/Play/Play.jsx";
import Game from "./routes/Game/Game.jsx";

/**
 * Define the routes for the application.
 * Each route is an object with a path, an element to render when the path matches the current URL,
 * and an errorElement to render when an error occurs.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
    // errorElement: <ErrorElement message="An error occurred" />,
  },
  {
    path: "/play",
    element: <Play />,
    // errorElement: <ErrorElement message="An error occurred" />,
  },
  {
    path: "/game",
    element: <Game />,
    // errorElement: <ErrorElement message="An error occurred" />,
  },
  {
    // The * path matches any URL that doesn't match the above paths
    path: "*",
    // errorElement: <ErrorElement message="Sorry, that page does not exist!" />,
  },
]);

/**
 * The main App component.
 * It sets up the application's routes and renders the Background component.
 * @returns {JSX.Element} The rendered App component.
 */
export const App = () => {
  return <RouterProvider router={router} />;
};
