const { app, BrowserWindow, ipcMain, Menu, dialog, webContents } = require('electron');
const path = require('path');

// stop app launching multiple times during install //
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    //transparent: true,  //透明

    width: 1024,
    height: 800,
    icon: path.join(__dirname, 'gantt6.png'),
    webPreferences: {
      //nodeIntegration: true,
      //enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  //----- UIReload ------//
  ipcMain.on('menu-home', (event) => {
    mainWindow.webContents.reload();
  })

  // ------  get json or xslx  and trans to json   -----//
  const datafile = require("./get-data-file.js");
  ipcMain.on('set-DrogFile', (event, filePath) => {
    let fillesuffix = filePath.substring(filePath.lastIndexOf("."));
    let data;
    if (fillesuffix == ".xlsx") {
      data = datafile.getXlsxFile(filePath);
    }
    else {
      data = datafile.getJsonFile(filePath);
    }
    mainWindow.webContents.send('GetData', data);
  })

  ipcMain.on('menu-getSample', (event) => openSample())
  ipcMain.on('menu-openfile', (event) => openFile())

  /**
   * 设置菜单
   */

  // ------ 菜单事件  ----------
  const openSample = () => {
    let fpath = path.join(__dirname, 'samplesource.json')
    let data = datafile.getJsonFile(fpath);
    mainWindow.webContents.send('GetData', data);
  }
  const openXlsxSample = () => {
    let fpath = path.join(__dirname, 'xlsxSample2.xlsx')
    let data = datafile.getXlsxFile(fpath);
    mainWindow.webContents.send('GetData', data);
  }
  const openFile = () => {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Gantt', extensions: ['json', 'JSON', 'xlsx', 'txt'] }
      ]
    }).then(result => {
      let filePath = result.filePaths[0];
      let fillesuffix = filePath.substring(filePath.lastIndexOf("."));
      let data;
      if (fillesuffix == ".xlsx") {
        data = datafile.getXlsxFile(filePath);
      }
      else {
        data = datafile.getJsonFile(filePath);
      }
      mainWindow.webContents.send('GetData', data);
    }).catch(err => {
      console.log(err)
    })
  };

  const menuHelp = () => {
    const win = new BrowserWindow({
      width: 400,
      height: 600,
      icon: path.join(__dirname, 'gantt6.png')
    })
    win.setMenu(null);
    win.loadFile(path.join(__dirname, 'help.html'))
    win.on('closed', () => {
      win = null
    })
  }

  const menu = require("./menu.js")
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(
      menu.setMenu(openFile, openXlsxSample, menuHelp)
    )
  );
  //--------- end 设置菜单 -----------//

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.webContents.openDevTools();// Open the DevTools.
};

app.whenReady().then(() => {
  createWindow();
  // app.on('activate', () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     createWindow()
  //   }
  // })
})

app.on('window-all-closed', () => {
  dialog.showMessageBox({
    title: "退出甘特图App",
    buttons: ["确定", "取消"],
    type: "warning",
    message: "确定退出！",
    //cancelId: 0
  }).then(result => {
    console.log(result)
    if (result.response == 0) app.quit();
  });
  //console.log(i)
  // if (process.platform !== 'darwin') {
  //app.quit();
  // }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
