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
