import {
    IonIcon,
    IonRouterLink,
  } from '@ionic/react';
  

import homeCard from '../images-home/home.png';
import '../home.css';
import { cogSharp, wallet } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../../data/user-context';
import { useHistory } from 'react-router';
import { urlTrxAll } from '../../../../data/Urls';

const HomeCard: React.FC = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [saldo, setSaldo] = useState(0)

  useEffect(() => {
    // fetch(urlTrxAll,{ 
    //   headers: {
    //     'Authorization': 'Bearer ' + userContext.token,
    //   }
    // }).then(res => {
    //   if(res.status != 500){
    //     console.log("tdk 500")
    //     return res.json()
    //   }
    // })
    // .then(data => {
    //   console.log(data)
    //   const saldoData = data[0] ?? 0
    //   setSaldo(saldoData)
    // })
    // .catch(err => {
    //   console.log(err)
    //   setSaldo(0)
    // })

    const checkToken = async() => {

      if(userContext.getToken() == ''){
        history.push('/login')
      }else{
        // Fetch all balance
        userContext.fetchAllBalance()
      }
    }
    checkToken()
  
  }, [userContext])

  return <IonRouterLink routerLink="/wallet">
    <div className="card-container">
        <img className="home-card" src={homeCard}/>
        <div className="card-content mx-3">
          <div style={{fontSize:'12px', fontWeight:'bold'}}>
            Your balance 
          </div>
          <div style={{fontSize:'24px', fontWeight:'bolder'}}>
            {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(userContext.totalBalance as number)}
          </div>
          <div className="mt-2" style={{display:'flex'}}>
            <IonIcon icon={wallet} style={{width:'20px', height:'20px'}} />
            <span style={{marginLeft:'4px'}}>Wallet</span>
          </div>
        </div>
    </div>
  </IonRouterLink>
};

export default HomeCard;