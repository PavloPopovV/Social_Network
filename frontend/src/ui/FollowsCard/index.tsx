import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { PATHS } from "../../constantes/paths"
import { Follows } from "../../app/types"

type FollowsCardProps = {
  data: Follows 
  type: string
}

const FollowsCard = ({ data, type }: FollowsCardProps) => {
  const user = type === "followers" ? data.follower : data.following
  
  return (
    <>
      <li className="w-[600px] mb-2">
        <Link
          to={PATHS.PROFILE(user._id)}
          className="flex items-center gap-4 justify-between w-full"
        >
          <div className="flex items-center gap-4">
            <img
              src={user.profilePic}
              alt={`${user.firstName} avatar`}
              className="w-14 h-14 rounded-[100%]"
            />
            <span className="block leading-4">{`${user.firstName} ${user.lastName}`}</span>
          </div>
          <FontAwesomeIcon icon={faEllipsis} className="w-5 h-5" />
        </Link>
      </li>
    </>
  )
}

export default FollowsCard
