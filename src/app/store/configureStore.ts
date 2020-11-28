import { Store, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { ApplicationState, createRootReducer } from '.';
import { createIpcMiddleware } from './middleware/ipcmiddleware';
import { initDashboard, createView, firePongAction } from './view/action';
import { PONG, CREATE_VIEW, INIT_DASHBOARD } from '../../common/channels';

// register an action creator to an ipc channel (key/channel, value/action creator)
const ipc = createIpcMiddleware({
    [PONG]: firePongAction, // receive a message
    [CREATE_VIEW]: createView, // receive a message
    [INIT_DASHBOARD]: initDashboard, // receive a message
});

export const configureStore = (history: History, initialState: ApplicationState): Store<ApplicationState> => {
    const store = createStore(
        createRootReducer(history),
        initialState,
        compose(
            applyMiddleware(routerMiddleware(history), thunk, ipc),
            // eslint-disable-next-line no-underscore-dangle
            // @ts-ignore
            window.__REDUX_DEVTOOLS_EXTENSION__
                ? // @ts-ignore
                  window.__REDUX_DEVTOOLS_EXTENSION__()
                : // @ts-ignore
                  (f) => f
        )
    );

    return store;
};
