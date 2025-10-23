/**
 * 
 * @param radius в метрах
 * @returns значение зума для карты
 */
export const radiusToZoom = (radius: number): number => {
  const zoomLevels = [
    { maxRadius: 500, zoom: 16 },
    { maxRadius: 1000, zoom: 15 },
    { maxRadius: 2000, zoom: 14 },
    { maxRadius: 4500, zoom: 13 },
    { maxRadius: 8000, zoom: 12 },
    { maxRadius: 15000, zoom: 11 },
    { maxRadius: Infinity, zoom: 5 }
  ];

  const level = zoomLevels.find(level => radius <= level.maxRadius);
  return level ? level.zoom : 5;
};