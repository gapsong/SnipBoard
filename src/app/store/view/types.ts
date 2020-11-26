export enum DashboardActionTypes {
    FETCH_REQUEST = '@@dashboard/FETCH_REQUEST',
    FETCH_SUCCESS = '@@dashboard/FETCH_SUCCESS',
    FETCH_ERROR = '@@dashboard/FETCH_ERROR',
    INIT_DASHBOARD = '@@dashboard/INIT',
    CREATE_VIEW = '@@dashboard/CREATE_VIEW',
}

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

export type ViewConfig = Meta & Rectangle ;

export interface DashboardState {
    readonly views: ViewConfig[];
}

export interface actionType {
    type: string;
    payload?: any;
}
