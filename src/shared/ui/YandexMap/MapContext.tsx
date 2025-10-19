import { createContext, PropsWithChildren, useContext, useState } from "react";

interface MapContextType {
  placemark: any[];
  setPlacemarks: (objects: []) => void;
}

const MapContext = createContext<MapContextType | null>(null);

export const MapContextProvider = ({ children }: PropsWithChildren) => {
  const [placemark, setPlacemarks] = useState([]);
  return (
    <MapContext.Provider value={{ placemark, setPlacemarks }}>
      {children}
    </MapContext.Provider>
  );
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

