import { ActionCreator, Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { v1 as uuidv1 } from 'uuid';
import { ViewConfig } from '@types';

import { DashboardActionTypes } from './types';
import { ApplicationState } from '../index';

export type AppThunk = ActionCreator<ThunkAction<void, ApplicationState, null, Action<string>>>;

export const createView = (): AnyAction => {
    const viewConfig: ViewConfig = {
        id: uuidv1(),
        url: 'localhost:9000',
        rect: {
            x: 20,
            y: 50,
            width: 1000,
            height: 300,
        },
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

export const dragView = (dragConfig: ViewConfig): AnyAction => {
    return {
        type: DashboardActionTypes.ON_DRAG,
        payload: dragConfig,
    };
};

export const firePongAction = (): AnyAction => {
    return {
        type: 'Pong',
        payload: 'action',
    };
};
