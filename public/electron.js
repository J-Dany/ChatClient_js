const electron = require('electron');
const path = require("path");
const url = require("url");

const app = electron.app;

const protocol = electron.protocol;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow(
        {
            width: 800, 
            height: 600, 
            title: "That!"
        }
    );

    mainWindow.maximize();
    mainWindow.removeMenu();

    mainWindow.loadURL(url.format({
        pathname: "index.html",
        protocol: "file",
        slashes: true
    }))

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

    // https://stackoverflow.com/questions/38204774/serving-static-files-in-electron-react-app
    protocol.interceptFileProtocol("file", (request, callback) => {
        const url = request.url.substr(7)
        callback({path: path.normalize(`${__dirname}/${url}`)})
    }, err => err ? console.error("Failed to register protocol") : null)

    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});