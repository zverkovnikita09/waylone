export interface MapOptions {
  center: number[];
  zoom: number;
  controls?: string[];
}

export interface YandexMap {
  setZoom(zoom: number): void;
  getZoom(): number;
  setCenter(center: number[], zoom?: number): void;
  getCenter(): number[];
  options: {
    set(options: Record<string, any>): void;
  };
  controls: {
    add(control: string | any, options?: any): void;
    remove(control: string): void;
  };
  events: {
    add(event: string, callback: Function): void;
  };
  geoObjects: {
    add(object: any): void;
  };
  behaviors: {
    disable(behavior: string | string[]): void;
    enable(behavior: string): void;
  };
  layers: any;
  destroy(): void;
}

export interface Ymaps {
  Map: {
    new(element: HTMLElement | string, options: MapOptions): YandexMap;
  };

  Placemark: {
    new(coordinates: number[], properties?: any, options?: any): any;
  };

  GeoObjectCollection: {
    new(): any;
  };

  geocode: (coordinates: number[] | string, options?: any) => Promise<any>;

  ready: (callback: () => void, errorCallback?: any, modules?: string[]) => void;
}