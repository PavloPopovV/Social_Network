import { useGetMessagesQuery } from "../../app/services/messagesApi"
import UserMessage from "../../ui/Message"
import { useParams } from "react-router-dom"
import UserMessageSkeleton from "../../ui/Message/skeleton"


const MessagesList = () => {
  const { id } = useParams<{ id: string }>()
  const { data: messageList, isLoading } = useGetMessagesQuery(id || "")


  return (
    <div className="mb-8">
      {isLoading && <UserMessageSkeleton/>}
      {messageList?.length !== 0 ? (
        messageList?.map(message =>
          <UserMessage key={message._id} message={message} />
        )
      ) : (
        <span className="block text-[24px]">Send first message...</span>
      )}
    </div>
  )
}

export default MessagesList
