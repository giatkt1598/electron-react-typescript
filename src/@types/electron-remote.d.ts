// Type definitions for Electron 18.0.4
// Project: http://electronjs.org/
// Definitions by: The Electron Team <https://github.com/electron/electron>
// Definitions: https://github.com/electron/electron-typescript-definitions

/// <reference types="node" />

type GlobalEvent = Event & { returnValue: any };

declare namespace Electron2 {
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
    } from 'electron/main';

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

// declare module '@electron/remote' {
//   export = Electron2.Remote;
// }

interface NodeRequireFunction {
  (moduleName: '@electron/remote'): typeof Electron2.Remote;
}

interface NodeRequire extends NodeRequireFunction {
  // (moduleName: '@electron/remote'): typeof Electron2.Remote;
}
