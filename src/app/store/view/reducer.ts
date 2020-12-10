import { Reducer } from 'redux';
import { DashboardActionTypes, DashboardState, actionType } from './types';

export const initialState: DashboardState = {
    views: {},
    viewOrder: [],
};

const reducer: Reducer<DashboardState> = (state = initialState, action: actionType) => {
    switch (action.type) {
        case DashboardActionTypes.CREATE_VIEW: {
            return {
                ...state,
                views: { ...state.views, [action.payload.id]: action.payload },
                viewOrder: [...state.viewOrder, action.payload.id],
            };
        }
        case DashboardActionTypes.DELETE_VIEW: {
            delete state.views[action.payload.id];
            return { ...state, ...state.views, views: { ...state.views } };
        }
        case DashboardActionTypes.UPDATE_VIEW: {
            const id = action.payload.id;
            const temp = state.viewOrder.filter((item) => {
                return item !== id;
            });
            return {
                ...state,
                views: { ...state.views, ...{ [id]: action.payload } },
                viewOrder: [...temp, id],
            };
        }
        default: {
            return state;
        }
    }
};

export { reducer as DashboardReducer };
