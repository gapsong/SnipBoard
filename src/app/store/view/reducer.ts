import { Reducer } from 'redux';
import { DashboardActionTypes, DashboardState, actionType } from './types';

export const initialState: DashboardState = {
    views: [],
};

const reducer: Reducer<DashboardState> = (state = initialState, action: actionType) => {
    switch (action.type) {
        case DashboardActionTypes.INIT_DASHBOARD: {
            return { ...state, views: [action.payload] };
        }
        case DashboardActionTypes.CREATE_VIEW: {
            return { ...state, views: state.views.concat(action.payload) };
        }
        case DashboardActionTypes.UPDATE_VIEW: {
            const elemIndex = state.views.findIndex((element) => action.payload.key == element.id);
            return {
                ...state,
                views: state.views.map((item, index) => {
                    if (index !== elemIndex) {
                        return item;
                    }
                    // Otherwise, this is the one we want - return an updated value
                    return {
                        ...item,
                        ...action.payload,
                    };
                }),
            };
        }
        default: {
            return state;
        }
    }
};

export { reducer as DashboardReducer };
