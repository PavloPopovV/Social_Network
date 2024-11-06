import { useDeleteCommentMutation } from "../app/services/commentsApi"
import { useLazyGetPostByIdQuery } from "../app/services/postsApi"

export const useDeleteComment = () => {
    const [deleteComment] = useDeleteCommentMutation()
    const [triggerGetPostById] = useLazyGetPostByIdQuery()

    const fetchDeleteComment = async(commentId:string, postId:string)=>{
        try {
            await deleteComment(commentId)
            await triggerGetPostById(postId)
        } catch (error) {
            console.log(error)
        }
    }

    return { fetchDeleteComment}
}