import { AnyAction } from 'redux';

export function send(channel: string, payload: string): AnyAction {
    return {
        type: '@@IPC',
        channel: channel,
        payload: payload,
    };
}
