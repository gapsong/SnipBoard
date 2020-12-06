import { ViewConfig } from '../../../common/types';

export enum DashboardActionTypes {
    FETCH_REQUEST = '@@dashboard/FETCH_REQUEST',
    FETCH_SUCCESS = '@@dashboard/FETCH_SUCCESS',
    FETCH_ERROR = '@@dashboard/FETCH_ERROR',
    INIT_DASHBOARD = '@@dashboard/INIT',
    CREATE_VIEW = '@@dashboard/CREATE_VIEW',
    UPDATE_VIEW = '@@dashboard/UPDATE_VIEW',
    UPDATE_URL = '@@dashboard/UPDATE_URL',
    SAVE = '@@dashboard/SAVE',
    DELETE_VIEW = '@@dashboard/DELETE_VIEW',
    ON_DRAG = '@@dashboard/ON_DRAG',
    GET_ABSOLUTE_POSITION = '@@dashboard/GET_ABSOLUTE_POSITION',
    ON_DRAG_START = '@@dashboard/ON_DRAG_START',
    ON_DRAG_END = '@@dashboard/ON_DRAG_END',
}

interface viewStructure {
    [stringifiedJson: string]: ViewConfig;
}
export interface DashboardState {
    readonly views: viewStructure;
}

export interface actionType {
    type: string;
    payload?: any;
}
