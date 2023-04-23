const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const Storage = require("./Storage");

const appStorage = new Storage({
    filename: "app",
    defaults: {
        windowBounds: { width: 1200, height: 800 }
    }
});

const dataStorage = new Storage({
    filename: "data",
    defaults: {
        hello: "world"
    }
})

const createWindow = () => {
    const win = new BrowserWindow({
        width: appStorage.data.windowBounds.width,
        height: appStorage.data.windowBounds.height,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.on("resize", () => {
        const { width, height } = win.getBounds();

        appStorage.data.windowBounds = { width, height };
        appStorage.save();
    });

    ipcMain.handle("get-data", () => JSON.stringify(dataStorage.data));

    ipcMain.on("set-data", (event, data) => {
        dataStorage.data = JSON.parse(data);
        dataStorage.save();
    });

    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
