const UserInfoSkeleton = () => {
  return (
    <div className="flex flex-col mb-4 animate-pulse ">
      <div className="flex items-center gap-10 mb-4">
        <span className="w-[150px] h-[150px] bg-gray-400 rounded-[100%]"></span>
        <span className="w-[60%] h-[50px] bg-gray-400  rounded-lg"></span>
      </div>
      <div className="flex flex-col">
      <p className="h-3 bg-gray-400 rounded-full w-[30%] mb-2"></p>
      <p className="h-2 bg-gray-400 rounded-full w-[20%] mb-1"></p>
      <p className="h-2 bg-gray-400 rounded-full w-[10%] mb-1"></p>
      <p className="h-2 bg-gray-400 rounded-full w-[15%] mb-1"></p>
      </div>
    </div>
  )
}

export default UserInfoSkeleton
