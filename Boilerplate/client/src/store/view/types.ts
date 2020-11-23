export enum DashboardActionTypes {
    FETCH_REQUEST = "@@inventory/FETCH_REQUEST",
    FETCH_SUCCESS = "@@inventory/FETCH_SUCCESS",
    FETCH_ERROR = "@@inventory/FETCH_ERROR"
}

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

export interface DashboardState {
    readonly views: ViewConfig[];
}
