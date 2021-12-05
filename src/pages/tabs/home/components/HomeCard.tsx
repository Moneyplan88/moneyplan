import {
    IonIcon,
    IonRouterLink,
  } from '@ionic/react';
  

import homeCard from '../images-home/home.png';
import '../home.css';
import { wallet } from 'ionicons/icons';
import { useContext, useEffect } from 'react';
import UserContext from '../../../../data/user-context';
import { useHistory } from 'react-router';

const HomeCard: React.FC = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)

  useEffect(() => {
    if(userContext.getToken() == ''){
      history.push('/login')
    }else{
      if((userContext.totalBalance == 0 && userContext.totalWallets == 0) ){
        // Fetch all balance
        userContext.fetchAllBalance()
      }
    }
  }, [userContext])

  return <IonRouterLink routerLink="/wallet">
    <div className="card-container">
        <img className="home-card" src={homeCard}/>
        <div className="card-content mx-3">
          <div style={{fontSize:'12px', fontWeight:'bold'}}>
            Total wallet balance 
          </div>
          <div className="ow" style={{fontSize:'24px', fontWeight:'bolder'}}>
            {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(userContext.totalBalance as number)}
          </div>
          <div className="mt-2" style={{display:'flex'}}>
            <IonIcon icon={wallet} style={{width:'20px', height:'20px'}} />
            <span style={{marginLeft:'4px'}}>{userContext.totalWallets > 1 ? `${userContext.totalWallets} Wallets` : `${userContext.totalWallets} Wallet`}</span>
          </div>
        </div>
    </div>
  </IonRouterLink>
};

export default HomeCard;