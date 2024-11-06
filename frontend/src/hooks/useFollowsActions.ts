import { useFollowUserMutation, useUnfollowUserMutation } from "../app/services/followsApi"
import { useLazyCurrentQuery, useLazyGetUserByIdQuery } from "../app/services/usersApi"

export const useFollowsAction = () => {
    const [followUser] = useFollowUserMutation()
    const [unfollowUser] = useUnfollowUserMutation()
    const [triggerUser] = useLazyGetUserByIdQuery()
    const [triggerCurrent] = useLazyCurrentQuery()

    const fetchFollow = async (followingId: string) => {
        try {
            await followUser(followingId).unwrap()
            await triggerUser(followingId).unwrap()
            await triggerCurrent().unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUnFollow = async (followingId: string) => {
        try {
            await unfollowUser(followingId).unwrap()
            await triggerUser(followingId).unwrap()
            await triggerCurrent().unwrap()
        } catch (error) {
            console.log(error)
        }
    }
    return { fetchFollow, fetchUnFollow }
}