export const MapLoader = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary-200 to-white text-primary z-50">
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      className="mb-4 drop-shadow-md"
    >
      <path
        d="M50 5C30 5 10 25 10 45c0 25 40 50 40 50s40-25 40-50C90 25 70 5 50 5z"
        fill="none"
        stroke="var(--color-primary-500)"
        strokeWidth="3"
        strokeDasharray="260"
        strokeDashoffset="260"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="260"
          to="0"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <p className="text-lg font-medium tracking-wide animate-pulse">
      Карта загружается...
    </p>
  </div>
);

