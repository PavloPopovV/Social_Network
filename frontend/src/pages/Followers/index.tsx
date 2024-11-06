import { useSelector } from 'react-redux'
import FollowsList from '../../components/FollowsList'
import SearchField from '../../components/SearchField'
import { selectCurrent } from '../../features/slices/userSlice'
import { useParams } from 'react-router-dom'

const Foolowers = () => {
  const {id:userId} = useParams<{id:string}>()
  const current = useSelector(selectCurrent)

  return (
    <div>
      {userId === current?._id && <SearchField/>}
      <FollowsList type="followers" />
    </div>
  )
}

export default Foolowers
