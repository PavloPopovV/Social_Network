const UserMessageSkeleton = () => {
  return (
    <div className={`flex items-start gap-2 mb-4 justify-end `}>
      <span className="w-10 h-10 rounded-[100%] bg-gray-400 block"></span>

      <div className={` flex flex-col gap-1`}>
        <span className={` block bg-gray-400 h-3 w-14 rounded-lg`}></span>
        <span className=" rounded-lg block bg-gray-400 w-32 h-6"></span>
      </div>
    </div>
  )
}

export default UserMessageSkeleton
