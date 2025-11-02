"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FavoriteButton } from "@/shared/ui/FavoriteButton";
import { ShareButton } from "@/shared/ui/ShareButton";

interface SliderProps {
  images: string[];
  showCounter?: boolean;
  onLike?: () => void;
  onShare?: () => void;
}

export const Slider = ({
  images,
  onLike,
  onShare,
  showCounter,
}: SliderProps) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextButtonClick = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handlePrevButtonClick = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  useEffect(() => {
    if (!swiperRef.current || !prevRef.current || !nextRef.current) return;

    const swiper = swiperRef.current;
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }, [swiperRef.current, prevRef.current, nextRef.current]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md group select-none">
      <Swiper
        modules={[Navigation /* Pagination */]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        effect="slide"
        loop
        // pagination={{ clickable: true }}
        speed={500}
        className="relative h-[500px]"
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              fill
              src={src}
              alt={`slide-${index}`}
              className="object-cover object-top"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={nextRef}
        onClick={handleNextButtonClick}
        type="button"
        className="absolute right-md top-1/2 bg-main-bg h-[50px] z-1 w-[50px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer opacity-10 group-hover:opacity-100 hover:scale-110"
      >
        <FaLongArrowAltRight />
      </button>

      <button
        ref={prevRef}
        onClick={handlePrevButtonClick}
        type="button"
        className="absolute left-md top-1/2 bg-main-bg h-[50px] w-[50px] z-1 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer opacity-10 group-hover:opacity-100 hover:scale-110"
      >
        <FaLongArrowAltLeft />
      </button>

      {showCounter && (
        <p className="counter text-white absolute bottom-md right-md rounded-2xl z-1 bg-black/70 px-lg py-sm text-sm font-semibold min-w-[70px] flex justify-center">
          {currentSlide + 1} / {images.length}
        </p>
      )}

      {(onLike || onShare) && (
        <div className="absolute z-1 top-md right-md transition-all duration-base opacity-10 group-hover:opacity-100 flex gap-md">
          {onLike && <FavoriteButton />}
          {onShare && <ShareButton />}
        </div>
      )}
    </div>
  );
};

