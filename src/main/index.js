import { autoUpdater } from 'electron-updater'
import { app, BrowserWindow, protocol } from 'electron'

/**
* Set `__static` path to static files in production
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
*/
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow

const winURL = process.env.NODE_ENV === 'development'
? `http://localhost:9080`
: `file://${__dirname}/index.html`

function createWindow () {
    /**
    * Initial window options
    */
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        useContentSize: true,
    })

    // Protocollo per consentire il caricamento dei file locali.
    // Chrome blocca il caricamento degli url con protocollo file:// per motivi di sicurezza.
    localFileProtocol('local')

    // Apri DevTools al caricamento
    // mainWindow.webContents.openDevTools();

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

function localFileProtocol(name) {
    protocol.registerFileProtocol(name, (request, callback) => {
        const url = request.url.replace(`${name}://`, '')

        try {
            return callback(decodeURIComponent(url))
        }
        catch (error) {
            // Handle the error as needed
            console.error(error)
        }
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
* Auto Updater
*
* Uncomment the following code below and install `electron-updater` to
* support auto updating. Code Signing with a valid certificate is required.
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
*/

autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('message', 'Checking for update...')
})
autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('message', 'Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    mainWindow.webContents.send('message', 'Update not available.');
})
autoUpdater.on('error', (err) => {
    mainWindow.webContents.send('message', 'Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';

    mainWindow.webContents.send('message', log_message);
})

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
})

app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') {
        mainWindow.webContents.on('did-finish-load', () => {
            autoUpdater.checkForUpdates()
        })
    }
})
