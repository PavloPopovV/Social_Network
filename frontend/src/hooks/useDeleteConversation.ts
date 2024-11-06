import { useDeleteConversationMutation, useLazyGetUserConversationsQuery } from "../app/services/conversationApi"

export const useDeleteConversation = () =>{

    const [deleteConversation] = useDeleteConversationMutation()
    const [triggerConversations] = useLazyGetUserConversationsQuery()
    
    const fetchDeleteConversation = async (conversationId: string, currentId: string ) => {
        try {
            await deleteConversation(conversationId).unwrap()
            await triggerConversations(currentId).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    return {fetchDeleteConversation}
}