import {IonButton, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import login from './images/login.png';

const Login: React.FC = () => {
  const [page, setPage] = useState(1)
  
  const continueHandler = () => {
    setPage(page+1);
  }

  return (
    <IonPage>
      <IonContent fullscreen className='ion-padding ion-text-center'>
        <img src={login}/>
        <h1>Start Now!</h1>
        <p>Achieve your financial freedom in no time!</p>
        <IonButton routerLink="/login">
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
