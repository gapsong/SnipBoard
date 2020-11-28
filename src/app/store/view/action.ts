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
        x: 0,
        y: 500,
        width: 2000,
        height: 200,
    };

    return {
        type: DashboardActionTypes.CREATE_VIEW,
        payload: viewConfig,
    };
};

export const updateViewPosition = (viewConfig: ViewConfig): AnyAction => {
    return {
        type: DashboardActionTypes.UPDATE_VIEW,
        payload: viewConfig,
    };
};

export const firePongAction = (): AnyAction => {
    return {
        type: 'Pong',
        payload: 'action',
    };
};
