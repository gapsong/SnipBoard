import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { DashboardActionTypes, actionType } from './types';
import { ViewConfig } from '@types';
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

export const initStore = (data: string): actionType => {
    return {
        type: DashboardActionTypes.INIT_DASHBOARD,
        payload: data,
    };
};

export const createView = (): actionType => {
    const viewConfig: ViewConfig = {
        key: 0,
        url: 'https://reddit.com',
        x: 0,
        y: 500,
        width: 2000,
        height: 200,
    };
    // eslint-disable-next-line no-underscore-dangle
    // @ts-ignore
    window.api.request('createView', JSON.stringify(viewConfig));

    return {
        type: DashboardActionTypes.CREATE_VIEW,
        payload: viewConfig,
    };
};
