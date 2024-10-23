export default function Loading() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        <div className="h-8 w-48 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
      </h1>
      <div className="h-10 w-24 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mb-2"></div>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4"
        >
          <h2 className="font-bold mb-2">
            <div className="h-6 w-3/4 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
          </h2>
          <div className="h-24 w-full bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
          <div className="h-4 w-36 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mt-2"></div>
        </div>
      ))}
      <div className="h-10 w-72 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mt-4"></div>
    </div>
  );
}
