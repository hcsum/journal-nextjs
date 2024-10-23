const Loading = () => {
  return (
    <div className="w-full mx-auto p-8">
      <div className="h-8 w-3/4 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mb-4"></div>
      <div className="h-48 w-full bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mb-4"></div>
      <div className="h-4 w-full bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mb-2"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
    </div>
  );
};

export default Loading;
