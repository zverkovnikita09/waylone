import cn from "classnames";

interface MoonSunToggleProps {
  theme: "dark" | "light";
}

export const MoonSunToggle = ({ theme }: MoonSunToggleProps) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 100 100"
    >
      {/* Лучи солнца - сначала, чтобы были под кругом */}
      <g
        className={cn("transition-all duration-base opacity-0", {
          "opacity-100": theme === "light",
        })}
      >
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            x="48"
            y="0"
            width="4"
            height="20"
            rx="2"
            className="fill-yellow-400"
            style={{
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: "50px 50px",
            }}
          />
        ))}
      </g>

      {/* Фон */}
      <circle
        cx="50"
        cy="50"
        r="40"
        className={cn(
          "transition-all duration-base ease-in-out stroke-1 stroke-gray-300 fill-gray-200",
          { "fill-yellow-400": theme === "light" }
        )}
      />

      {/* Полумесяц / Солнце */}
      <circle
        cx={theme === "light" ? "50" : "70"}
        cy="50"
        r="30"
        className={cn("transition-all duration-slow ease-in-out fill-white", {
          "fill-yellow-300": theme === "light",
        })}
      />

      {/* Кратер луны */}
      <circle
        cx="65"
        cy="35"
        r="4"
        className={cn("transition-all duration-base ease-in-out opacity-0", {
          "opacity-100 fill-gray-300": theme === "dark",
        })}
      />
    </svg>
  );
};

