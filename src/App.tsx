import { useEffect, useState } from 'react';
import './App.css';
import { app, dialog } from './electron-ts';

// import { dialog } from '@electron/remote';
// const { dialog } = window.require('@electron/remote')

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

  const openFile = () => {
    console.log(window);

    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
  }
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
