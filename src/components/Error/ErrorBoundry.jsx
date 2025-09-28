export function ErrorBoundry({ error, resetErrorBoundary }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-6 rounded-xl shadow text-center max-w-md">
        <h2 className="text-2xl font-semibold text-red-500">Something went wrong</h2>
        <p className="text-gray-700 mt-2">{error?.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-500"  
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
