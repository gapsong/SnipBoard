import { screen, BrowserView, app, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';

import isDev from 'electron-is-dev';
import path from 'path';

require('electron-reload')(__dirname);

const storage = new Store();
interface Rectangle {
    height: number;
    width: number;
    x: number;
    y: number;
}
interface ViewConfig {
    key: number;
    url: string;
    coords?: Rectangle;
}

let mainWindow: BrowserWindow;
let browserViews: BrowserView[] = [];

const createView = () => {
    var electronScreen = screen;
    var displays = electronScreen.getAllDisplays();
    var externalDisplay = null;
    for (var i in displays) {
        if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
            externalDisplay = displays[i];
            break;
        }
    }

    if (externalDisplay) {
        mainWindow = new BrowserWindow({
            x: externalDisplay.bounds.x + 50,
            y: externalDisplay.bounds.y + 50,
            width: 900,
            height: 600,
            webPreferences: {
                nodeIntegration: false,
                worldSafeExecuteJavaScript: true,
                contextIsolation: true,
                preload: path.join(__dirname, 'Preload.js'),
            },
        });
    }

    // const secondView = new BrowserView({
    //     webPreferences: {
    //         nodeIntegration: true,
    //         webviewTag: true,
    //         zoomFactor: 1.0,
    //         enableRemoteModule: true,
    //     },
    // });
    // mainWindow.addBrowserView(secondView);
    // secondView.setBounds({ x: 0, y: 0, width: 500, height: 400 });
    // console.log(__dirname);
    // secondView.webContents.loadURL(
    //     `file://${__dirname}/public/index.html?innerWidth=${500}&innerHeight=${500}&scrollLeft?${0}&scrollTop?${0}&url=https://soundcloud.com`
    // );

    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../client/index.html')}`;

    mainWindow.loadURL(startUrl);
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('initStore', storage.get('config'));
    });
    // development
    if (isDev) {
        mainWindow.webContents.openDevTools();

        // Install React Dev Tools
        const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS);
        installExtension(REDUX_DEVTOOLS);
    }
};

app.whenReady().then(createView);

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('createView', (event, rawViewConfig: string) => {
    console.log('crate View');
    const viewConfig: ViewConfig = JSON.parse(rawViewConfig);
    let browserView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            zoomFactor: 1.0,
            enableRemoteModule: true,
        },
    });
    mainWindow.addBrowserView(browserView);

    browserViews.push(browserView);

    browserView.setBounds(viewConfig.coords);
    browserView.webContents.loadURL(viewConfig.url);

    // Write
    storage.set('config', viewConfig);
});

ipcMain.on('updateViewPosition', (event, rawViewConfig: string) => {
    const viewConfig: ViewConfig = JSON.parse(rawViewConfig);
    let browserView = browserViews[viewConfig.key];
    browserView.setBounds(viewConfig.coords);
});

ipcMain.on('updateUrl', (event, rawViewConfig: string) => {
    const viewConfig: ViewConfig = JSON.parse(rawViewConfig);
    let browserView = browserViews[viewConfig.key];
    browserView.webContents.loadURL(viewConfig.url);
});
