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
Create new file *electron.js* in folder **public**
```javascript
// public/electron.js
const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

require('@electron/remote/main').initialize()
function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
    })
    require("@electron/remote/main").enable(win.webContents);

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
```
## 4. Add script add setup package.json
Edit *main* and *scripts* property in **package.json**
```json
{
  //...
  "main": "public/electron.js",
  "homepage": "./",
  "scripts": {
    "serve": "concurrently -k \"cross-env BROWSER=none react-scripts start\" \"yarn start\"",
    "build": "react-scripts build && electron-builder -c.extraMetadata.main=build/electron.js",
    "start": "wait-on tcp:3000 && electron ."
  },
  "dependencies": {
    //...
  }
}
```
## 5. Add file support types
```typescript
// src/app-declare-utils.ts
import { App } from 'electron'
const { app }: { app: App } = window.require('@electron/remote')

export { app }
```

## 6. Test Interprocess Communication (IPC) to electron from react
```jsx
// src/App.tsx
import { useEffect, useState } from 'react';
import { app } from './app-declare-utils';
import './App.css';

function App() {
  const [currentRAM, setCurrentRAM] = useState('');
  useEffect(() => {
    const ramInterval = setInterval(() => {
      const ramInfo = process.getSystemMemoryInfo();
      setCurrentRAM(~~(ramInfo.free / ramInfo.total * 100) + '%');
    }, 1000);
    return () => {
      clearInterval(ramInterval);
    }
  }, []);
  return (
    <div className="App">
      AppPath: {app.getAppPath()}
      <br />
      RAM free: {currentRAM}
    </div>
  );
}

export default App;
```
## 7. Run app
```bash
yarn serve
```
## 8. Build app
```bash
yarn build
```
