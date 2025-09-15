import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>
)

// <BrowserRouter> enables client-side routing using the HTML5 history API.
// <BrowserRouter> allows navigation between components without full page reloads.
