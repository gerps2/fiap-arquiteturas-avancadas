export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300" />
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded mb-3" />
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-gray-300 rounded" />
              <div className="h-10 w-28 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
