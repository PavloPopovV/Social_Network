import { createBrowserRouter } from "react-router-dom"
import { PATHS } from "./constantes/paths"
import Layout from "./components/Layout"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Posts from "./pages/Posts"
import Profile from "./pages/Profile"
import Followers from "./pages/Followers"
import Following from "./pages/Following"
import EditProfile from "./pages/EditProfile"
import CreatePost from "./pages/CreatePost"
import SinglePost from "./pages/SinglePost"
import EditPost from "./pages/EditPost"
import Direct from "./pages/Direct"
import Conversation from "./pages/Conversation"


export const router = createBrowserRouter([
  {
    path: PATHS.REGISTER,
    element: <Registration />,
  },
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: PATHS.HOME,
    element: <Layout />,
    children: [
      {
        path: PATHS.POSTS,
        element: <Posts />,
      },
      {
        path: PATHS.POST(),
        element: <SinglePost/>,
      },
      {
        path: PATHS.PROFILE(),
        element: <Profile/>,
      },
      {
        path: PATHS.FOLLOWERS(),
        element:<Followers/>,
      },
      {
        path: PATHS.FOLLOWING(),
        element: <Following/>,
      },
      {
        path: PATHS.EDITUSER,
        element: <EditProfile/>,
      },
      {
        path: PATHS.CREATE,
        element: <CreatePost/>,
      },
      {
        path: PATHS.EDITPOST(),
        element: <EditPost/>,
      },
      {
        path: PATHS.DIRECT,
        element: <Direct/>,
      },
      {
        path: PATHS.CONVERSATION(),
        element: <Conversation/>,
      },
    ],
  },
])
