import { useState, useEffect, useRef } from "react";

export interface UseGeolocationOptions extends PositionOptions {

}

export type GeolocationPermissionState = PermissionState | null;

export interface UseGeolocationReturn {
  coords: GeolocationCoordinates | null;
  error: GeolocationPositionError | Error | null;
  isLoading: boolean;
  permission: GeolocationPermissionState;
}

/**
 * useGeolocation — React-хук для точного отслеживания координат пользователя.
 *
 * @param {Object} options
 * @param {boolean} [options.enableHighAccuracy=true] — использовать GPS при возможности
 * @param {number} [options.timeout=10000] — максимум времени на получение координат (мс)
 * @param {number} [options.maximumAge=0] — кэш времени координат (мс)
 * @returns {{
 *   coords: GeolocationCoordinates | null,
 *   error: GeolocationPositionError | null,
 *   isLoading: boolean,
 *   permission: 'granted' | 'denied' | 'prompt' | null
 * }}
 */
export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<GeolocationPositionError | Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [permission, setPermission] = useState<GeolocationPermissionState>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError(new Error("Geolocation не поддерживается в этом браузере"));
      setIsLoading(false);
      return;
    }

    // Проверка прав доступа (через Permissions API)
    if ("permissions" in navigator && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((status) => {
          setPermission(status.state);
          status.onchange = () => setPermission(status.state);
        })
        .catch(() => setPermission(null));
    }

    const opts: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      ...options,
    };

    // Начинаем отслеживать позицию
    watchId.current = navigator.geolocation.watchPosition(
      (pos: GeolocationPosition) => {
        setCoords(pos.coords);
        setError(null);
        setIsLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError(err);
        setIsLoading(false);
      },
      opts
    );

    // Очистка при размонтировании
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  return { coords, error, isLoading, permission };
}
