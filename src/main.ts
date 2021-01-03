import { Screen, screen, app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import isDev from 'electron-is-dev';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

let mainWindow: BrowserWindow;

const createView = () => {
    mainWindow = new BrowserWindow({
        x: 1200,
        y: 300,
        width: 600,
        height: 600,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    const startUrl = MAIN_WINDOW_WEBPACK_ENTRY;

    mainWindow.loadURL(startUrl);
    mainWindow.webContents.on('did-finish-load', () => {
        if (isDev) {
            // mainWindow.webContents.openDevTools();
        }
    });
};

app.whenReady()
    .then(createView)
    .then(() => {
        if (process.env.NODE_ENV === 'development') {
            installExtension(REACT_DEVELOPER_TOOLS).then((name: string) => console.log(`Added Extension:  ${name}`));
            installExtension(REDUX_DEVTOOLS).then((name: string) => console.log(`Added Extension:  ${name}`));
        }
    });

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('@@sendViewport', (event, arg) => {
    console.log('heyyyy', arg); // prints "heyyyy ping"
    mainWindow.webContents.send('@@sendViewport', arg);
});
