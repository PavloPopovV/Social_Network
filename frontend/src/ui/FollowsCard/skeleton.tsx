const FollowsCardSkeleton = () => {
  return (
    <div className="w-[600px] flex  items-center animate-pulse">
      <div className="flex items-center gap-4 w-[85%]">
        <span className="flex justify-center items-center bg-gray-400 rounded-full w-14 h-14 "></span>
        <p className="h-3 bg-gray-400 rounded-full w-[20%] mb-1"></p>
      </div>
      <span className="h-4 w-10 bg-gray-400 rounded-lg"></span>
    </div>
  )
}

export default FollowsCardSkeleton
