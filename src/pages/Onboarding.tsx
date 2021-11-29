import {IonButton, IonContent, IonPage, IonRouterLink } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import p1 from './images/onboard-1.png';
import p2 from './images/onboard-2.png';
import p3 from './images/onboard-3.png';
import style from './Onboarding.module.scss'
import { Button, Row } from 'react-bootstrap';
import UserContext from '../data/user-context';
import { useHistory } from 'react-router';

const Onboarding: React.FC = () => {
  const [page, setPage] = useState(1)
  const userContext = useContext(UserContext)
  const history = useHistory()
  const continueHandler = () => {
    setPage(page+1);
  }

  useEffect(() => {
   const checkToken = async() => {
     if(await userContext.getToken() === ''){
       history.push('/login')
     } else {
       history.push('/tabs/home')
     }
   }
   checkToken()
  }, [])

  let layout
  if(page == 1){
    layout = (
      <>
        <img src={p1} className="mt-3 mb-5"/>
        <h3>Track your money!</h3>
        <p>Do all that in just one simple app</p>
        <button onClick={continueHandler} className="btn btn-primary">Continue</button>
      </>
    )
  }else if(page == 2){
    layout = (
      <>
        <img src={p2} className="mt-3 mb-5"/>
        <h3>Add, Edit, or remove</h3>
        <p>Manage your transactions using single swipe</p>
        <button onClick={continueHandler} className="btn btn-primary">Continue</button>
      </>
    )
  }else if(page == 3){
    layout = (
      <>
        <img src={p3} className="mt-3 mb-5"/>
        <h3>On the go!</h3>
        <p>Do incredible things anywhere in the world</p>
        <IonRouterLink routerLink="/login">
          <button className="btn btn-primary">Get Started</button>
        </IonRouterLink>
      </>
    )
  }

  return (
    <IonPage>
      <IonContent fullscreen className='ion-padding ion-text-center'>
        <h1>MoneyPlan</h1>
        {layout}
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
