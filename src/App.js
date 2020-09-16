import React from 'react';
import {Route,HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import AllThings from './pages/AllThings/index';
import Collections from './pages/Collections/index';
import store from './store/index';
import mapOne from './pages/maps/mapOne/index';
import mapTwo from './pages/maps/mapTwo/index';
import mapThree from './pages/maps/mapThree/index';
import mapFour from './pages/maps/mapFour/index';
import FirstOne from './pages/First/firstOne.js';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
// import AnimatedSwitch from './animation/AnimatedSwitch.js';
// import AnimatedRouter from 'react-animated-router'; //我们的AnimatedRouter组件
// import 'react-animated-router/animate.css'; //引入默认的动画样式定义

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
        <Route path="/register" exact component={Register} />
      </HashRouter>
    </Provider>
  );
}

export default App;
