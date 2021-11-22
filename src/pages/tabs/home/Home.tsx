import {
    IonContent,
    IonPage,
    IonAvatar,
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonList,
    IonLabel,
    IonRouterLink,
  } from '@ionic/react';

import './home.css';
import { bag } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../data/user-context';
import { useHistory } from 'react-router';
import HomeCard from './components/HomeCard';

const Home = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [name, setName] = useState('')

  useEffect(() => {
    if(userContext.token == ''){
      history.push('/login')
    }else{
      setName(userContext.user.name as string)
      // Fetch user info
      if(name == ''){
        userContext.fetchInfo()
      }
    }
  }, [userContext])

  return <IonPage>
    <div className="header-card">
      <div>
        <IonRouterLink routerLink="/settings">
          <IonAvatar>
            <img src="/assets/icon/default-profile.png" />
          </IonAvatar>
        </IonRouterLink>
      </div>
      <div className="header-content"> 
        <div style={{fontSize:'1.2em',fontWeight:'bold'}}>Hi, {name}! </div>
        <div style={{textAlign: 'left', fontSize:'0.8em'}}>
            Welcome Back!
        </div>
      </div>
    </div>
    <IonContent>
        <IonCard>
            <IonCardContent>
              <HomeCard />
            </IonCardContent>
        </IonCard>
        
        <div>
          <p className="latest-trans">Latest Transaction</p>
            {/* <div className="card-trans">
              <div className="card-title">Shopping</div>
              <div className="value-trans">Rp. 25.500.000</div>
            </div>
            <div className="card-trans">
              <div className="card-title">Shopping</div>
              <div className="value-trans">Rp. 25.500.000</div>
            </div> */}
        </div>

        <IonList className="mx-3">
          <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
            <IonIcon slot="start" icon={bag} />
            <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>Shopping</IonLabel>
            <IonLabel style={{textAlign:'right'}}>Rp 25.500.000</IonLabel>
          </IonItem>
        </IonList>

    </IonContent>
  </IonPage>
};

export default Home;