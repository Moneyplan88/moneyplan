import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import './theme/darkMode.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Redirect, Route } from 'react-router';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Tabs from './pages/tabs/Tabs';
import AddTransaction from './pages/tabs/transaction/AddTransaction';
import EditTransaction from './pages/tabs/transaction/EditTransaction';
import WalletList from './pages/wallet/walletList';
import Welcome from './pages/Welcome';
import Settings from './pages/Settings';
import UserContext from './data/user-context';
import { useContext, useEffect } from 'react';
import EditSettings from './pages/EditSettings';
import AddWallet from './pages/wallet/components/AddWallet';
import AddCategory from './pages/tabs/transaction/segment/category/AddCategory';
import Category from './pages/tabs/transaction/segment/category/Category';


const App: React.FC = () => {
  const userContext = useContext(UserContext)
  const {initContext} = userContext

  useEffect(() => {
    initContext()
  }, [initContext])

  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/settings/edit" component={EditSettings} />
            <Route exact path="/wallet" component={WalletList} />
            <Route exact path='/wallet/add' component={AddWallet}/>
            {/* <Route exact path='/start' component={Onboarding}/> */}
            <Route exact path='/start' component={Welcome}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/addTransaction' component={AddTransaction}/>
            <Route exact path='/editTransaction' component={EditTransaction}/>
            <Route exact path='/category' component={Category}/>
            <Route exact path='/addCategory' component={AddCategory}/>
            <Route path="/tabs" component={Tabs} />
            <Redirect exact from='/' to='/start'/>
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;