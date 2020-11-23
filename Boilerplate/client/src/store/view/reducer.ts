import { Reducer } from 'redux';
import { DashboardState } from './types';

interface actionType {
    type: string;
    payload?: any;
}

export const initialState: DashboardState = {
    views: [],
};

const reducer: Reducer<DashboardState> = (state = initialState, action: actionType) => {
    switch (action.type) {
        case 'InitStore': {
            return { ...state, views: action.payload };
        }
        default: {
            return state;
        }
    }
};

export { reducer as DashboardReducer };
