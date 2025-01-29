

const MovieLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Neon Filmstrip */}
      <div className="flex gap-2 items-center justify-center">
        <div className="w-8 h-8 bg-purple-500 rounded-full animate-pulse-neon"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse-neon delay-[300ms]"></div>
        <div className="w-8 h-8 bg-pink-500 rounded-full animate-pulse-neon delay-[600ms]"></div>
      </div>

      {/* Glowing Movie Text */}
      <p className="mt-6 text-lg font-semibold tracking-wide text-blue-400 animate-fade">Loading Movies...</p>
    </div>
  );
};

export default MovieLoader;
