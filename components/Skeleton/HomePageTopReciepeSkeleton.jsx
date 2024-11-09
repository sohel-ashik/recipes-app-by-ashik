

const HomePageTopReciepeSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse bg-white p-4 rounded-lg shadow-md">
          <div className="bg-gray-300 h-48 w-full mb-4 rounded-lg"></div>
          <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded-md"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-md"></div>
        </div>
      ))}
    </div>
  );
  
  export default HomePageTopReciepeSkeleton;
  