import { Redirect, Route, RouteComponentProps } from 'react-router';
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { location, trendingUp, create} from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';

/* Custom css styles */
import './App.css';
import AddPost from './pages/AddPost';
import { generateOneTimes, getPublicKey, isLoggedIn } from './services/authentication-service.js';
import Login from './pages/Login';
import { clearMemory } from './services/authentication-service.js';
import React from 'react';
import { LoggedInContext } from './components/LoggedInContext';
import { MessageBus, Messages } from './services/message-bus';
import { wire } from './services/serviceInjection';
import { PostsWebservice } from './services/posts-webservice';
import Trending from './pages/Trending';

interface AppProps {}
interface AppPropsWithServices extends AppProps {
  messageBus: MessageBus
}
const App = (props: AppPropsWithServices) => {
  const [loginState, setLoginState] = React.useState<boolean>(isLoggedIn());
  const [showLogoutToast, setShowLogoutToast] = React.useState<boolean>(false);
  React.useEffect(() => {
  props.messageBus.on(Messages.LogoutMessage, () => {
    setLoginState(false);
  });
  props.messageBus.on(Messages.LoginMessage, () => {
    setLoginState(true);
  })
  })
  return (
  <IonApp>
    <IonHeader>
      <IonToolbar color="secondary">
        <IonTitle>Loc Chat</IonTitle>
        <IonButtons slot="start">
          <img src={`${process.env.PUBLIC_URL}/assets/icon/LocChat.png`} className="icon" />
        </IonButtons>
        <IonButtons slot="end">
          {
            loginState
            ? <>
              <IonText>Hello User {getPublicKey()!.substring(0,5)}</IonText> 
              <IonButton color="light" size="large" onClick = {() => {clearMemory(); setShowLogoutToast(true); props.messageBus.dispatch<string>(Messages.LogoutMessage, "");}}>Log out</IonButton> 
              </>
            : <IonButton color="light" size="large" onClick = {() => {window.location.href = window.location.origin + '/login'}}>Log In</IonButton>
          }
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <LoggedInContext.Provider value={loginState}>
      <IonContent>
      <IonToast
          isOpen={showLogoutToast}
          onDidDismiss={() => setShowLogoutToast(false)}
          message="Logged out successfully."
          duration={2000}
        />
        <IonReactRouter>
          <IonTabs>
              <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/trending" />
                <Redirect exact path="/" to="/tabs/trending" />
                <Route path="/tabs/trending" render={(props) => <Trending {...props}/>} exact={true} />
                {
                  !loginState
                  ? <Redirect exact path="/tabs/create" to="/login" />
                  : <Route path="/tabs/create" render={() => <AddPost />} exact={true} />
                }
                {
                  loginState
                  ? <Redirect exact path="/login" to="/tabs/trending" />
                  : <Route path="/login" render={(props) => <Login {...props} />} exact={true} />
                }
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="nearby" href="/tabs/nearby">
                  <IonIcon icon={location} />
                  <IonLabel>Nearby</IonLabel>
                </IonTabButton>
                <IonTabButton tab="trending" href="/tabs/trending">
                  <IonIcon icon={trendingUp} />
                  <IonLabel>Trending</IonLabel>
                </IonTabButton>
                <IonTabButton tab="create" href="/tabs/create">
                  <IonIcon icon={create} />
                  <IonLabel>Add</IonLabel>
                </IonTabButton>
              </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </LoggedInContext.Provider>
  </IonApp>);
};

export default wire<AppProps>(App, ["messageBus"]);
