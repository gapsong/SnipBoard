import { ViewConfig } from '../../../common/types';

export enum DashboardActionTypes {
    CREATE_VIEW = '@@dashboard/CREATE_VIEW',
    UPDATE_VIEW = '@@dashboard/UPDATE_VIEW',
    UPDATE_URL = '@@dashboard/UPDATE_URL',
    SAVE = '@@dashboard/SAVE',
    DELETE_VIEW = '@@dashboard/DELETE_VIEW',
    ON_DRAG = '@@dashboard/ON_DRAG',
}

interface viewStructure {
    [stringifiedJson: string]: ViewConfig;
}
export interface DashboardState {
    readonly views: viewStructure;
    viewOrder: string[];
}

export interface actionType {
    type: string;
    payload?: any;
}
