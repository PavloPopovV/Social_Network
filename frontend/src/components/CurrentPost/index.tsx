import { Post } from "../../app/types"
import PostCard from "../../ui/PostCard"

type PostCardProps = {
  post:Post
}

const CurrentPost = ({post}:PostCardProps) => {
  return (
    <ul className="w-[600px] mb-4">
       <PostCard post={post}/>
    </ul>
  )
}

export default CurrentPost
