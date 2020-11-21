const { BrowserView, BrowserWindow, app } = require('electron');
const startExpress = require('./server');

const viewPortConfig = {
    url: 'https://stackoverflow.com/questions/8529070/remove-portion-of-string-in-javascript',
    rect: { width: '1516px', height: '123px', x: 31, y: 311 },
    browserSettings: { innerWidth: 1848, innerHeight: 756, scrollTop: 0, scrollLeft: 0 },
};

const rect = viewPortConfig.rect;
const width = parseInt(viewPortConfig.rect.width, 10);
const height = parseInt(viewPortConfig.rect.height, 10);

const innerWidth = viewPortConfig.browserSettings.innerWidth;
const innerHeight = viewPortConfig.browserSettings.innerHeight;
const scrollLeft = viewPortConfig.browserSettings.scrollLeft;
const scrollTop = viewPortConfig.browserSettings.scrollTop;

const createView = () => {
    const win = new BrowserWindow({ x: 5000, y: 5000, width: 1500, height: 500 });

    // const view = new BrowserView();
    // win.addBrowserView(view)

    // view.setBounds({ x: 0, y: 0, width: width, height: height })
    // view.webContents.loadURL(viewPortConfig.url)

    // view.webContents.on('did-finish-load', async () => {
    //     await view.webContents.insertCSS(`html, body {position: relative; width: ${innerWidth}px; height:${innerHeight}px }`)

    //     view.webContents.executeJavaScript(`window.scrollTo(${rect.x}, ${rect.y}) `, true)
    // })

    const secondView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            zoomFactor: 1.0,
            enableRemoteModule: true,
        },
    });
    win.addBrowserView(secondView);
    secondView.setBounds({ x: 0, y: 0, width: width + 16, height: height });
    secondView.webContents.loadURL(
        `file://${__dirname}/index.html?innerWidth=${innerWidth}&innerHeight=${innerHeight}&scrollLeft?${scrollLeft}&scrollTop?${scrollTop}&url=${viewPortConfig.url}`
    );

    const contents = secondView.webContents;
    contents.on('did-finish-load', async () => {
        contents.executeJavaScript(`window.scrollTo(${rect.x}, ${rect.y}) `, true);

        contents.executeJavaScript('document.body.style.overflow = "hidden";', true);
        contents.executeJavaScript('document.querySelector("html").scrollTop = window.scrollY;', true);
    });

    app.on('window-all-closed', () => {
        win.removeBrowserView(secondView);
        // win.removeBrowserView(view);
        app.quit();
    });
};

app.whenReady().then(() => {
    startExpress(createView);
});

// let mainWindow;
// let initPath;

// app.allowRendererProcessReuse = true;
// app.on('ready', () => {
//     // https://www.electronjs.org/docs/api/browser-window#class-browserwindow
//     mainWindow = new BrowserWindow({
//         width: 1024,
//         height: 768,
//         //titleBarStyle: 'hidden',
//         //frame: false,
//         backgroundColor: '#fff',
//         webPreferences: {
//             nodeIntegration: true,
//             // https://www.electronjs.org/docs/api/webview-tag
//             webviewTag: true, // Security warning since Electron 10
//             zoomFactor: 1.0,
//             enableRemoteModule: true,
//         },
//     });

//     mainWindow.loadURL(
//         `file://${__dirname}/index.html?innerWidth=${innerWidth}&innerHeight=${innerHeight}&scrollLeft?${scrollLeft}&scrollTop?${scrollTop}&url=${viewPortConfig.url}`
//     );
// });

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//     data = {
//         bounds: mainWindow.getBounds(),
//     };
//     fs.writeFileSync(initPath, JSON.stringify(data));
//     app.quit();
// });
