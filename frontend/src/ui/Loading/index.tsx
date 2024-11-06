import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const Loading = () => {
  return (
    <div className="bg-gray-600">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin-pulse w-10 h-10 absolute top-[50%] left-[50%] text-blue-600"/>
    </div>
  )
}

export default Loading
