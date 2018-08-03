// Modules
const {app, ipcMain} = require('electron')
const mainWindow = require('./mainWindow')
const readItem = require('./readItem')

// Listen for new read item
ipcMain.on('new-item', (e, itemURL) => {

  // Get read item with readItem module
  readItem(itemURL, (item) => {

    console.log(item)
    // Send to renderer
    e.sender.send('new-item-success', item)
  })
})

app.on('ready', mainWindow.createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) mainWindow.createWindow()
})
