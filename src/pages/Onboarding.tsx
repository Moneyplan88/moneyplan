import {IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import p1 from './images/onboard-1.png';
import p2 from './images/onboard-2.png';
import p3 from './images/onboard-3.png';

const Onboarding: React.FC = () => {
  const [page, setPage] = useState(1)
  
  const continueHandler = () => {
    setPage(page+1);
  }

  let layout
  if(page == 1){
    layout = (
      <>
        <img src={p1}/>
        <h3>Track your money!</h3>
        <p>Do all that in just one simple app</p>
        <IonButton onClick={continueHandler}>
          Continue
        </IonButton>
      </>
    )
  }else if(page == 2){
    layout = (
      <>
        <img src={p2}/>
        <h3>Add, Edit, or remove</h3>
        <p>Manage your transactions using single swipe</p>
        <IonButton onClick={continueHandler}>
          Continue
        </IonButton>
      </>
    )
  }else if(page == 3){
    layout = (
      <>
        <img src={p3}/>
        <h3>On the go!</h3>
        <p>Do incredible things anywhere in the world</p>
        <IonButton routerLink="/login">
          Get Started
        </IonButton>
      </>
    )
  }

  return (
    <IonPage>
      <IonContent fullscreen className='ion-padding ion-text-center'>
        <h1>MyMoney</h1>
        {layout}
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
