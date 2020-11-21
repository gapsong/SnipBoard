import Electron from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

export default class Main {
    private static application: Electron.App;
    private static BrowserWindow: typeof Electron.BrowserWindow;
    private static mainWindow: Electron.BrowserWindow;

    public static main(app: Electron.App, browserWindow: typeof Electron.BrowserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        Main.application.on('activate', Main.onActivate);
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
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
        Main.mainWindow.loadURL(startUrl);

        // development
        if (isDev) {
            Main.mainWindow.webContents.openDevTools();
        }

        Main.mainWindow.on('closed', Main.onClose);
    }

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onActivate() {
        if (Main.mainWindow === null) {
            Main.onReady();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }
}

Main.main(Electron.app, Electron.BrowserWindow);

Electron.ipcMain.on('toMain', (event, args) => {
    console.log(args);
});
