import FollowsCardSkeleton from "../../ui/FollowsCard/skeleton"
import PostCardSkeleton from "../../ui/PostCard/skeleton"

const SinglePostSkeleton = () => {
  return (
    <div className="animate-pulse">
      <PostCardSkeleton />
      <div className="w-[600px] flex gap-5 mb-3">
        <span className="w-[80%] h-[50px] bg-gray-400  rounded-lg"></span>
        <span className="w-[25%] h-[50px] bg-gray-800  rounded-lg flex items-center justify-center">
          <span className="w-[45%] h-[10px] bg-gray-400  rounded-lg"></span>
        </span>
      </div>
      <div className="bg-gray-800  rounded-lg p-4">
        <FollowsCardSkeleton />
      </div>
    </div>
  )
}

export default SinglePostSkeleton
