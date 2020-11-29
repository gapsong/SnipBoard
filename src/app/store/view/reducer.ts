import { Reducer } from 'redux';
import { DashboardActionTypes, DashboardState, actionType } from './types';

export const initialState: DashboardState = {
    views: {},
};

const reducer: Reducer<DashboardState> = (state = initialState, action: actionType) => {
    switch (action.type) {
        case DashboardActionTypes.INIT_DASHBOARD: {
            return { ...state, ...action.payload };
        }
        case DashboardActionTypes.CREATE_VIEW: {
            return { ...state, views: { ...state.views, [action.payload.id]: action.payload } };
        }
        case DashboardActionTypes.DELETE_VIEW: {
            delete state.views[action.payload];
            return { ...state, views: { ...state.views } };
        }
        default: {
            return state;
        }
    }
};

export { reducer as DashboardReducer };
