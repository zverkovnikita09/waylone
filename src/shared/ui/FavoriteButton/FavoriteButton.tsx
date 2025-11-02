"use client";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import cn from "classnames";
import { Tooltip } from "../Tooltip";
import { AnimatePresence, motion } from "framer-motion";

interface FavoriteButtonProps {
  className?: string;
}

export const FavoriteButton = ({ className }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    if (isFavorite) {
      setIsFavorite(false);
      return;
    }
    setIsFavorite(true);
    setBurst(true);
  };

  return (
    <Tooltip Content="Добавить в избранное">
      <button
        onClick={handleClick}
        className={cn(
          "w-[40px] h-[40px] rounded-full bg-main-bg flex items-center justify-center text-xl group/favorite cursor-pointer relative",
          { "text-red-500": isFavorite },
          className
        )}
        disabled={burst}
      >
        <AnimatePresence>
          {burst && (
            <motion.div
              key="burst"
              initial={{ scale: 1.2, opacity: 1 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeIn" }}
              onAnimationComplete={() => setBurst(false)}
              style={{
                position: "absolute",
                color: "#e63946",
              }}
            >
              <FaHeart />
            </motion.div>
          )}
        </AnimatePresence>
        {!burst && (
          <>
            {isFavorite ? (
              <FaHeart className="group-hover/favorite:scale-120 transition-all duration-fast" />
            ) : (
              <FaRegHeart className="group-hover/favorite:scale-120 transition-all duration-fast" />
            )}
          </>
        )}
      </button>
    </Tooltip>
  );
};
