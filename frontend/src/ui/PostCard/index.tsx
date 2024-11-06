import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  faHeart,
  faComment,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons"
import { selectCurrent } from "../../features/slices/userSlice"
import { Post } from "../../app/types"
import { PATHS } from "../../constantes/paths"
import UserCard from "../UserCard"
import MetaInfo from "../MetaInfo"
import { usePostActions } from "../../hooks/usePostActions"

type PostCardProps = {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const current = useSelector(selectCurrent)
  const { fetchDeletePost, fetchLikePost, fetchUnLikePost } = usePostActions()

  const isAuthor = current?._id === post.author._id
  const isSinglePostPage = post._id === id

  const handleLikesPost = async () => {
    try {
      post.likedByUser ? await fetchUnLikePost(post._id, isSinglePostPage, id) : await fetchLikePost(post._id, isSinglePostPage, id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <li className="mb-4 bg-gray-800 pt-4 pb-1.5 px-4 rounded-xl">
      <UserCard data={post} />
      <div className="pl-1">
        <Link to={PATHS.POST(post._id)}>
          <span className="mb-2 mt-1 block pl-[2px]">{post.content}</span>
        </Link>
        <div
          className={`${isSinglePostPage && isAuthor ? "justify-between" : "justify-end"} flex gap-5`}
        >
          {isSinglePostPage && isAuthor && (
            <div className="flex gap-5">
              <MetaInfo
                icon={faTrashCan}
                onClick={() => fetchDeletePost(post._id)}
              />
              <MetaInfo
                icon={faPenToSquare}
                onClick={() => navigate(PATHS.EDITPOST(post._id))}
              />
            </div>
          )}
          <div className="flex gap-5">
            <MetaInfo
              icon={faHeart}
              iconClass={post.likedByUser ? "text-red-600":""}
              count={post.likes.length}
              onClick={handleLikesPost}
            />
            <MetaInfo
              icon={faComment}
              count={post.comments.length}
              onClick={()=>navigate(PATHS.POST(post._id))}
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export default PostCard
