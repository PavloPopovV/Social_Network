import { Link, useParams } from "react-router-dom"
import { Message } from "../../app/types"
import { dateFormat } from "../../utils/dateFormat"
import { PATHS } from "../../constantes/paths"

type MessageTypeProps = {
  message: Message
}

const UserMessage = ({ message }: MessageTypeProps) => {
  const {id} = useParams<{id:string}>()

  return (

      <div className={`${message.senderId._id !== id && "justify-end"} flex items-start gap-2 mb-4 `}>
        <Link to={PATHS.PROFILE(message.senderId._id)} className={`${message.senderId._id !== id && "order-2"}`}>
          <img
            src={message.senderId.profilePic}
            alt={`${message.senderId.firstName} avatar`}
            className="w-10 h-10 rounded-[100%]"
          />
        </Link>
        <div className={`${message.senderId._id !== id && "items-end order-1"} flex flex-col gap-1`}>
          <span className={`${message.senderId._id !== id ? "pr-1": "pl-1"} text-[12px] leading-[10px] block text-gray-500`}>
            {dateFormat(message.createdAt)}
          </span>
          <span className={`${message.senderId._id !== id ? "bg-blue-600": "bg-gray-600"} py-1 px-4 rounded-xl block max-w-[250px]`}>
            {message.message}
          </span>
        </div>
      </div>
 
  )
}

export default UserMessage
