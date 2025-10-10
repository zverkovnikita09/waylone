import { createContext, PropsWithChildren, useContext } from "react";

interface MapContextType {}

const MapContext = createContext<MapContextType | null>(null);

export const MapContextProvider = ({ children }: PropsWithChildren) => {
  return <MapContext.Provider value={{}}>{children}</MapContext.Provider>;
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

