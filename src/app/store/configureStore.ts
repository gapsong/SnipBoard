import { Store, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { ApplicationState, createRootReducer } from '.';

export const configureStore = (history: History, initialState: ApplicationState): Store<ApplicationState> => {
    const store = createStore(
        createRootReducer(history),
        initialState,
        compose(
            applyMiddleware(routerMiddleware(history), thunk),
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
