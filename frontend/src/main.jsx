import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/typography.css";
import "./styles/components.css";
import "./styles/utilities.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
        },
      }}
    />

    <App />

  </React.StrictMode>
);