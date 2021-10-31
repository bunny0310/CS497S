import { Redirect, Route } from 'react-router';
import { IonApp, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { location, trendingUp, create} from 'ionicons/icons';
import Nearby from './pages/Nearby';

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
import { initializeServices } from './services/registerServices';

const App: React.FC = () => {
  initializeServices();
  return (
  <IonApp>
    <IonHeader>
      <IonToolbar color="secondary">
        <IonTitle>Loc Chat</IonTitle>
        <IonButtons slot="start">
          <img src={`${process.env.PUBLIC_URL}/assets/icon/LocChat.png`} className="icon" />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonReactRouter>
        <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/tabs" to="/tabs/nearby" />
              <Redirect exact path="/" to="/tabs/nearby" />
              <Route path="/tabs/nearby" render={() => <Nearby />} exact={true} />
              <Route path="/tabs/create" render={() => <AddPost />} exact={true} />
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
  </IonApp>);
};

export default App;
