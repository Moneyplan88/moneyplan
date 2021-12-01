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
import { add, bag, remove } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../data/user-context';
import { useHistory } from 'react-router';
import HomeCard from './components/HomeCard';

const Home: React.FC = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [name, setName] = useState('')
  const [pic, setPic] = useState('')
  const [fetched, setFetched] = useState(false)

  useEffect(() => {

    const checkToken = async() => {
        const token = await userContext.getToken();
        // console.log(token)
        if(token === ''){
          history.push('/login')
        }else{
          setName(userContext.user.name as string)
          setPic('https://mymoney.icedicey.com/' + userContext.user.photo_user)
          // Fetch user info
          if(name === '' && !fetched){
            userContext.fetchInfo()
            userContext.fetchTransaction()
            // userContext.fetchWallet()
            setFetched(true)
          }
      }  
    }
    checkToken()
  }, [userContext])

  return <IonPage>
    <div className="header-card">
      <div>
        <IonRouterLink routerLink="/settings">
          <IonAvatar>
            {console.log(pic)}
            <img src={pic} alt="/assets/icon/default-profile.png" />
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
        <p className="latest-trans">Latest Transaction</p>
        <IonList className="mx-3">
          {userContext.transaction.map(trx => {
            return <IonItem className="ion-item" key={trx.id_transaction} style={{borderRadius:'15px'}} lines="none" color="light">
              <IonIcon slot="start" icon={trx.type == "income" ? add : remove} />
              <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>{trx.title}</IonLabel>
              <IonLabel style={{textAlign:'right'}}>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trx.amount as number)}</IonLabel>
            </IonItem>
          })}
          
        </IonList>

    </IonContent>
  </IonPage>
};

export default Home;