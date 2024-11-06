import { useNavigate } from "react-router-dom";
import { useCreatePostMutation, useDeletePostMutation, useEditPostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from "../app/services/postsApi";
import { PostFormValue } from "../components/PostForm";
import { useLikePostMutation, useUnlikePostMutation } from "../app/services/likesApi";


export const usePostActions = () => {
    const navigate = useNavigate();
    const [likePost] = useLikePostMutation()
    const [unlikePost] = useUnlikePostMutation()
    const [createPost] = useCreatePostMutation()
    const [deletePost] = useDeletePostMutation()
    const [editPost] = useEditPostMutation()
    const [triggerGetPostById] = useLazyGetPostByIdQuery()
    const [triggerGetPost] = useLazyGetAllPostsQuery()

    const fetchCreatePost = async (content: PostFormValue) => {
        try {
            await createPost(content).unwrap()
            navigate(-1);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchEditPost = async (content: PostFormValue, postId: string) => {
        try {
            await editPost({ _id: postId, content: content.content }).unwrap();
            navigate(-1);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDeletePost = async (id: string) => {
        try {
            await deletePost(id).unwrap()
            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchLikePost = async (postId: string, isSinglePostPage: boolean, id?: string) => {
        try {
            await likePost(postId).unwrap()
            id && isSinglePostPage ? await triggerGetPostById(id) : await triggerGetPost( id ).unwrap();
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUnLikePost = async (postId: string, isSinglePostPage: boolean, id?: string) => {
        try {
            await unlikePost(postId).unwrap()
            id && isSinglePostPage ? await triggerGetPostById(id) : await triggerGetPost(id).unwrap();
        } catch (error) {
            console.log(error)
        }
    }

    return { fetchDeletePost, fetchCreatePost, fetchEditPost, fetchLikePost, fetchUnLikePost }
}