export type Point = [number, number]

const LATITUDE = 0;
const LONGITUDE = 1;

const EARTH_RADIUS_IN_KM = 6371;

/**
 * Функция для вычисления расстояния между двумя координатами в км
 * (формула Хаверсинуса)
 */
export function getDistanceInKm(p1: Point, p2: Point): number {
  const R = EARTH_RADIUS_IN_KM;
  const dLat = degToRad(p2[LATITUDE] - p1[LATITUDE]);
  const dLng = degToRad(p2[LONGITUDE] - p1[LONGITUDE]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(p1[LATITUDE])) *
    Math.cos(degToRad(p2[LATITUDE])) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

function radTodeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Фильтрация точек, попадающих в круг радиусом radiusKm
 */
export function filterPointsWithinRadius(
  current: Point,
  points: Point[],
  radiusKm: number
): Point[] {
  return points.filter(point => getDistanceInKm(current, point) <= radiusKm);
}

/**
 * Возвращает координаты точки на окружности
 * @param center координаты центра
 * @param radiusKm радиус окружности в км
 * @param bearingDeg угол (азимут) в градусах (0° — север, 90° — восток и т.д.)
 */
export function getPointOnCircle(center: Point, radiusKm: number, bearingDeg: number): Point {
  const R = EARTH_RADIUS_IN_KM;
  const bearing = degToRad(bearingDeg);
  const lat1 = degToRad(center[LATITUDE]);
  const lng1 = degToRad(center[LONGITUDE]);
  const dR = radiusKm / R; // угловое расстояние

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(dR) +
    Math.cos(lat1) * Math.sin(dR) * Math.cos(bearing)
  );

  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(dR) * Math.cos(lat1),
      Math.cos(dR) - Math.sin(lat1) * Math.sin(lat2)
    );

  return [
    radTodeg(lat2),
    radTodeg(lng2),
  ];
}