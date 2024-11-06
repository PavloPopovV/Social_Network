import { Post } from "../types";
import { api } from './api'

export type PostData = Pick<Post, "_id" | "content">;

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({

        createPost: builder.mutation<Post, { content: string }>({
            query: (postData) => ({
                url: "/posts/create",
                method: "POST",
                body: postData
            }),
        }),

        getAllPosts: builder.query<Post[], string | undefined>({
            query: ( userId ) => ({
                url: `/posts`,
                method: "GET",
                params: userId ? {userId} : {}
            }),
        }),

        getPostById: builder.query<Post, string >({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "GET",
            }),
        }),

        editPost: builder.mutation<Post, PostData>({
            query: ({ _id, content }) => ({
                url: `/posts/${_id}`,
                method: "PUT",
                body: { content }
            }),
        }),

        deletePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "DELETE",
            }),
        }),

    })
})

export const { useCreatePostMutation, useDeletePostMutation, useEditPostMutation, useGetPostByIdQuery, useLazyGetPostByIdQuery, useGetAllPostsQuery, useLazyGetAllPostsQuery } = postApi;
export const { endpoints: { createPost, deletePost, editPost, getAllPosts, getPostById } } = postApi;