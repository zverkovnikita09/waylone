import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useState,
} from "react";
import { Ymaps } from "./types";

interface MapContextType {
  ymaps: Ymaps;
  geoObjects: RefObject<null | Record<string, any>>;
  mapInstance: RefObject<null | Record<string, any>>;
}

const MapContext = createContext<MapContextType | null>(null);

export const MapContextProvider = ({
  children,
  ...props
}: PropsWithChildren<MapContextType>) => {
  return <MapContext.Provider value={props}>{children}</MapContext.Provider>;
};

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error(
      "hook useMapContext can be used only inside MapContextProvider"
    );
  }

  return context;
};

