import { useGetUsersQuery } from "../../app/services/usersApi"
import { skipToken } from "@reduxjs/toolkit/query/react"
import SearchCard from "../SearchCard"

type SearchListType = {
  value: string
}

const SearchList = ({ value }: SearchListType) => {
  const { data = [], isLoading } = useGetUsersQuery(
    value ? { firstName: value } : skipToken,
  )

  if (isLoading) return "loading..."

  return (
    <ul>
      {data.length ? (
        data.map(user => <SearchCard key={user._id} data={user}/>)
      ) : (
        <span>No result</span>
      )}
    </ul>
  )
}

export default SearchList
