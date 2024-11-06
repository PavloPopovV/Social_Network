import { useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { useLazyGetMessagesQuery, useSendMessageMutation } from "../app/services/messagesApi";
import { SocketContextType, useSocketContext } from "../context/SocketContext";
import { Message } from "../app/types";

export const useMessageActions = (receiverId: string) => {
    const [sendMessage] = useSendMessageMutation();
    const [triggerMessages] = useLazyGetMessagesQuery();
    const { socket } = useSocketContext() as SocketContextType;
    const [activeChat, setActiveChat] = useState<string | null>(receiverId);

    const fetchSendMessage = async (message: string, reset: UseFormReset<{ message: string; }>) => {
        try {
            await sendMessage({ message, receiverId }).unwrap();
            await triggerMessages(receiverId).unwrap();
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleNewMessage = async (newMessage: Message) => {
            await triggerMessages(receiverId).unwrap();
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };

    }, [activeChat, receiverId, triggerMessages, socket]);

    return { fetchSendMessage, setActiveChat };
};