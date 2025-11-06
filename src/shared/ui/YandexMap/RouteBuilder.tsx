import { filterPointsWithinRadius, Point } from "@/shared/lib/mapUtils";
import { useEffect, useRef } from "react";
import { useMapContext } from "./MapContext";

interface RouteBuilderProps {
  onRouteBuilded?: (
    params: {
      distance: number;
      duration: number;
    }[]
  ) => void;
  coords?: Point[];
  searchRadius?: number;
}

export const RouteBuilder = ({
  coords,
  onRouteBuilded,
  searchRadius,
}: RouteBuilderProps) => {
  const { ymaps, geoObjects } = useMapContext();
  const multiRouteRef = useRef<any>(null);

  useEffect(() => {
    if (!ymaps || !geoObjects.current || multiRouteRef.current) return;

    const objectsToRemove: any[] = [];
    geoObjects.current.each((obj: any) => {
      //@ts-ignore
      if (obj instanceof ymaps.multiRouter.MultiRoute) {
        objectsToRemove.push(obj);
      }
    });

    objectsToRemove.forEach((obj) => geoObjects.current?.remove(obj));

    //@ts-ignore
    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [],
        params: { routingMode: "pedestrian", results: 1 },
      },
      {
        routeActiveIndex: 0,
        wayPointVisible: false,
        reverseGeocoding: false,
        pinVisible: false,
        routeActivePedestrianSegmentStrokeStyle: "solid",
        routeActivePedestrianSegmentStrokeColor: "#00CDCD",
        routeActiveMarkerVisible: false,
        routeOpenBalloonOnClick: false,
      }
    );

    multiRoute.model.events.add("requestsuccess", () => {
      const activeRoute = multiRoute.getActiveRoute();
      if (!activeRoute) return;
      activeRoute.options.set("interactive", false);
      activeRoute.options.set("cursor", "default");

      const paths = activeRoute.getPaths();
      if (!paths || paths.getLength() === 0) {
        console.error("Пути маршрута отсутствуют");
        return;
      }

      const distanceAndDurationList = [];

      for (let i = 0; i < paths.getLength(); i++) {
        const path = paths.get(i);
        distanceAndDurationList.push({
          distance: path.properties.get("distance").value,
          duration: path.properties.get("duration").value,
        });
      }
      onRouteBuilded?.(distanceAndDurationList);
    });
    multiRouteRef.current = multiRoute;
    geoObjects.current.add(multiRoute);
  }, [ymaps, geoObjects.current, multiRouteRef.current]);

  useEffect(() => {
    if (!multiRouteRef.current) return;
    if (!coords?.length || coords.length === 1) {
      multiRouteRef.current.model.setReferencePoints([]);
      onRouteBuilded?.([]);
      return;
    }
    multiRouteRef.current.model.setReferencePoints(coords);
  }, [coords?.length, multiRouteRef.current]);

  const buildRoute = () => {
    if (!multiRouteRef.current || !coords || !searchRadius) return;
    const filteredPlacemarks = filterPointsWithinRadius(
      [55.76, 37.64],
      coords,
      searchRadius / 1000
    );

    multiRouteRef.current.model.setReferencePoints(filteredPlacemarks);
  };
  return null;
};

