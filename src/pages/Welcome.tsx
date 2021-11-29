import {IonButton, IonCol, IonContent, IonImg, IonPage, IonRouterLink, IonRow, IonSlide, IonSlides } from '@ionic/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import p1 from './images/onboard-1.png';
import p2 from './images/onboard-2.png';
import p3 from './images/onboard-3.png';
import style from './Onboarding.module.scss'
import { Button, Row } from 'react-bootstrap';
import './Welcome.css';
import userContext from '../data/user-context';
import { useHistory } from 'react-router';
import UserContext from '../data/user-context';

const Welcome: React.FC = () => {
  const slideOptionsRef = useRef<HTMLIonSlidesElement>(null);
  const userContext = useContext(UserContext)
  const history = useHistory()
  const continueHandler = () => {
    slideOptionsRef.current?.slideNext();
  }

  useEffect(() => {
    const checkToken = async() => {
      if(await userContext.getToken() === ''){
        console.log('no token')
      } else {
        history.push('/tabs/home')
      }
    }
    checkToken()
   }, [])

  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  return (
    <IonPage>
      <IonContent className='ion-padding ion-text-center'>
        <IonSlides pager={true} options={slideOpts} ref={slideOptionsRef}>
          <IonSlide>
            <h1 className="h1-onboarding">MoneyPlan</h1>
            <IonImg src={p1} className="mb-5 img-onboarding" />
            {/* <img src={p1} className="mt-3 mb-5"/> */}
            <h3>Monitor your Money!</h3>
            <p>Keep track of your money with ease</p>
            <button onClick={continueHandler} className="btn btn-primary">Continue</button>
          </IonSlide>
          <IonSlide>
            <h1 className="h1-onboarding">MoneyPlan</h1>
            <IonImg src={p2} className="mb-5 img-onboarding" />
            {/* <img src={p2} className="mt-3 mb-5"/> */}
            <h3>Add, Change, or Remove</h3>
            <p>Manage your transactions using single swipe</p>
            <button onClick={continueHandler} className="btn btn-primary">Continue</button>
          </IonSlide>
          <IonSlide>
            <h1 className="h1-onboarding">MoneyPlan</h1>
            <IonImg src={p3} className="mb-5 img-onboarding" />
            {/* <img src={p3} className="mt-3 mb-5"/> */}
            <h3>On the Go!</h3>
            <p>Do incredible things anywhere in the world</p>
            <IonRouterLink routerLink="/login">
              <button className="btn btn-primary">Get Started</button>
            </IonRouterLink>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
