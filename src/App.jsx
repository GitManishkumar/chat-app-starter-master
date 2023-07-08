import React, {lazy, Suspense} from 'react';
import { Switch} from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';

const SignIn=lazy(()=>import('./pages/SignIn'))

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <Suspense fallback={<div>Loading...</div>}/>
          <SignIn/>
        </PublicRoute>
        <PrivateRoute path="/">
          <Home/>
        </PrivateRoute>
      </Switch>
      </ProfileProvider>
  );
}

export default App;
