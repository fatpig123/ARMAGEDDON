// Electron Preload Script (preload.js)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  renameFile: (filePath, newFileName) => {    
    ipcRenderer.send('rename-file', filePath, newFileName);
  }
});
