import { Link } from "react-router-dom";
import { PATHS } from "../../constantes/paths";
import { dateFormat } from "../../utils/dateFormat";
import { Post } from "../../app/types";

type AuthorCardProps = {
  data: Post;
}

const UserCard = ({data} : AuthorCardProps) => {
  const {author, createdAt} = data
  return (
    <Link to={PATHS.PROFILE(author._id)} className="flex items-center gap-4">
      <img src={author.profilePic} alt={`${author.firstName} avatar`} className="w-16  h-16  rounded-[100%]" />
      <div className="flex flex-col gap-y-0">
        {createdAt && (
          <span className="block leading-4 text-gray-400 text-xs">
            {dateFormat(createdAt)}
          </span>
        )}
        <span className="block leading-4">{`${author.firstName} ${author.lastName}`}</span>
        {author.email && (
          <span className="block leading-4 text-gray-400">{author.email}</span>
        )}
      </div>
    </Link>
  )
}

export default UserCard
