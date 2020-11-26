import { screen, BrowserView, app, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import isDev from 'electron-is-dev';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

interface Rectangle {
  height: number;
  width: number;
  x: number;
  y: number;
}

interface Meta {
  key: number;
  url: string;
}

export type ViewConfig = Meta & Rectangle;

const storage = new Store();
let mainWindow: BrowserWindow;
const browserViews: BrowserView[] = [];

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
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
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
    mainWindow.webContents.send('initStore', storage.get('config'));
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

app
  .whenReady()
  .then(createView)
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS).then((name: string) =>
        console.log(`Added Extension:  ${name}`),
      );
      installExtension(REDUX_DEVTOOLS).then((name: string) =>
        console.log(`Added Extension:  ${name}`),
      );
    }
  });

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('createView', (event, rawViewConfig: string) => {
  const { url, x, y, width, height }: ViewConfig = JSON.parse(rawViewConfig);
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

  // Write
  storage.set('config', rawViewConfig);
});

ipcMain.on('updateViewPosition', (event, rawViewConfig: string) => {
  const { key, x, y, width, height }: ViewConfig = JSON.parse(rawViewConfig);
  const browserView = browserViews[key];
  browserView.setBounds({ x, y, width, height });
});

ipcMain.on('updateUrl', (event, rawViewConfig: string) => {
  const { key, url }: ViewConfig = JSON.parse(rawViewConfig);
  const browserView = browserViews[key];
  browserView.webContents.loadURL(url);
});
