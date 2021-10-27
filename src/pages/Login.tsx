import {IonButton, IonContent, IonGrid, IonPage, IonRouterLink } from '@ionic/react';
import React, { useState } from 'react';
import login from './images/login.png';

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
<>
  <img src={login} className="mt-3 mb-5" />
  <h1>Start Now!</h1>
  <p>Achieve your financial freedom in no time!</p>
  <button className="btn btn-primary" onClick={()=> setLoginClick(true)}>Login</button>
</>
)
}else{
layout = (
<>
  <h1>Login</h1>
  <p>Input your email and password</p>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" placeholder="name@example.com" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
  </div>
  <div className="mb-3 ">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" placeholder="****" defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
  </div>
  <button className="btn btn-primary mb-3" onClick={submitLoginHandler}>Submit</button>
  <p>Doesn't have account? <IonRouterLink routerLink="/register">Register Now</IonRouterLink></p>
</>
)
}


return (
<IonPage>
  <IonContent fullscreen>
    <IonGrid className="mx-5 ion-padding ion-text-center">
      {layout}
    </IonGrid>
  </IonContent>
</IonPage>
);
};

export default Login;