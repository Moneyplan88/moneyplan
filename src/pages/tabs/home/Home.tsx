import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonAvatar,
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonList,
    IonLabel,
  } from '@ionic/react';

  import homeCard from './images-home/home.png';
  import './home.css';
import { bag, wallet } from 'ionicons/icons';

  const Home = () => (
    <IonPage>
      <div className="header-card">
        <div>
          <IonAvatar slot="start" style={{height: '75%', width:'95%'}}>
              <img src="/assets/home-images/default-profile.png" />
          </IonAvatar>
        </div>
        <div className="header-content"> 
          <div style={{fontSize:'24px',fontWeight:'bold'}}>Hi, James! </div>
          <div style={{textAlign: 'left', fontSize:'18px'}}>
              Welcome Back
          </div>
        </div>
       
      </div>
      <IonContent>
          <IonCard>
              <IonCardContent>
                  <div className="card-container">
                      <img className="home-card" src={homeCard}/>
                      <div className="card-content">
                        <div style={{fontSize:'12px', fontWeight:'bold'}}>
                          Your balance 
                        </div>
                        <div style={{fontSize:'24px', fontWeight:'bolder'}}>
                          Rp. 7.065.000
                        </div>
                      
                        <div className="mt-3" style={{display:'flex'}}>
                         
                          <IonIcon icon={wallet} style={{width:'20px', height:'20px'}} />
                          <span style={{marginLeft:'4px'}}>Wallet</span>
                        </div>
                      </div>
                      <img src="" />
                  </div>

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
  );
  
  export default Home;