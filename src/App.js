import React from 'react';
import HrContext from './utils/context';
import { hrStore, InitialState } from './reducers/reducer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HrComponent from './components/HrComponent';
import './App.css';

function App() {

  const [store, hrDispatch] = React.useReducer(hrStore, InitialState);

  return (
    <div className="App">
      <HrContext.Provider value={[store, hrDispatch]}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HrComponent} />
          </Switch>
        </BrowserRouter>
      </HrContext.Provider>
    </div>
  );
}

export default App;
