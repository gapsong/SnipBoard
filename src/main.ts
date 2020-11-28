import { screen, BrowserView, app, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import isDev from 'electron-is-dev';
import { ViewConfig } from '@types';
import { PONG, CREATE_VIEW, INIT_DASHBOARD, UPDATE_VIEW_POSITION, UPDATE_URL } from '@src/common/channels';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

interface ElectronStore {
    viewConfigs: ViewConfig[];
}
const storage = new Store<ElectronStore>();

let mainWindow: BrowserWindow;
const browserViews: BrowserView[] = [];

const viewConfigs = storage.get('viewConfigs') || [];

const createView = () => {
    const electronScreen = screen;
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
                nodeIntegration: false,
                worldSafeExecuteJavaScript: true,
                contextIsolation: true,
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
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

    const startUrl = MAIN_WINDOW_WEBPACK_ENTRY;

    mainWindow.loadURL(startUrl);
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send(INIT_DASHBOARD, viewConfigs);
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
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

ipcMain.on(CREATE_VIEW, (event, rawViewConfig: string) => {
    const parsedJson = JSON.parse(rawViewConfig);
    const { url, x, y, width, height }: ViewConfig = parsedJson;
    const browserView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            zoomFactor: 1.0,
            enableRemoteModule: true,
        },
    });
    mainWindow.addBrowserView(browserView);

    browserViews.push(browserView);

    browserView.setBounds({ x, y, width, height });
    browserView.webContents.loadURL(url);

    viewConfigs.push(parsedJson);

    // Write
    storage.set('viewConfigs', viewConfigs);
});

ipcMain.on(UPDATE_VIEW_POSITION, (event, rawViewConfig: string) => {
    const { key, x, y, width, height }: ViewConfig = JSON.parse(rawViewConfig);
    const browserView = browserViews[key];
    browserView.setBounds({ x, y, width, height });
});

ipcMain.on(UPDATE_URL, (event, rawViewConfig: string) => {
    const { key, url }: ViewConfig = JSON.parse(rawViewConfig);
    const browserView = browserViews[key];
    browserView.webContents.loadURL(url);
});

ipcMain.on(PONG, (event, rawViewConfig: string) => {
    console.log('pong in electorn', rawViewConfig);
    // mainWindow.webContents.send(PONG, JSON.stringify({ key: '123' }), '1234');
});
