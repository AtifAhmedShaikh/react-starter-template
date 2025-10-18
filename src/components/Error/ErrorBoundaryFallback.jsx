export function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-destructive/10">
      <div className="bg-card p-6 rounded-xl shadow text-center max-w-md border">
        <h2 className="text-2xl font-semibold text-destructive">Something went wrong</h2>
        <p className="text-muted-foreground mt-2">{error?.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors"  
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
