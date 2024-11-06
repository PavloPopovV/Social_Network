import UserBtns from "../../components/UserBtns"
import UserInfo from "../../components/UserInfo"
import UserPosts from "../../components/UserPosts"


const Profile = () => {

  return (
    <div className="w-[600px]">
      <UserInfo/>
      <UserBtns />
      <UserPosts />
    </div>
  )
}

export default Profile
