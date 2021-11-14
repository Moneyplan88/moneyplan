import { IonIcon, IonLabel, IonRouterOutlet, IonTabs, IonTabButton, IonTabBar} from "@ionic/react"
import { Route, Redirect } from "react-router";
import { home, search, heart } from 'ionicons/icons';

import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import Transaction from './transaction/Transaction';

const Tabs = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/home"/>
                <Route exact path="/tabs/home" component={Home} />
                <Route exact path="/tabs/transaction" component={Transaction} />
                <Route exact path="/tabs/dashboard" component={Dashboard} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="explore" href="/tabs/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="search" href="/tabs/transaction">
                    <IonIcon icon={search} />
                    <IonLabel>Transaction</IonLabel>
                </IonTabButton>
                <IonTabButton tab="plan" href="/tabs/dashboard">
                    <IonIcon icon={heart} />
                    <IonLabel>Dashboard</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Tabs;