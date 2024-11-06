import { useEffect } from "react"
import { useCreateCommentMutation } from "../app/services/commentsApi"
import { useLazyGetPostByIdQuery } from "../app/services/postsApi"
import { CommentFormValue } from "../components/CommentForm"
import { SocketContextType, useSocketContext } from "../context/SocketContext"
import { Comment } from "../app/types"

export const useCreateComment = (postId: string) => {
    const [createComment] = useCreateCommentMutation()
    const [triggerGetPostById] = useLazyGetPostByIdQuery()
    const { socket } = useSocketContext() as SocketContextType;

    const fetchCreateComment = async (content: CommentFormValue) => {
        try {
            await createComment({ content: content.content, postId }).unwrap()
            await triggerGetPostById(postId).unwrap() // Оновлює пост після створення коментаря
        } catch (error) {
            console.error("Error creating comment:", error)
        }
    }


    useEffect(() => {
        if (!postId || !socket) return;

        // Приєднуємося до кімнати поста
        socket.emit("joinPost", postId);

        // Обробка події нового коментаря
        const handleNewComment = (data:Comment) => {
            if (data.postId === postId) {
                triggerGetPostById(postId); // Оновлюємо коментарі тільки для поточного поста
            }
        };

        // Слухаємо подію `newComment`
        socket.on("newComment", handleNewComment);

        // Очищення: вихід з кімнати при розмонтуванні
        return () => {
            socket.off("newComment", handleNewComment);
            socket.emit("leavePost", postId); // Вихід з кімнати
        };
    }, [postId, socket, triggerGetPostById]);

    return { fetchCreateComment }
}