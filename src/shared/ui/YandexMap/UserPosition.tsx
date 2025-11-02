import PositionIcon from "./Position.png";
import { useEffect, useRef, useState } from "react";
import { useMapContext } from "./MapContext";
import { Point } from "@/shared/lib/mapUtils";

interface UserPositionProps {
  userPosition: Point | null;
}

export const UserPosition = ({ userPosition }: UserPositionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  const { ymaps, mapInstance, geoObjects } = useMapContext();

  const userPointRef = useRef<any>(null);

  const getAddress = async () => {
    if (!userPosition) return;
    setIsLoading(true);
    const res = await ymaps.geocode(userPosition);
    const firstGeoObject = res.geoObjects.get(0);
    const address = firstGeoObject.getAddressLine();

    setIsLoading(false);
    setUserAddress(address);
  };

  useEffect(() => {
    if (!userPosition || !geoObjects.current) return;

    const positionPlacemark = new ymaps.Placemark(
      userPosition,
      {
        // balloonContent: placemark.props.balloonContent,
        // hintContent: placemark.props.hintContent,
      },
      {
        iconLayout: "default#image",
        iconImageSize: [10, 10],
        iconImageHref: PositionIcon.src,
        iconImageOffset: [0, 0],
      }
    );

    geoObjects.current.add(positionPlacemark);

    getAddress();

    return () => {
      geoObjects.current?.remove(userPointRef.current);
    };
  }, [userPosition]);

  const goToUserPosition = () => {
    if (!mapInstance.current || !userPosition) return;
    mapInstance.current.setZoom(15);
    mapInstance.current.panTo(userPosition, {
      flying: true,
      duration: 1000,
    });
  };

  return (
    <div
      className="absolute bottom-[30px] text-sm right-[20px] bg-white shadow-md flex gap-sm items-center px-lg py-md rounded-lg cursor-pointer"
      onClick={goToUserPosition}
    >
      <div className="rounded-full bg-success w-md h-md" />
      <p>{isLoading && "Получаем адрес..."}</p>
      <p>{!isLoading && userAddress}</p>
    </div>
  );
};

