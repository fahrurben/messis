const LoadingWrapper = () => {
  return (
    <div className="absolute top-0 right-0 bg-gray-100/50 p-2 w-full h-screen flex justify-center items-center">
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
      <span className="loading loading-ball loading-xl"></span>
    </div>
  )
}

export default LoadingWrapper
