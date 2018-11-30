import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Home from './views/Home/index';
import store from './rootReducer';
import Categories from './views/Categories/index';
import Products from './views/ProductList';
import Product from './views/Product/index';
import Cart from './views/Cart/index';
import Search from './views/Search';


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/categories" component={Categories} />
          <Route path="/category/:categId" component={Products} />
          <Route path="/product/:productId" component={Product} />
          <Route path="/search/:search" component={Search} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
