import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  </Provider>
)

// <BrowserRouter> enables client-side routing using the HTML5 history API.
// <BrowserRouter> allows navigation between components without full page reloads.
// <Provider> makes the Redux store available to the entire app, allowing components to access and interact with the global state. 