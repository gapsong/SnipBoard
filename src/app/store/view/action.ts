import { ActionCreator, Action, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { v1 as uuidv1 } from 'uuid';
import { ViewConfig } from '@types';

import { DashboardActionTypes, actionType } from './types';
import { ApplicationState } from '../index';

export type AppThunk = ActionCreator<ThunkAction<void, ApplicationState, null, Action<string>>>;

export const fetchRequest: AppThunk = () => {
    return (dispatch: Dispatch) => {
        try {
            dispatch({
                type: DashboardActionTypes.FETCH_REQUEST,
            });

            return axios({
                method: 'GET',
                url: 'http://localhost:3001/products',
                responseType: 'json',
            }).then((response) =>
                dispatch({
                    type: DashboardActionTypes.FETCH_SUCCESS,
                    payload: response.data,
                })
            );
        } catch (e) {
            return dispatch({
                type: DashboardActionTypes.FETCH_ERROR,
            });
        }
    };
};

export const initDashboard = (data: string): actionType => {
    return {
        type: DashboardActionTypes.INIT_DASHBOARD,
        payload: data,
    };
};

export const createView = (): AnyAction => {
    const viewConfig: ViewConfig = {
        id: uuidv1(),
        url: 'https://reddit.com',
        x: 20,
        y: 50,
        width: 500,
        height: 200,
    };

    return {
        type: DashboardActionTypes.CREATE_VIEW,
        payload: viewConfig,
    };
};

export const updateUrl = (id: string, url: string): AnyAction => {
    const viewConfig = {
        id,
        url,
    };

    return {
        type: DashboardActionTypes.UPDATE_URL,
        payload: viewConfig,
    };
};

export const updateViewPosition = (viewConfig: ViewConfig): AnyAction => {
    return {
        type: DashboardActionTypes.UPDATE_VIEW,
        payload: viewConfig,
    };
};

export const saveDashboard = (): AnyAction => {
    return {
        type: DashboardActionTypes.SAVE,
    };
};

export const deleteView = (id: string): AnyAction => {
    return {
        type: DashboardActionTypes.DELETE_VIEW,
        payload: { id },
    };
};

export const firePongAction = (): AnyAction => {
    return {
        type: 'Pong',
        payload: 'action',
    };
};
