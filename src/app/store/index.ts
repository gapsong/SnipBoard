import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { InventoryReducer } from './inventory/reducer';
import { InventoryState } from './inventory/types';

import { cartReducer } from './cart/reducer';
import { cartState } from './cart/types';

import { DashboardReducer } from './view/reducer';
import { DashboardState } from './view/types';


export interface ApplicationState {
    cart: cartState;
    inventory: InventoryState;
    dashboard: DashboardState;
}

export const createRootReducer = (history: History) =>
    combineReducers({
        cart: cartReducer,
        inventory: InventoryReducer,
        dashboard: DashboardReducer,
        router: connectRouter(history),
    });
