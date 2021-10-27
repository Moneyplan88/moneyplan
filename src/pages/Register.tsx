import {IonContent, IonGrid, IonPage, IonRouterLink } from '@ionic/react';
import React, { useState } from 'react';

const Register: React.FC = () => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const submitRegisterHandler = () => {
console.info(email)
console.warn(password)
}

return (
<IonPage>
  <IonContent fullscreen>
    <IonGrid className="mx-5 ion-padding ion-text-center">
    
    <h1>Register</h1>
    <p>Input your name, email and password</p>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input type="text" className="form-control" placeholder="James" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Email address</label>
      <input type="email" className="form-control" placeholder="name@example.com" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="mb-3 ">
      <label className="form-label">Password</label>
      <input type="password" className="form-control" placeholder="****" defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <button className="btn btn-primary mb-3" onClick={submitRegisterHandler}>Register</button>
    <p>Already have account? <IonRouterLink routerLink="/login">Login Now</IonRouterLink></p>

    </IonGrid>
  </IonContent>
</IonPage>
);
};

export default Register;