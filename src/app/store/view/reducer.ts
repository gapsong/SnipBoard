import { Reducer } from 'redux';
import { DashboardActionTypes, DashboardState, actionType } from './types';

export const initialState: DashboardState = {
    views: [],
};

const reducer: Reducer<DashboardState> = (state = initialState, action: actionType) => {
    switch (action.type) {
        case DashboardActionTypes.INIT_DASHBOARD: {
            return { ...state, ...action.payload };
        }
        case DashboardActionTypes.CREATE_VIEW: {
            return { ...state, views: state.views.concat(action.payload) };
        }
        default: {
            return state;
        }
    }
};

export { reducer as DashboardReducer };
