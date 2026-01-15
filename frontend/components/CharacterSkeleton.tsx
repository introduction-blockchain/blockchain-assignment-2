export const CharacterSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 animate-pulse w-full">
      {/* Image Skeleton */}
      <div className="bg-gray-300 h-52 w-full rounded-md mb-4" />
      
      <div className="flex justify-between items-start mb-2">
        {/* Name Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-1/2" />
        {/* ID Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-8" />
      </div>

      {/* Price Skeleton */}
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
      
      {/* Owner Skeleton */}
      <div className="h-4 bg-gray-300 rounded w-full mb-4" />

      {/* Button Skeleton */}
      <div className="h-10 bg-gray-300 rounded-lg w-full" />
    </div>
  );
};