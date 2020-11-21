import { BrowserView, app, BrowserWindow, ipcMain } from 'electron';

import isDev from 'electron-is-dev';
import path from 'path';

require('electron-reload')(__dirname);
interface Rectangle {
    height: number;
    width: number;
    x: number;
    y: number;
}
interface ViewConfig {
    url: string;
    coords?: Rectangle;
}

let mainWindow: BrowserWindow;
let browserViews: Map<string, BrowserView> = new Map();

const createView = () => {
    mainWindow = new BrowserWindow({
        x: 5000,
        y: 5000,
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'Preload.js'),
        },
    });


    const secondView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            zoomFactor: 1.0,
            enableRemoteModule: true,
        },
    });
    mainWindow.addBrowserView(secondView);
    secondView.setBounds({ x: 0, y: 0, width: 500, height: 400 });
    console.log(__dirname)
    secondView.webContents.loadURL(
        `file://${__dirname}/public/index.html?innerWidth=${500}&innerHeight=${500}&scrollLeft?${0}&scrollTop?${0}&url=https://soundcloud.com`
    );


    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../client/index.html')}`;
    
    mainWindow.loadURL(startUrl);

    // development
    if (isDev) {
        // mainWindow.webContents.openDevTools();
    }
};

app.whenReady().then(createView);

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('updateView', (event, rawViewConfig: string) => {
    const viewConfig: ViewConfig = JSON.parse(rawViewConfig);
    let browserView = browserViews.get(viewConfig.url);
    if (browserView == undefined) {
        browserView = new BrowserView({
            webPreferences: {
                nodeIntegration: true,
                webviewTag: true,
                zoomFactor: 1.0,
                enableRemoteModule: true,
            },
        });
        mainWindow.addBrowserView(browserView);
        browserViews.set(viewConfig.url, browserView);
    }

    browserView.setBounds(viewConfig.coords);
    browserView.webContents.loadURL(viewConfig.url);
});
