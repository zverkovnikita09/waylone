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
          script.src =
            "https://api-maps.yandex.ru/2.1/?apikey=bb22d247-5f51-46ab-a029-ccc1e0e3323c&lang=ru_RU";
          script.async = true;

          script.onload = () => resolve(undefined);
          script.onerror = () =>
            reject(new Error("Ошибка загрузки Яндекс Карт"));

          document.head.appendChild(script);
        });

        //@ts-ignore
        window.ymaps.ready(() => {
          setYmaps(window.ymaps);
          setLoading(false);
        });
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadMap();
  }, []);

  return { ymaps, loading, error };
};

