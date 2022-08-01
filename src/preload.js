const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {

  handleGetData: (callback) => {
    ipcRenderer.on('GetData', callback);
  },

  setDrogFile: (filePath) => {
    ipcRenderer.send('set-DrogFile', filePath);
  },

  menu_getSample: () => {
    ipcRenderer.send('menu-getSample');
  },
  menu_openfile: () => {
    ipcRenderer.send('menu-openfile');
  },

  //   menu_quit: () => {
  //     ipcRenderer.send('menu-quit');
  //   },
});

