import {IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { urlLogin } from '../data/Urls';
import UserContext from '../data/user-context';
import login from './images/login.png';
import './Login.css'

const Login: React.FC = () => {
  const [loginClick, setLoginClick] = useState(false)
  const [presentToast, dismissToast] = useIonToast()
  const history = useHistory()
  const userContext = useContext(UserContext)

  // TODO: Redirect user if token already exists 
  // if(userContext.token != ''){
  //   history.push('/wallet')
  // }


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const showToast = (msg: string, color: ('danger'|'success')) => {    
    presentToast({
      buttons: [
        { text: 'Okay', handler: () => dismissToast() },
      ],
      color: color,
      message: msg,
      duration: 2000,
    }) 
  };

  const submitLoginHandler = () => {
    console.info(email)
    console.warn(password)
    if(email == '' || !email.includes('@')) showToast('Email is invalid. Please Check Again.','danger')
    if(password == '') showToast('Password is invalid. Please Check Again.','danger')

    const formData = new FormData()
    formData.append('email',email)
    formData.append('password',password)

    fetch(urlLogin,{ 
      method: "POST",
      body: formData
    }).then(res => res.json())
    .then(data => {
      console.log(data)

      // Sukses login
      if(data.message == "Login success"){
        showToast('Login success','success')

        // Simpan token
        userContext.storeToken(data.token)

        // TODO: Redirect to dashboard
        history.push('/wallet')
      }
      // Gagal login
      else{
        showToast(data.message,'danger')
      }
    })
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

        <IonContent>
          <IonGrid id="content">
            <IonRow>
              <IonCol>
              <IonItem>
                <IonLabel position="floating" style={{fontWeight:'normal'}}>Email Address</IonLabel>
                <IonInput type="email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
              </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
              </IonItem>
              </IonCol>
            </IonRow>

            <IonRow className="mt-4">
              <IonCol className="ion-text-center">
                <IonButton expand="block" className="button-login" strong={true} type="submit" onClick={submitLoginHandler}>Submit</IonButton>
                <div className="mt-3">
                  <p>Doesn't have account? <IonRouterLink routerLink="/register">Register Now</IonRouterLink></p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </React.Fragment>
    )
  }


  return (
    <IonPage>
      {layout}
    </IonPage>
  );
};

export default Login;