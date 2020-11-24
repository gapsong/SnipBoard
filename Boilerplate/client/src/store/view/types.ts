export enum DashboardActionTypes {
    FETCH_REQUEST = "@@dashboard/FETCH_REQUEST",
    FETCH_SUCCESS = "@@dashboard/FETCH_SUCCESS",
    FETCH_ERROR = "@@dashboard/FETCH_ERROR",
    INIT_DASHBOARD = "@@dashboard/INIT"
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

export interface actionType {
    type: string;
    payload?: any;
}
