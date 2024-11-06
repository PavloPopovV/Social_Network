import { useCurrentQuery } from "../../app/services/usersApi"
import Navigation from "../Navigation"
import Loading from "../../ui/Loading"
import Logo from "../../ui/Logo"

const Header = () => {
  const { currentData, isLoading } = useCurrentQuery()
  if (isLoading) return <Loading />

  return (
    <div className="flex items-center mb-6 justify-between w-full">
      <Logo />
      <Navigation
        firstName={currentData?.firstName}
        profilePic={currentData?.profilePic}
        id={currentData?._id}
      />
    </div>
  )
}

export default Header
