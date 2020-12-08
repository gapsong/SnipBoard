import { Screen, screen, BrowserView, app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

let mainWindow: BrowserWindow;
let electronScreen: Screen;

const createView = () => {
    electronScreen = screen;
    const displays = electronScreen.getAllDisplays();
    let externalDisplay = null;
    for (const i in displays) {
        if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
            externalDisplay = displays[i];
            break;
        }
    }

    if (externalDisplay) {
        mainWindow = new BrowserWindow({
            x: externalDisplay.bounds.x + 1200,
            y: externalDisplay.bounds.y + 300,
            width: 900,
            height: 600,
            webPreferences: {
                webviewTag: true,
                nodeIntegration: false,
                worldSafeExecuteJavaScript: true,
                contextIsolation: true,
            },
        });
    }

    const startUrl = MAIN_WINDOW_WEBPACK_ENTRY;

    mainWindow.loadURL(startUrl);
    mainWindow.webContents.on('did-finish-load', () => {
        if (isDev) {
            mainWindow.webContents.openDevTools();
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
