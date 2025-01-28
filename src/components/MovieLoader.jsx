

const MovieLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      {/* SVG Loader */}
      <div className="relative w-24 h-24">
        <svg
          className="w-full h-full animate-spin-slow"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Film Strip */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="6"
            className="animate-glow"
          />
          {/* Rolling Film Dots */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={50 + 40 * Math.cos((i * Math.PI) / 4)}
              cy={50 + 40 * Math.sin((i * Math.PI) / 4)}
              r="4"
              fill="#00D1FF"
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-lg font-semibold tracking-wide text-blue-400 animate-fade">
        Loading Movies...
      </p>
    </div>
  );
};

export default MovieLoader;
