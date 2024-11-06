import { useParams } from "react-router-dom"
import FollowsList from "../../components/FollowsList"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/slices/userSlice"
import SearchField from "../../components/SearchField"

const Following = () => {
  const { id: userId } = useParams<{ id: string }>()
  const current = useSelector(selectCurrent)
  
  return (
    <div>
      {userId === current?._id && <SearchField />}
      <FollowsList type="following" />
    </div>
  )
}

export default Following
