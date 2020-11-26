interface Rectangle {
    height: number;
    width: number;
    x: number;
    y: number;
  }
  
  interface Meta {
    key: number;
    url: string;
  }
  
  export type ViewConfig = Meta & Rectangle;
  