# Description

Get started desktop app with electronjs + react + typescript

## 1. Create react app with typescript template

```bash
yarn create react-app <your_project_name> --template typescript
```

## 2. Add electronjs packages

```bash
yarn add @electron/remote electron-is-dev
```

```bash
yarn add -D electron electron-builder concurrently cross-env wait-on
```

## 3. Add file startup for electron app

Create new file _electron.js_ in folder **public**

```javascript
// public/electron.js

import isDev from "electron-is-dev";
import { app, BrowserWindow } from "electron";
import electronRemote from "@electron/remote/dist/src/main/index.js";
import path from "path";
import { fileURLToPath } from "url";

electronRemote.initialize();
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: isDev,
    },
  });
  electronRemote.enable(win.webContents);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
```

## 4. Add script add setup package.json

Edit _main_, _type_ and _scripts_ property in **package.json**

```json
{
  //...
  "type": "module",
  "main": "public/electron.js",
  "scripts": {
    "dev": "concurrently -k \"cross-env BROWSER=none react-scripts start\" \"wait-on tcp:3000 && electron .\"",
    "build": "react-scripts build && electron-builder -c.extraMetadata.main=build/electron.js"
  },
  "dependencies": {
    //...
  }
}
```

## 5. Add file declare for @electron/remote

```typescript
// src/@types/electron-remote.d.ts

/// <reference types="node" />

type GlobalEvent = Event & { returnValue: any };

declare namespace ElectronTs {
  namespace Remote {
    export {
      ClientRequest,
      CommandLine,
      Cookies,
      Debugger,
      Dock,
      DownloadItem,
      IncomingMessage,
      MessagePortMain,
      ServiceWorkers,
      TouchBarButton,
      TouchBarColorPicker,
      TouchBarGroup,
      TouchBarLabel,
      TouchBarOtherItemsProxy,
      TouchBarPopover,
      TouchBarScrubber,
      TouchBarSegmentedControl,
      TouchBarSlider,
      TouchBarSpacer,
      WebRequest,
    } from "electron/main";

    // Taken from `RemoteMainInterface`
    export var app: Electron.App;
    export var autoUpdater: Electron.AutoUpdater;
    export var BrowserView: typeof Electron.BrowserView;
    export var BrowserWindow: typeof Electron.BrowserWindow;
    export var clipboard: Electron.Clipboard;
    export var contentTracing: Electron.ContentTracing;
    export var crashReporter: Electron.CrashReporter;
    export var desktopCapturer: Electron.DesktopCapturer;
    export var dialog: Electron.Dialog;
    export var globalShortcut: Electron.GlobalShortcut;
    export var inAppPurchase: Electron.InAppPurchase;
    export var ipcMain: Electron.IpcMain;
    export var Menu: typeof Electron.Menu;
    export var MenuItem: typeof Electron.MenuItem;
    export var MessageChannelMain: typeof Electron.MessageChannelMain;
    export var nativeImage: typeof Electron.nativeImage;
    export var nativeTheme: Electron.NativeTheme;
    export var net: Electron.Net;
    export var netLog: Electron.NetLog;
    export var Notification: typeof Electron.Notification;
    export var powerMonitor: Electron.PowerMonitor;
    export var powerSaveBlocker: Electron.PowerSaveBlocker;
    export var protocol: Electron.Protocol;
    export var screen: Electron.Screen;
    export var session: typeof Electron.session;
    export var ShareMenu: typeof Electron.ShareMenu;
    export var shell: Electron.Shell;
    export var systemPreferences: Electron.SystemPreferences;
    export var TouchBar: typeof Electron.TouchBar;
    export var Tray: typeof Electron.Tray;
    export var webContents: typeof Electron.webContents;
    export var webFrameMain: typeof Electron.webFrameMain;

    // Taken from `Remote`
    export function getCurrentWebContents(): Electron.WebContents;
    export function getCurrentWindow(): Electron.BrowserWindow;
    export function getGlobal(name: string): any;
    export var process: NodeJS.Process;
    export var require: NodeJS.Require;
  }
}

interface NodeRequireFunction {
  (moduleName: "@electron/remote"): typeof ElectronTs.Remote;
}

interface NodeRequire extends NodeRequireFunction {}
```

## 6. Add file support types

```typescript
// src/electron-ts.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from "electron";

export const {
  BrowserView,
  BrowserWindow,
  Menu,
  MenuItem,
  MessageChannelMain,
  Notification,
  ShareMenu,
  TouchBar,
  Tray,
  app,
  autoUpdater,
  clipboard,
  contentTracing,
  crashReporter,
  desktopCapturer,
  dialog,
  getCurrentWebContents,
  getCurrentWindow,
  getGlobal,
  globalShortcut,
  inAppPurchase,
  ipcMain,
  nativeImage,
  nativeTheme,
  net,
  netLog,
  powerMonitor,
  powerSaveBlocker,
  process,
  protocol,
  // require,
  screen,
  session,
  shell,
  systemPreferences,
  webContents,
  webFrameMain,
} = window.require("@electron/remote");
```

## 7. Test Interprocess Communication (IPC) to electron from react

```jsx
// src/App.tsx

import { useEffect, useState } from "react";
import "./App.css";
import { app, dialog } from "./electron-ts";

function App() {
  const [currentRAM, setCurrentRAM] = useState("");
  useEffect(() => {
    const ramInterval = setInterval(() => {
      const ramInfo = process.getSystemMemoryInfo();
      setCurrentRAM(~~((ramInfo.free / ramInfo.total) * 100) + "%");
    }, 1000);
    return () => {
      clearInterval(ramInterval);
    };
  }, []);

  const openFile = () => {
    dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] });
  };
  return (
    <div className="App">
      AppPath: {app.getAppPath()}
      <br />
      RAM free: {currentRAM}
      <br />
      <button onClick={openFile}>Open file</button>
    </div>
  );
}

export default App;
```

## 7. Run app

```bash
yarn dev
```

## 8. Build app

```bash
yarn build
```
