export interface MapOptions {
  center: number[];
  zoom: number;
  controls?: string[];
}
export interface Ymaps {
  Map: {
    new(element: HTMLElement | string, options: MapOptions): Map;
    setZoom(zoom: number): void;
    getZoom(): number;
    setCenter(center: number[]): void;
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
      disable(behavior: string): void;
      enable(behavior: string): void;
    };
    destroy(): void;
  }

  Placemark: {
    new(coordinates: number[], properties?: any, options?: any): Placemark;
  }

  ready: (callback: () => void) => void;
}