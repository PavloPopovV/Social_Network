import { useParams } from "react-router-dom"
import { useGetUsersFollowsQuery } from "../../app/services/followsApi"
import FollowsCard from "../../ui/FollowsCard"
import FollowsCardSkeleton from "../../ui/FollowsCard/skeleton";

type FollowsListTypes = "followers" | "following" 

type FollowsListProps = {
  type: FollowsListTypes
}

const FollowsList = ({ type }: FollowsListProps) => {
  const { id } = useParams<{ id: string }>()
  const { data: followsData, isLoading } = useGetUsersFollowsQuery({
    userId: id ?? "",
    type,
  })

  return (
    <ul>
      {isLoading ? <FollowsCardSkeleton/> : followsData?.map(user => (
        <FollowsCard  key={user._id} data={user} type={type}/>
      ))}
    </ul>
  )
}

export default FollowsList
