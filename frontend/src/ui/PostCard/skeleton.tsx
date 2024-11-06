const PostCardSkeleton = () => {
  return (
    <div className="max-w-[600px] animate-pulse bg-gray-800 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex justify-center items-center bg-gray-400 rounded-full w-16 h-16 "></span>
          <div className="w-[50%]">
            <p className="h-2 bg-gray-400 rounded-full w-[20%] mb-1"></p>
            <p className="h-3 bg-gray-400 rounded-full w-[30%]"></p>
          </div>
        </div>
        <p className="h-2 bg-gray-400 rounded-full w-[80%] mb-2"></p>
        <p className="h-2 bg-gray-400 rounded-full w-[60%] mb-2"></p>
    </div>
  )
}
export default PostCardSkeleton
