import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { PATHS } from "../../constantes/paths"
import { User } from "../../app/types"

type SearchPropsType = {
    data:User
}

const SearchCard = ({data}:SearchPropsType) => {
  return (
    <Link to={PATHS.PROFILE(data._id)} className="flex items-center justify-between mb-3">
      
            <div className="flex items-center gap-3">
                <img src={data.profilePic} alt={`${data.firstName} avatar`} className="w-14 h-14"/>
                <span>{`${data.firstName} ${data.lastName}`}</span>
            </div>
            <FontAwesomeIcon icon={faEllipsis} className="w-5 h-5"/>

    </Link>
  )
}

export default SearchCard
