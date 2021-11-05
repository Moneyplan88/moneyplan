import {IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { text } from 'ionicons/icons';
import React, { useState } from 'react';
import login from './images/login.png';
import './Login.css'

const Login: React.FC = () => {
const [loginClick, setLoginClick] = useState(false)

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const submitLoginHandler = () => {
console.info(email)
console.warn(password)
}

let layout
if(!loginClick){
layout = (
<IonContent>
  <IonGrid className="mx-5 ion-padding ion-text-center">
  <img src={login} className="mt-3 mb-5" />
  <h1>Start Now!</h1>
  <p>Achieve your financial freedom in no time!</p>
  <button className="btn btn-primary" onClick={()=> setLoginClick(true)}>Login</button>
  </IonGrid>
</IonContent>
)
}else{
layout = (
<React.Fragment>
  <IonHeader>
    <IonToolbar color="primary">
      <IonTitle style={{fontWeight:'bold'}}>Login</IonTitle>
    </IonToolbar>
  </IonHeader>
  {/* <h1>Login</h1> */}

  <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol>
          <IonItem>
            <IonLabel position="floating" style={{fontWeight:'normal'}}>Email Address</IonLabel>
            <IonInput type="email"></IonInput>
          </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>
          </IonCol>
        </IonRow>

        <IonRow className="mt-4">
          <IonCol className="ion-text-center">
          
            <IonButton expand="block" className="button-login" strong={true} type="submit">Submit</IonButton>
            <div className="mt-3">
              <p>Doesn't have account? <IonRouterLink routerLink="/register">Register Now</IonRouterLink></p>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
  </IonContent>
  {/* <p>Input your email and password</p>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" placeholder="name@example.com" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
  </div>
  <div className="mb-3 ">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" placeholder="****" defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
  </div>
  <button className="btn btn-primary mb-3" onClick={submitLoginHandler}>Submit</button> */}
  
</React.Fragment>
)
}


return (
<IonPage>
  {/* <IonContent fullscreen>
    <IonGrid className="mx-5 ion-padding ion-text-center"> */}
      {layout}
    {/* </IonGrid>
  </IonContent> */}
</IonPage>
);
};

export default Login;