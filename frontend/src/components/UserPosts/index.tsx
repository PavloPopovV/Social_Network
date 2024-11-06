import { useParams } from "react-router-dom"
import { useGetAllPostsQuery } from "../../app/services/postsApi"
import PostCard from "../../ui/PostCard"
import PostCardSkeleton from "../../ui/PostCard/skeleton"

const UserPosts = () => {
  const { id } = useParams<{ id: string }>()
  const { data: userPosts, isLoading } = useGetAllPostsQuery(id)
  const latestPosts = userPosts ? [...userPosts].reverse() : []

  return (
    <ul className="relative">
      {isLoading ? <PostCardSkeleton/> : latestPosts?.map(post =><PostCard post={post} key={post._id} />)}
    </ul>
  )
}

export default UserPosts
