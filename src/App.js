import './style/app.scss'
import SettingsBar from './components/SettingsBar'
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';

function App() {
  return (
    <div className='app'>
      <ToolBar />
      <SettingsBar />
      <Canvas />
    </div>
  );
}

export default App;
