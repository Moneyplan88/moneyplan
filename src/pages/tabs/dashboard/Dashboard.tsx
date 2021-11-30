import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonRouterLink,
    IonContent,
    IonHeader,
    IonList,
    IonItem, 
    IonLabel,
    IonPage,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButton,
  } from '@ionic/react';
  import graphic from './images-dashboard/graphic.png';
  import TitleBar from "../../../components/TitleBar";
  import './dashboard.css';
  import { bag, wallet, fastFoodOutline, cashOutline, personCircle, cash } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../data/user-context';
import { useHistory } from 'react-router';
import axios from 'axios';
  
  const Dashboard: React.FC = () => {
    const userContext = useContext(UserContext);
    const history = useHistory()
    const [spending, setSpending] = useState<any[]>([])
   
    const [amount, setAmount] = useState(0)

    useEffect(() => {
      const checkToken = async() => {
        if(await userContext.getToken() === ''){
          history.push('/login')
        } else {
          const date = new Date()
          const year = date.getFullYear();
          const month = date.getMonth()
          const token = await userContext.getToken()
          await axios({
            method: 'get',
            url: `https://mymoney.icedicey.com/api/transaction/user-transaction-top-spending?year=${year}&month=${month}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => {
                console.log(res)
                setSpending(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
      }
      checkToken()
    }, [userContext])

    useEffect(() => {
     if(spending.length > 0){
       let total = 0
       for(let i = 0; i < spending.length;i++){
         if(spending[i].type === "expense"){
             
              total -= spending[i].amount
              console.log(total)
         } else {
          
           total += spending[i].amount
         }
        console.log(spending[i])
       }
       setAmount(total)
       console.log('masuk')
     }
    }, [spending])

    return(
      <IonPage>
        <IonHeader className="ion-no-border">
                  <IonToolbar color="false">
                     
                      <IonTitle style={{fontWeight: 'bolder'}}>Transaction list</IonTitle>
                      <IonButtons slot="end">
                          
                          <IonButton routerLink="/settings">
                              <IonIcon icon={personCircle} style={{width:'30px', height:'30px'}}/>
                          </IonButton>
                          
                          
                      </IonButtons>
                  </IonToolbar>
          </IonHeader>
        <IonContent>
          <IonCard>
              <IonCardContent>
                <IonRouterLink routerLink="/wallet">
                  <div className="card-container">
                      <img className="home-card" src={graphic}/>
                      <div className="card-content mx-3">
                        <div style={{fontSize:'12px', fontWeight:'bold'}}>
                          Monthly Balance
                        </div>
                        <div style={{fontSize:'20px', fontWeight:'bolder'}}>
                        {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount as number)}
                        </div>
                        <div className="mt-2" style={{display:'flex'}}>
                          <IonIcon icon={wallet} style={{width:'20px', height:'20px'}} />
                          <span style={{marginLeft:'4px'}}>Wallet </span>
                        </div>
                      </div>
                  </div>
                </IonRouterLink>
              </IonCardContent>
          </IonCard>
          
          <div>
            <p className="latest-trans"><b>Top Spending</b></p>
          </div>

          {spending.map(spend => {
            if(spend.type === "expense"){
              return(

              <IonList className="mx-3" key={spend.id_transaction}>
                <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
                  <IonIcon slot="start" icon={cashOutline} />
                  <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>{spend.title}</IonLabel>
                  <IonLabel style={{textAlign:'right'}}>{spend.transaction_category}</IonLabel>
                </IonItem>
              </IonList>
              )
            }
          })}
  
  
          {/* <div>
            <p className="latest-trans"><b>Top Income</b></p>
          </div>
          {spending.map(spend => {
            if(spend.type === "income"){
              return(

              <IonList className="mx-3">
                <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
                  <IonIcon slot="start" icon={cashOutline} />
                  <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>{spend.title}</IonLabel>
                  <IonLabel style={{textAlign:'right'}}>{spend.transaction_category}</IonLabel>
                </IonItem>
              </IonList>
              )
            }
          })}
   */}
      </IonContent>
      </IonPage>
    );
  }
  
  
  export default Dashboard;