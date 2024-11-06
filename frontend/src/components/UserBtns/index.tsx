import PrimaryButton from "../../ui/PrimaryButton"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { logout, selectCurrent } from "../../features/slices/userSlice"
import { PATHS } from "../../constantes/paths"
import { useFollowsAction } from "../../hooks/useFollowsActions"
import { useState } from "react"
import { useCreateConversation } from "../../hooks/useCreateConversation"

const UserBtns = () => {
  const { id } = useParams<{ id: string }>()
  const current = useSelector(selectCurrent)
  const { fetchCreateConversation } = useCreateConversation(id || "", current?._id || "")
  const { fetchFollow, fetchUnFollow } = useFollowsAction()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const followingStatus = current?.following?.some(follow => follow === id)
  const [isFollowing, setIsFollowing] = useState(followingStatus)

  const handleFollows = () => {
    isFollowing ? fetchUnFollow(id!) : fetchFollow(id!)
    setIsFollowing(!isFollowing)
  }

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate(PATHS.LOGIN)
  }

  const createConversation = () => {
    fetchCreateConversation()
  }

  return (
    <ul className="flex gap-5 mb-6">
      {current?._id === id ? (
        <>
          <li>
            <PrimaryButton
              type="button"
              text="Edit Profile"
              className="bg-blue-600 w-[187px]"
              onClick={() => navigate(PATHS.EDITUSER)}
            />
          </li>
          <li>
            <PrimaryButton
              type="button"
              text="Create Post"
              className="bg-blue-600 w-[187px]"
              onClick={() => navigate(PATHS.CREATE)}
            />
          </li>
          <li>
            <PrimaryButton
              type="button"
              text="Logout"
              icon={faArrowRightFromBracket}
              className="border border-white w-[187px] pr-5"
              iconClass="right-4 top-[14px]"
              onClick={handleLogout}
            />
          </li>
        </>
      ) : (
        <>
          <li>
            <PrimaryButton
              type="button"
              text="Send Message"
              className="bg-blue-600 w-[250px]"
              onClick={createConversation}
            />
          </li>
          <li>
            <PrimaryButton
              type="button"
              text={isFollowing ? "Unfollow" : "Follow"}
              className="bg-blue-600 w-[250px]"
              onClick={handleFollows}
            />
          </li>
        </>
      )}
    </ul>
  )
}

export default UserBtns
