import { useGetAllPostsQuery } from "../../app/services/postsApi"
import SearchField from "../../components/SearchField";
import PostCard from "../../ui/PostCard"
import PostCardSkeleton from "../../ui/PostCard/skeleton";

const Posts = () => {
  const { data, isLoading } = useGetAllPostsQuery('')
  const latestPosts = data ? [...data].reverse() : []

  return (
    <ul className="w-[600px]">
      <SearchField/>
      {isLoading ? <PostCardSkeleton/> : latestPosts?.map(post => <PostCard post={post} key={post._id} />)}
    </ul>
  )
}

export default Posts
