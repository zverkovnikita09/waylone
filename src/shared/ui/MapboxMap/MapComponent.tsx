import React from "react";
import { Map } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapboxMap = () => {
  return (
    <div className="flex-1">
      <Map
        mapboxAccessToken={accessToken}
        initialViewState={{
          latitude: 55.7558,
          longitude: 37.6173,
          zoom: 14,
        }}
        style={{ width: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11?language=ru"
        language="ru_Ru"
        attributionControl={false}
      />
    </div>
  );
};

export default MapboxMap;

