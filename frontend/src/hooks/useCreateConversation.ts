import { useNavigate } from "react-router-dom";
import { useCreateConversationMutation} from "../app/services/conversationApi";
import { PATHS } from "../constantes/paths";

export const useCreateConversation = (receiverId: string, senderId: string) => {
    const [createConversation] = useCreateConversationMutation();
    const navigate = useNavigate();


    const fetchCreateConversation = async () => {
        try {
            await createConversation(receiverId).unwrap();
            navigate(PATHS.CONVERSATION(receiverId));
        } catch (error) {
            console.log(error);
        }
    }

    return { fetchCreateConversation };
};