import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { selectCurrent } from "../../features/slices/userSlice"
import { useGetUserConversationsQuery, useLazyGetUserConversationsQuery } from "../../app/services/conversationApi"
import { useDeleteConversation } from "../../hooks/useDeleteConversation"
import { PATHS } from "../../constantes/paths"
import { User } from "../../app/types"
import SearchField from "../SearchField"
import PrimaryButton from "../../ui/PrimaryButton"
import DirectSidebarSkeleton from "./skeleton"
import {
  SocketContextType,
  useSocketContext,
} from "../../context/SocketContext"

const DirectList = () => {
  const current = useSelector(selectCurrent) as User
  const { data, isLoading } = useGetUserConversationsQuery(current?._id || "")
  const { fetchDeleteConversation } = useDeleteConversation()
  const { onlineUsers, socket } = useSocketContext() as SocketContextType
  const [triggerConversations] = useLazyGetUserConversationsQuery();

  useEffect(() => {
    const handleNewConversation = () => {
      triggerConversations(current?._id || "");
    };

    socket?.on("newConversation", handleNewConversation);

    return () => {
      socket?.off("newConversation", handleNewConversation);
    };
  }, [socket, current, triggerConversations]);

  const handleDeleteConversation = (
    conversationId: string,
    currentId: string,
  ) => {
    fetchDeleteConversation(conversationId, currentId)
  }

  return (
    <>
      <SearchField />
      {isLoading && <DirectSidebarSkeleton />}
      <ul>
        {data?.map(conversations => (
          <li key={conversations._id} >
            {onlineUsers.includes(conversations.participants._id || "") && (
              <span className="w-2 h-2 bg-green-500 block rounded-[100%]  left-0"></span>
            )}
            <div className="flex items-center justify-between">
            <Link
              to={PATHS.CONVERSATION(conversations.participants._id)}
              className="flex items-center gap-5 justify-between mb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  className="h-14 rounded-[100%]"
                  src={conversations.participants.profilePic}
                  alt={`${conversations.participants.firstName} avatar`}
                />
                <span className="leading-4">
                  {`${conversations.participants.firstName} ${conversations.participants.lastName}`}
                </span>
              </div>
            </Link>
            <PrimaryButton
              text=""
              type="button"
              icon={faTrash}
              onClick={() =>
                handleDeleteConversation(conversations._id, current?._id)
              }
              className="w-10 h-10"
              iconClass="top-[12px] right-0"
            />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default DirectList
