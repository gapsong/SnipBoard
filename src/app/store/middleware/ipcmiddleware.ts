import { Middleware, ActionCreatorsMapObject } from 'redux';
import { REDUX_ACTION } from '@src/common/channels';

export function createIpcMiddleware(actionMap: ActionCreatorsMapObject): Middleware {
    if (typeof actionMap !== 'object') {
        throw new TypeError(`createIpc expects an events object as its first parameter, you passed type "${typeof actionMap}"`);
    }

    Object.keys(actionMap).forEach((channel) => {
        if (typeof actionMap[channel] !== 'function') {
            throw new TypeError(
                `Each key in createIpc's events object must be a dispatch-able function, key "${channel}" is of type "${typeof actionMap[
                    channel
                ]}"`
            );
        }
    });

    return ({ dispatch }) => {
        //create all listeners
        Object.keys(actionMap).forEach((channel) => {
            // receive values from electon ipc
            // @ts-ignore
            window.api.response(channel, function (...args) {
                dispatch(actionMap[channel](args));
            });
        });

        return function (next) {
            return function (action) {
                if (action.type != '@@dashboard/init')
                    // @ts-ignore
                    window.api.request(REDUX_ACTION, action);
                return next(action);
            };
        };
    };
}
