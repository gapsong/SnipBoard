import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { DashboardReducer } from './view/reducer';
import { DashboardState } from './view/types';


export interface ApplicationState {
    dashboard: DashboardState;
}

export const createRootReducer = (history: History) =>
    combineReducers({
        dashboard: DashboardReducer,
        router: connectRouter(history),
    });
