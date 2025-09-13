interface LoadPageProps {
  message?: string;
}

function Loading({ message = "Đang tải..." }: LoadPageProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* loading */}
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}

export { Loading }