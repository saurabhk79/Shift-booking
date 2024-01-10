import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MyProvider } from "./context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MyProvider>
);
