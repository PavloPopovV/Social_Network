
import { Conversation } from "../types";
import { api } from "./api";

export const conversationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createConversation: builder.mutation<Conversation, string>({
            query: (receiverId) => ({
                url: `/conversation/${receiverId}`,
                method: "POST",
            }),
        }),

        getUserConversations: builder.query<Conversation[], string>({
            query: (userId) => ({
                url: `/conversation/${userId}`,
                method: "GET",
            }),
        }),

        deleteConversation: builder.mutation<void, string>({
            query: (conversationId) => ({
                url: `/conversation/${conversationId}`,
                method: "DELETE",
            }),
        }),
    })
})

export const {useDeleteConversationMutation, useCreateConversationMutation, useGetUserConversationsQuery, useLazyGetUserConversationsQuery } = conversationsApi
export const { endpoints: {deleteConversation, createConversation, getUserConversations } } = conversationsApi