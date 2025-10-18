import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "@/router/Router"; // or App.jsx
import { Provider } from "react-redux";
import { store } from "@/stores"; // <- adjust to your actual store path
import "./index.css";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ErrorBoundaryFallback } from "./components/Error/ErrorBoundaryFallback";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "@/contexts/ThemeContext";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Toaster position="top-right" icons={true} richColors />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <AppRouter />
          </ErrorBoundary>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
