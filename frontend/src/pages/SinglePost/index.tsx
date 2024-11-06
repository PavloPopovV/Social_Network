import { Navigate, useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import { PATHS } from "../../constantes/paths"
import CommentForm from "../../components/CommentForm"
import CurrentPost from "../../components/CurrentPost"
import CommentsList from "../../components/CommentsList"
import SinglePostSkeleton from "./skeleton"

const SinglePost = () => {
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading } = useGetPostByIdQuery(id || "")
  const comments = post ? post.comments : []
  if (!id) return <Navigate to={PATHS.POSTS} />

  return (
    <div className="w-[600px]">
      {isLoading ? 
      <SinglePostSkeleton/> 
      : <>
          {post && <CurrentPost post={post} />}
          <CommentForm />
          {comments.length !== 0 && <CommentsList comments={comments} />}
        </>
      }
    </div>
  )
}

export default SinglePost
