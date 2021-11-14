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

  import homeCard from './images-home/home.png';
  import './home.css';
import { bag, chevronForwardOutline, wallet } from 'ionicons/icons';
import { useContext, useEffect } from 'react';
import UserContext from '../../../data/user-context';
import { useHistory } from 'react-router';

const Home = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)

  useEffect(() => {
    if(userContext.token == ''){
      history.push('/login')
    }else{
      console.info("has token")
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
        <div style={{fontSize:'1.2em',fontWeight:'bold'}}>Hi, {userContext.user.name}! </div>
        <div style={{textAlign: 'left', fontSize:'0.8em'}}>
            Welcome Back!
        </div>
      </div>
    </div>
    <IonContent>
        <IonCard>
            <IonCardContent>
              <IonRouterLink routerLink="/wallet">
                <div className="card-container">
                    <img className="home-card" src={homeCard}/>
                    <div className="card-content mx-3">
                      <div style={{fontSize:'12px', fontWeight:'bold'}}>
                        Your balance 
                      </div>
                      <div style={{fontSize:'24px', fontWeight:'bolder'}}>
                        Rp. 7.065.000
                      </div>
                      <div className="mt-2" style={{display:'flex'}}>
                        <IonIcon icon={wallet} style={{width:'20px', height:'20px'}} />
                        <span style={{marginLeft:'4px'}}>Wallet</span>
                      </div>
                    </div>
                </div>
              </IonRouterLink>
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