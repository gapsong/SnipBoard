export interface Rectangle {
    height: number;
    width: number;
    x: number;
    y: number;
}

export interface ViewConfig {
    key: number;
    url?: string;
    coords?: Rectangle;
}

export interface ViewState {
    readonly views: ViewConfig[];
}
