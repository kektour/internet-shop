import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { HashRouter as Router, Route } from 'react-router-dom';
import Layout from './containers/Layout';
import Phone from './containers/Phone';
import Phones from './containers/Phones';
import Basket from './containers/Basket';

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <Router>
          <Route
            path='/'
            exact
            render={props => (
              <Layout>
                <Phones {...props} />
              </Layout>
            )}
          />
          <Route
            path='/categories/:id'
            exact
            render={props => (
              <Layout>
                <Phones {...props} />
              </Layout>
            )}
          />
          <Route exact path='/phones/:id' component={Phone} />
          <Route exact path='/basket' component={Basket} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
