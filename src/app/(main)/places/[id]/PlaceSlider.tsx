"use client";
import { Slider } from "@/shared/ui/Slider";

interface PlaceSliderProps {
  images: string[];
}

export const PlaceSlider = ({ images }: PlaceSliderProps) => {
  return (
    <Slider images={images} onLike={() => {}} onShare={() => {}} showCounter />
  );
};

