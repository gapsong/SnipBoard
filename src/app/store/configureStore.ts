import { Store, createStore, applyMiddleware, compose, ActionCreatorsMapObject, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { ApplicationState, createRootReducer } from '.';

const initListener = () => {
    //create all listeners
    // @ts-ignore
    window.api.response('@@sendViewport', function (args) {
        console.log(args);
    });
};

initListener()

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
