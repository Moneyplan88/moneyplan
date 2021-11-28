import {IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
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
      
        <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{fontWeight:'bold'}}>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <h1>Login</h1> */}

      <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
              <IonItem>
                <IonLabel position="floating" style={{fontWeight:'normal'}}>Name</IonLabel>
                <IonInput type="text"></IonInput>
              </IonItem>
              </IonCol>
            </IonRow>
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
              
                <IonButton expand="block" onClick={submitRegisterHandler} className="button-login" strong={true} type="submit">Register</IonButton>
                <div className="mt-3">
                  <p>Already have account? <IonRouterLink routerLink="/login"><strong>Login Now</strong></IonRouterLink></p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
      </IonContent>
        {/* <h1>Register</h1>
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
        <p>Already have account? <IonRouterLink routerLink="/login">Login Now</IonRouterLink></p> */}

        
    </IonPage>
);
};

export default Register;