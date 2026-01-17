// Loading component to show a spinner during lazy loading
function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 dark:border-zinc-700 border-t-red-600 rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
