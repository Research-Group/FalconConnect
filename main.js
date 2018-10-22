const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
    // Create browser window
    win = new BrowserWindow({
        width: 500,
        height: 650
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/FalconConnect/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('closed', () => {
      win = null
    })

    ipcMain.on('entry-accepted', () => {
        win.setSize(1200, 800)
        win.center()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})