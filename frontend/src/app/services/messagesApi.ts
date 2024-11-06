import { Message } from '../types';
import { api } from './api'

export const messagesApi = api.injectEndpoints({
    endpoints: (builder) => ({

        sendMessage: builder.mutation<Message, {message:string, receiverId:string}>({
            query: ({message, receiverId}) => ({
                url: `/messages/send/${receiverId}`,
                method: "POST",
                body: { message }
            }),
        }),


        getMessages: builder.query<Message[], string>({
            query: (receiverId) => ({
                url: `/messages/${receiverId}`,
                method: "GET"
            }),
        }),

    })
})

export const { useGetMessagesQuery, useSendMessageMutation, useLazyGetMessagesQuery} = messagesApi;
export const { endpoints: { getMessages, sendMessage } } = messagesApi;