import React from 'react';
import {Route,HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import loadable from './utils/loadrouter';
//路由懒加载
const Login = loadable(()=>import('./pages/Login/index'));
const Collections = loadable(()=>import('./pages/Collections/index'));
const mapOne = loadable(()=>import('./pages/maps/mapOne/index'));
const mapTwo = loadable(()=>import('./pages/maps/mapTwo/index'));
const mapThree = loadable(()=>import('./pages/maps/mapThree/index'));
const mapFour = loadable(()=>import('./pages/maps/mapFour/index'));
const FirstOne = loadable(()=>import('./pages/First/firstOne.js'));
const AllThings = loadable(()=>import('./pages/AllThings/index'));

// import AllThings from './pages/AllThings/index';
// import Collections from './pages/Collections/index';
// import mapOne from './pages/maps/mapOne/index';
// import mapTwo from './pages/maps/mapTwo/index';
// import mapThree from './pages/maps/mapThree/index';
// import mapFour from './pages/maps/mapFour/index';
// import FirstOne from './pages/First/firstOne.js';
// import Login from './pages/Login/index';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/all" exact component={AllThings} />
        <Route path="/collections" exact component={Collections} />
        <Route path="/mapone" exact component={mapOne} />
        <Route path="/maptwo" exact component={mapTwo} />
        <Route path="/mapthree" exact component={mapThree} />
        <Route path="/mapfour" exact component={mapFour} />
        <Route path="/" exact component={FirstOne} />
      </HashRouter>
    </Provider>
  );
}

export default App;
