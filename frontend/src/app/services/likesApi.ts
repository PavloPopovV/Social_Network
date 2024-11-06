import { Like } from "../types";
import { api } from "./api";

export const likesApi = api.injectEndpoints({
    endpoints: (builder) => ({

        likePost: builder.mutation<Like, string>({
            query: (postId) => ({
                url: `/likes/${postId}`,
                method: "POST",
            }),
        }),

        unlikePost: builder.mutation<void, string>({
            query: (postId) => ({
                url: `/likes/${postId}`,
                method: "DELETE", 
            }),
        }),
    })
})

export const { useLikePostMutation, useUnlikePostMutation} = likesApi
export const { endpoints: { likePost, unlikePost} } = likesApi