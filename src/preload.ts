import { contextBridge, ipcRenderer } from 'electron';
import { PONG, CREATE_VIEW, INIT_DASHBOARD, UPDATE_VIEW_POSITION, UPDATE_URL, SEND_VIEWPORT } from '@src/common/channels';

const validChannels = [PONG, UPDATE_URL, INIT_DASHBOARD, UPDATE_VIEW_POSITION, CREATE_VIEW, SEND_VIEWPORT];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
    MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: __dirname,
    //send: (channel, data) => {
    request: (data: string) => {
        // whitelist channels
        // @ts-ignore
        ipcRenderer.send(SEND_VIEWPORT, data);
    },
    //receive: (channel, func) => {
    response: (channel: string, func: any) => {
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    //receive: (channel, func) => {
    removeListener: (channel: string, func: any) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.removeListener(channel, (event, ...args) => func(...args));
        }
    },
    removeAllListeners: (channel: string) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.removeAllListeners(channel);
        }
    },
});
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, (process.versions as any)[type]);
    }
});
