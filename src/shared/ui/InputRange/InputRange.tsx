"use client";
import * as Slider from "@radix-ui/react-slider";

interface InputRangeProps {
  step?: number;
  max?: number;
  min?: number;
  initialValue?: number;
  title?: string;
  value?: number[];
  unitOfMeasurement?: string;
  onChange?: (value: number[]) => void;
}

export const InputRange = ({
  step = 1,
  max = 100,
  min = 0,
  initialValue = 0,
  title,
  value,
  unitOfMeasurement,
  onChange,
}: InputRangeProps) => (
  <div>
    <div className="flex justify-between mb-md">
      <p>{title}</p>
      <p className="font-semibold text-primary">
        {value} {unitOfMeasurement}
      </p>
    </div>
    <Slider.Root
      className="relative flex h-5 w-full touch-none select-none items-center"
      defaultValue={[initialValue]}
      max={max}
      step={step}
      min={min}
      value={value}
      onValueChange={onChange}
    >
      <Slider.Track className="relative h-[3px] grow rounded-full bg-gray-200">
        <Slider.Range className="absolute h-full rounded-full bg-primary" />
      </Slider.Track>
      <Slider.Thumb
        className="block size-5 cursor-pointer rounded-full bg-primary-600 shadow-lg focus:outline-none"
        aria-label="Volume"
      />
    </Slider.Root>
  </div>
);

