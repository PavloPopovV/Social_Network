import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { selectIsAuthenticated } from "../../features/slices/userSlice"
import { PATHS } from "../../constantes/paths"
import Container from "../Container"
import Header from "../Header"

const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate(PATHS.LOGIN)
  }, [])

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

export default Layout
