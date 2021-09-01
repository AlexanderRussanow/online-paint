import './style/app.scss'
import SettingsBar from './components/SettingsBar'
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter >
      <div className='app'>
        <Switch>
          < Route path='/:id'>
            <ToolBar />
            <SettingsBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+ new Date).toString(16)}`}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
