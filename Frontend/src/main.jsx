import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>          {/* ✅ must wrap first */}
      <WorkoutsContextProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
