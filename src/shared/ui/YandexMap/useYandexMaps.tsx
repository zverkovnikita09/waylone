import { useEffect, useState } from "react";
import { Ymaps } from "./types";

export const useYandexMaps = () => {
  const [ymaps, setYmaps] = useState<Ymaps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        if (window.ymaps) {
          setYmaps(window.ymaps);
          setLoading(false);
          return;
        }

        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY}&lang=ru_RU`;
          script.async = true;

          script.onload = () => resolve(undefined);
          script.onerror = () =>
            reject(new Error("Ошибка загрузки Яндекс Карт"));

          document.head.appendChild(script);
        });

        //@ts-ignore
        window.ymaps.ready(
          () => {
            setYmaps(window.ymaps);
            setLoading(false);
          },
          null,
          ["multiRouter.MultiRoute"]
        );
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadMap();
  }, []);

  return { ymaps, loading, error };
};

