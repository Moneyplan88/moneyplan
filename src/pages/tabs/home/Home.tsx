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
  } from '@ionic/react';

  import homeCard from './images-home/home.png';
  import './home.css';

  const Home = () => (
    <IonPage>
      <div className="header-card">
        <IonAvatar slot="start">
            <img src="" />
        </IonAvatar>
        <div className="header-content">Hi, James! <br/> Welcome back!</div>
      </div>
      <IonContent>
          <IonCard>
              <IonCardContent>
                  <div className="card-container">
                      <img className="home-card" src={homeCard}/>
                      <div className="card-content">Your balance <br /> Rp. 7.065.00</div>
                      <img src="" />
                  </div>
              </IonCardContent>
          </IonCard>

          <div>
            <p className="latest-trans">Latest Transaction</p>
              <div className="card-trans">
                <div className="card-title">Shopping</div>
                <div className="value-trans">Rp. 25.500.000</div>
              </div>
              <div className="card-trans">
                <div className="card-title">Shopping</div>
                <div className="value-trans">Rp. 25.500.000</div>
              </div>
          </div>
      </IonContent>
    </IonPage>
  );
  
  export default Home;