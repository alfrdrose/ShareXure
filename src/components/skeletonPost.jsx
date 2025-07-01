function SkeletonPost() {
  return (
    <div className="min-h-screen w-full flex bg-black items-center justify-center">
      <div className="w-[780px] p-6 bg-[#1f1f1f] rounded-lg space-y-6 animate-pulse">
        {/* Profile section */}
        <div className="flex items-center space-x-4">
          <div className="rounded-full h-14 w-14 shimmer"></div>
          <div className="space-y-2">
            <div className="h-4 w-40 rounded shimmer"></div>
            <div className="h-3 w-24 rounded shimmer"></div>
          </div>
        </div>

        {/* Caption */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded shimmer"></div>
          <div className="h-4 w-5/6 rounded shimmer"></div>
        </div>

        {/* Media block */}
        <div className="h-[500px] w-full rounded shimmer"></div>

        {/* Hype text */}
        <div className="h-4 w-1/3 rounded shimmer"></div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <div className="h-4 w-20 rounded shimmer"></div>
          <div className="h-4 w-20 rounded shimmer"></div>
          <div className="h-4 w-20 rounded shimmer"></div>
        </div>

        {/* Comments */}
        <div className="space-y-4 pt-4 border-t border-[#ceae7b]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-full shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded shimmer"></div>
                <div className="h-3 w-full rounded shimmer"></div>
                <div className="h-3 w-16 rounded shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonPost;
