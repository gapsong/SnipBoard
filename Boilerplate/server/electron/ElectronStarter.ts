import { BrowserView, app, BrowserWindow, ipcMain } from 'electron';

import isDev from 'electron-is-dev';
import path from 'path';

let mainWindow: BrowserWindow;

const createView = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'Preload.js'),
        },
    });
    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../client/index.html')}`;
    mainWindow.loadURL(startUrl);

    // development
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
};

app.whenReady().then(createView);

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('toMain', (event, args) => {
    mainWindow.loadURL(args);
});
