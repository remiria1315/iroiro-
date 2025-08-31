const { app, BrowserWindow, screen } = require("electron");

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  const winWidth = 512;
  const winHeight = 512;

  const win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    x: screenWidth - winWidth,
    y: 0,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    webPreferences: { nodeIntegration: true },
  });
  win.loadFile("index.html");
  win.setIgnoreMouseEvents(true, { forward: true });
  win.setBounds({
    x: screenWidth - winWidth,
    y: 0,
    width: winWidth,
    height: winHeight,
  });
});
