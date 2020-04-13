import React from 'react'
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import TweetsSearch from './component/tweets'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={TweetsSearch} exact={true}/>
          {/* <Route path="/:name" component ={Tweets}/> */}
        </Switch>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
