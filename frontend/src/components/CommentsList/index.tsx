import { Link, useParams } from "react-router-dom"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { PATHS } from "../../constantes/paths"
import MetaInfo from "../../ui/MetaInfo"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/slices/userSlice"
import { Comment } from "../../app/types"
import { useDeleteComment } from "../../hooks/useDeleteComment"

const CommentsList = ({ comments }:{comments:Comment[]}) => {
  const { id } = useParams<{ id: string }>()
  const current = useSelector(selectCurrent)
  const {fetchDeleteComment} = useDeleteComment()

  return (
    <ul className="bg-gray-800 rounded-lg py-4 px-4 flex flex-col gap-3">
      {comments.map(comment => (
          <li
          key={comment._id}
          className=" flex items-center justify-between gap-5 "
          >
          <Link
            to={PATHS.PROFILE(comment.userId)}
            className="flex items-center gap-5"
          >
            <div className="w-12 h-12">
              <img
                src={comment.user.profilePic}
                alt={`${comment.user.firstName} avatar`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400 leading-3 block mb-[5px]">
                {comment.user.firstName} {comment.user.lastName}
              </span>
              <span className="leading-4">{comment.content}</span>
            </div>
          </Link>
          {comment.user._id === current?._id && (
            <MetaInfo
              icon={faTrashCan}
              iconClass="w-4 h-4"
              onClick={() =>id && fetchDeleteComment(comment._id, id)}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default CommentsList
