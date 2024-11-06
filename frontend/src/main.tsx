import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { router } from "./router"
import { SocketContextProvider } from "./context/SocketContext"
import AuthUser from "./features/AuthUser"
import "./assets/styles/index.css"


const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <AuthUser>
      <SocketContextProvider>
        <RouterProvider router={router} />
      </SocketContextProvider>
    </AuthUser>
  </Provider>,
)
