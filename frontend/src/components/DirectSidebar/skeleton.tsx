const DirectSidebarSkeleton = () => {
  return (
    <div>
      <div className="w-[600px] animate-pulse mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4 w-full">
          <span className=" bg-gray-400 rounded-full w-14 h-14 "></span>
          <p className="h-3 bg-gray-400 rounded-full w-[10%]"></p>
        </div>
        <span className="flex justify-center items-center bg-gray-400 rounded-lg w-6 h-6 "></span>
      </div>
    </div>
  )
}

export default DirectSidebarSkeleton
