import { Screen, screen, BrowserView, app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import { ViewConfig, DragConfig } from '@types';
import { REDUX_ACTION, INIT_DASHBOARD } from '@src/common/channels';
import { DashboardActionTypes } from '@src/app/store/view/types';
import { AnyAction } from 'redux';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

let mainWindow: BrowserWindow;
const browserViews: Map<string, BrowserView> = new Map<string, BrowserView>();
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
        mainWindow.webContents.send(INIT_DASHBOARD, { state: 123 });
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

let oldBounds;

ipcMain.on(REDUX_ACTION, (event, action: AnyAction) => {
    switch (action.type) {
        case DashboardActionTypes.CREATE_VIEW:
            {
                const { id, url, x, y, width, height }: ViewConfig = action.payload;
                const browserView = new BrowserView({
                    webPreferences: {
                        nodeIntegration: false,
                        worldSafeExecuteJavaScript: true,
                        contextIsolation: true,
                        webviewTag: true,
                        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
                    },
                });
                mainWindow.addBrowserView(browserView);
                browserViews.set(id, browserView);
                browserView.setBounds({ x, y, width, height });
                // browserView.webContents.loadURL(`file://${__dirname}/static/main_window/index.html`);
                browserView.webContents.loadURL(`http://localhost:8080?bvid=${id}`);
                if (isDev) {
                    // browserView.webContents.openDevTools();
                }
            }
            break;
        case DashboardActionTypes.UPDATE_URL:
            {
                const { id, url } = action.payload;
                const browserView = browserViews.get(id);
                browserView.webContents.loadURL(url);
            }
            break;
        case DashboardActionTypes.UPDATE_VIEW:
            {
                const { id, x, y, width, height }: ViewConfig = action.payload;
                const browserView = browserViews.get(id);
                browserView.setBounds({ x, y, width, height });
            }
            break;
        case DashboardActionTypes.DELETE_VIEW:
            {
                const { id }: ViewConfig = action.payload;
                const bv = browserViews.get(id);
                // @ts-ignore
                bv.webContents.destroy();
                mainWindow.removeBrowserView(bv);
                browserViews.delete(action.payload);
            }
            break;
        case DashboardActionTypes.ON_DRAG_START:
            {
                const { id } = action.payload;
                const browserView = browserViews.get(id);
                oldBounds = browserView.getBounds();
                mainWindow.removeBrowserView(browserView);
                mainWindow.addBrowserView(browserView);
                const mainWindowBounds = mainWindow.getBounds();
                browserView.setBounds({ x: 0, y: 0, width: mainWindowBounds.width, height: mainWindowBounds.height });
            }
            break;
        case DashboardActionTypes.ON_DRAG:
            {
                console.log(action)
                mainWindow.webContents.send(REDUX_ACTION, action);
            }
            break;
        case DashboardActionTypes.ON_DRAG_END:
            {
                const { id, x, y }: DragConfig = action.payload;
                const browserView = browserViews.get(id);
                // @ts-ignore
                browserView.setBounds(Object.assign(oldBounds, { x: x, y: y }));
            }
            break;
    }
});
