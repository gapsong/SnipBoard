import { BrowserView, app, BrowserWindow, ipcMain } from 'electron';

import isDev from 'electron-is-dev';
import path from 'path';

require('electron-reload')(__dirname);

let mainWindow: BrowserWindow;

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
    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../client/index.html')}`;
    console.log(startUrl);
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

ipcMain.on('addView', (event, args) => {
    mainWindow.loadURL(args);
});
