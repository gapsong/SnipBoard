import { ViewConfig } from '../../../common/types';

export enum DashboardActionTypes {
  FETCH_REQUEST = '@@dashboard/FETCH_REQUEST',
  FETCH_SUCCESS = '@@dashboard/FETCH_SUCCESS',
  FETCH_ERROR = '@@dashboard/FETCH_ERROR',
  INIT_DASHBOARD = '@@dashboard/INIT',
  CREATE_VIEW = '@@dashboard/CREATE_VIEW',
  UPDATE_VIEW = '@@dashboard/UPDATE_VIEW',
}

export interface DashboardState {
  readonly views: ViewConfig[];
}

export interface actionType {
  type: string;
  payload?: any;
}
