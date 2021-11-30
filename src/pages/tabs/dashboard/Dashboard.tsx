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
  import { bag, wallet, fastFoodOutline, cashOutline, personCircle } from 'ionicons/icons';
  
  const Dashboard:React.FC = () => (
    <IonPage>
      <IonHeader className="ion-no-border">
                <IonToolbar color="false">
                   
                    <IonTitle style={{fontWeight: 'bolder'}}>Monthly Report</IonTitle>
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
                        - Rp. 2.550.000
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

        <IonList className="mx-3">
          <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
            <IonIcon slot="start" icon={bag} />
            <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>Shopping</IonLabel>
            <IonLabel style={{textAlign:'right'}}>Rp 25.500.000</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="mx-3">
          <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
            <IonIcon slot="start" icon={fastFoodOutline} />
            <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>Food & Drink</IonLabel>
            <IonLabel style={{textAlign:'right'}}>Rp 2.550.000</IonLabel>
          </IonItem>
        </IonList>

        <div>
          <p className="latest-trans"><b>Top Income</b></p>
        </div>

        <IonList className="mx-3">
          <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
            <IonIcon slot="start" icon={cashOutline} />
            <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>Salary</IonLabel>
            <IonLabel style={{textAlign:'right'}}>Rp 25.500.000</IonLabel>
          </IonItem>
        </IonList>

    </IonContent>
    </IonPage>
  );
  
  export default Dashboard;