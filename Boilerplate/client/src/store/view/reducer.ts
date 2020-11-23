import { Reducer } from 'redux';
import { ViewState } from './types';

interface actionType {
    type: string;
    payload?: any;
}

export const initialState: ViewState = {
    views: [],
};

const reducer: Reducer<ViewState> = (state = initialState, action: actionType) => {
    switch (action.type) {
        case 'InitStore': {
            return { ...state, views: action.payload };
        }
        default: {
            return state;
        }
    }
};

export { reducer as ViewReducer };
