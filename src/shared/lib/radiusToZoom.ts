export const radiusToZoom = (radius: number): number => {
  const zoomLevels = [
    { maxRadius: 1, zoom: 17 },
    { maxRadius: 3, zoom: 16 },
    { maxRadius: 5, zoom: 16 },
    { maxRadius: 7, zoom: 14 },
    { maxRadius: 10, zoom: 13 },
    { maxRadius: 15, zoom: 12 },
    { maxRadius: 20, zoom: 11 },
    { maxRadius: 25, zoom: 10 },
    { maxRadius: 30, zoom: 9 },
    { maxRadius: 35, zoom: 8 },
    { maxRadius: 40, zoom: 7 },
    { maxRadius: 45, zoom: 6 },
    { maxRadius: Infinity, zoom: 5 }
  ];

  const level = zoomLevels.find(level => radius <= level.maxRadius);
  return level ? level.zoom : 5;
};