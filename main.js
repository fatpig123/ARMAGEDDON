// Electron Main Process (main.js)
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true, // 이 옵션이 false여야 nodeIntegration이 작동합니다.
      enableRemoteModule: true,
    }
  });

  win.loadURL('http://localhost:3000');  // React 개발 서버 URL 또는 빌드된 React 파일의 URL
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on('rename-file', (event, filePath, newFileName) => {
  const dir = path.dirname(filePath);
  const newFilePath = path.join(dir, newFileName);

  fs.rename(filePath, newFilePath, (err) => {
    if (err) {
      event.reply('rename-file-response', 'Error renaming file: ' + err.message);
    } else {
      event.reply('rename-file-response', 'File renamed successfully');
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
