//компонент який отримує користувача при старті додатку
import { useCurrentQuery } from "../../app/services/usersApi"
import Loading from "../../ui/Loading";

const AuthUser = ({ children }: { children: JSX.Element }) => {
  const {isLoading } = useCurrentQuery()
  if (isLoading) return <Loading/>
  return children
}

export default AuthUser
