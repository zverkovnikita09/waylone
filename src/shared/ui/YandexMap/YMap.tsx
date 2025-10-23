"use client";
import {
  Children,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useYandexMaps } from "./useYandexMaps";
import { MapContextProvider } from "./MapContext";
import { isPlacemarkElement, PlacemarkElement } from "./Placemark";
import { filterPointsWithinRadius, Point } from "@/shared/lib/mapUtils";
import { radiusToZoom } from "@/shared/lib/radiusToZoom";
import { Button } from "../Button";

interface YMapProps {
  choosenPoints?: Point[];
  handleSetDistanceAndDuration: (
    params: {
      distance: number;
      duration: number;
    }[]
  ) => void;
  searchRadius: number;
}

export const YMap = memo(
  ({
    searchRadius = 0,
    children,
    choosenPoints,
    handleSetDistanceAndDuration,
  }: PropsWithChildren<YMapProps>) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const geoObjects = useRef(null);
    const circleRef = useRef<any>(null);
    const { ymaps, loading, error } = useYandexMaps();

    const placemarks = useMemo(
      () =>
        Children.toArray(children).filter((child): child is PlacemarkElement =>
          isPlacemarkElement(child)
        ),
      [children]
    );

    const multiRouteRef = useRef(null);

    useEffect(() => {
      if (ymaps && mapRef.current) {
        const map = new ymaps.Map(mapRef.current, {
          center: [55.76, 37.64],
          zoom: radiusToZoom(searchRadius || 10),
          controls: [],
        });

        map.options.set({
          copyrightLogoVisible: false,
          copyrightProvidersVisible: false,
          copyrightUaVisible: false,
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        });

        map.behaviors.disable("dblClickZoom");
        geoObjects.current = new ymaps.GeoObjectCollection();
        map.geoObjects.add(geoObjects.current);

        mapInstance.current = map;
      }
    }, [ymaps, mapRef]);

    useEffect(() => {
      if (
        mapInstance.current &&
        geoObjects.current &&
        ymaps &&
        typeof searchRadius === "number"
      ) {
        mapInstance.current.setZoom(radiusToZoom(searchRadius));

        if (circleRef.current) {
          geoObjects.current.remove(circleRef.current);
        }

        const circle = new ymaps.Circle(
          [[55.76, 37.64], searchRadius],
          {},
          {
            fillColor: "rgba(0, 0, 255, 0.1)",
            strokeColor: "#0000FF",
            strokeWidth: 2,
            interactive: false,
            cursor: "default",
            draggable: false,
          }
        );

        geoObjects.current.add(circle);
        circleRef.current = circle;
      }
    }, [searchRadius]);

    useEffect(() => {
      if (!placemarks.length || !ymaps || !geoObjects.current) return;

      const objectsToRemove = [];
      geoObjects.current.each((obj) => {
        if (obj instanceof ymaps.Placemark) {
          objectsToRemove.push(obj);
        }
      });
      objectsToRemove.forEach((obj) => geoObjects.current.remove(obj));

      // Добавляем новые метки
      placemarks.forEach((placemark) => {
        const yPlacemark = new ymaps.Placemark(
          placemark.props.coords,
          {
            balloonContent: placemark.props.balloonContent,
            hintContent: placemark.props.hintContent,
          },
          placemark.props.options
        );

        if (placemark.props.onClick) {
          yPlacemark.events.add("click", placemark.props.onClick);
        }

        geoObjects.current.add(yPlacemark);
      });
    }, [placemarks, ymaps, searchRadius]);

    useEffect(() => {
      if (!ymaps || !geoObjects.current) return;
      const objectsToRemove: any[] = [];
      geoObjects.current.each((obj) => {
        if (obj instanceof ymaps.multiRouter.MultiRoute) {
          objectsToRemove.push(obj);
        }
      });
      objectsToRemove.forEach((obj) => geoObjects.current.remove(obj));

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
        var activeRoute = multiRoute.getActiveRoute();
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
        handleSetDistanceAndDuration(distanceAndDurationList);
      });
      multiRouteRef.current = multiRoute;
      geoObjects.current.add(multiRoute);
    }, [ymaps]);

    useEffect(() => {
      if (!multiRouteRef.current) return;
      if (!choosenPoints?.length || choosenPoints.length === 1) {
        multiRouteRef.current.model.setReferencePoints([]);
        handleSetDistanceAndDuration([]);
        return;
      }
      if (choosenPoints.length > 1) {
        multiRouteRef.current.model.setReferencePoints(choosenPoints);
      }
    }, [choosenPoints?.length]);

    const buildRoute = () => {
      if (!geoObjects.current || !ymaps || !multiRouteRef.current) return;
      const filteredPlacemarks = filterPointsWithinRadius(
        [55.76, 37.64],
        placemarks,
        searchRadius / 1000
      );

      multiRouteRef.current.model.setReferencePoints(
        filteredPlacemarks.map(({ props }) => props.coords)
      );
    };    

    if (loading) return <div className="h-full w-full">Загрузка карты...</div>;
    if (error)
      return <div className="h-full w-full">Ошибка: {error.message}</div>;

    return (
      <MapContextProvider>
        <div className="flex-1 flex">
          <div ref={mapRef} className="flex-1" />;
          <div className="absolute bottom-[20px] text-sm right-[20px] bg-white shadow-md flex gap-sm items-center px-lg py-md rounded-lg">
            <div className="rounded-full bg-success w-md h-md" />
            <p>Москва, Тверская улица</p>
          </div>
          <div className="absolute bottom-[20px] text-sm left-[20px] bg-white shadow-md flex gap-sm items-center px-lg py-md rounded-lg">
            <Button onClick={buildRoute}>Построить маршрут</Button>
          </div>
        </div>
      </MapContextProvider>
    );
  }
);

