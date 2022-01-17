import React ,{Suspense} from 'react';
import HomeLayout from './components/HomeLayout/HomeLayout';
import {BrowserRouter as Router , Switch , Route}from 'react-router-dom';
import AccessLayout from './containers/AccessLayout/AccessLayout';

function App() {
  const AsyncMainLayout = React.lazy(()=>{
    return import('./components/MainLayout/MainLayout');
  });
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomeLayout}/>
        <Route path='/register' exact render={()=><AccessLayout render={1}/> }/>
        <Route path='/onboarding' exact render={()=><AccessLayout render={2}/> }/>
        <Route path='/signin' exact render={()=><AccessLayout render={3}/> }/>
        <Route path = '/:foundName'  render= {(props)=><Suspense fallback = {<div>Loading...</div>}><AsyncMainLayout {...props}/></Suspense>}/>
      </Switch>
    </Router>
  );
}

export default App;
