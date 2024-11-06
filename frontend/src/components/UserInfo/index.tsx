import { Link, useParams } from "react-router-dom"
import { PATHS } from "../../constantes/paths"
import { useGetUserByIdQuery } from "../../app/services/usersApi"
import UserInfoSkeleton from "./skeleton"
import {
  SocketContextType,
  useSocketContext,
} from "../../context/SocketContext"

const UserInfo = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useGetUserByIdQuery(id ?? "")

  const { onlineUsers } = useSocketContext() as SocketContextType

  return (
    <div>
      {isLoading ? (
        <UserInfoSkeleton />
      ) : (
        <>
          <div className="flex items-center mb-4">
            <div className="relative w-[150px] h-[150px]">
              {onlineUsers.includes(data?._id || "") && (
                <span className="w-3 h-3 bg-green-500 block rounded-[100%] absolute"></span>
              )}

              <img
                src={data?.profilePic}
                alt="avatar"
                className="rounded-[100%]"
              />
            </div>

            <ul className="flex w-[450px] justify-center gap-20">
              <li className="flex flex-col items-center gap-y-[5px] leading-[20px]">
                <span className="text-[30px]">{data?.posts.length}</span>
                <span>posts</span>
              </li>
              <li className="flex flex-col items-center gap-y-[5px] leading-[20px]">
                <span className="text-[30px]">{data?.followers.length}</span>
                <Link
                  to={PATHS.FOLLOWERS(id)}
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {}}
                >
                  followers
                </Link>
              </li>
              <li className="flex flex-col items-center gap-y-[5px] leading-[20px]">
                <span className="text-[30px]">{data?.following.length}</span>
                <Link
                  to={PATHS.FOLLOWING(id)}
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {}}
                >
                  following
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col mb-4">
            <span className="font-bold text-lg">{`${data?.firstName} ${data?.lastName}`}</span>
            <span className="leading-5 text-gray-400">{data?.bio}</span>
            <span className="leading-5 text-gray-400">{data?.location}</span>
            <span className="text-blue-500 underline leading-5">
              <a href={`mailto:${data?.email}`}>{data?.email}</a>
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default UserInfo
