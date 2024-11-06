import { createContext, useState, useEffect, useContext } from "react"
import io, { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io"
import { useCurrentQuery } from "../app/services/usersApi"
import { selectIsAuthenticated } from "../features/slices/userSlice"
import { useSelector } from "react-redux"


export type SocketContextType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType | null>(null)

export const useSocketContext = () => { 
  return useContext(SocketContext) 
}

export const SocketContextProvider = ({children}: {children: JSX.Element}) => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: authUser } = useCurrentQuery()

  useEffect(() => {
    if (isAuthenticated && authUser) {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,  
        }, 
      });   

      setSocket(newSocket); 

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);  
      });

      return () => newSocket.disconnect();
    } else if (!isAuthenticated && socket) {
      socket.emit("userLogout", authUser?._id);
      socket.disconnect();
      setSocket(null);
    }
    return () => {}
  }, [isAuthenticated, authUser]);
 
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}


