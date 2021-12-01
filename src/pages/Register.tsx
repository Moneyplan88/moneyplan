import {IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, useIonLoading, useIonToast } from '@ionic/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { urlRegister } from '../data/Urls';
import UserContext from '../data/user-context';


const Register: React.FC = () => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const history = useHistory()
const [showLoader, hideLoader] = useIonLoading()
const userContext = useContext(UserContext)
const [presentToast, dismissToast] = useIonToast()


useEffect(() => {
  if(userContext.token != ''){
    history.push('/tabs')
  }else{
    console.info("no token")
  }
}, [userContext])

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

const submitRegisterHandler = () => {
  if(name == '') showToast("Name must not be empty", "danger")
  if(email == '' || !email.includes('@')) showToast('Email is invalid. Please Check Again.','danger')
  if(password == '') showToast('Password is invalid. Please Check Again.','danger')

  const formData = new FormData()
  formData.append('email',email)
  formData.append('password',password)
  formData.append('name',name)

  showLoader({
    message: "Loading...",
    spinner: "circular"
  })

  axios({
    method: 'post',
    url: urlRegister,
    data: formData
  }).then(res => {
    console.log(res)
    hideLoader()
    // Sukses login
    if(res.data.success == true){
      showToast('User Registered','success')

      // Simpan token
      userContext.storeToken(res.data.data.token)

      // TODO: Redirect to dashboard
      history.push('/tabs')
    }else{
      showToast(res.data.errors.message,'danger')
    }
  }).catch(err => {
    hideLoader()
    console.log(err)
  })
}

return (
    <IonPage>
      
        <IonHeader style={{
          maxWidth: "414px",
          alignSelf: "center",
          backgroundColor: "transparent",

        }}>
        <IonToolbar color="primary">
          <IonTitle style={{fontWeight:'bold'}}>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <h1>Login</h1> */}

      <IonContent style={{
          maxWidth: "414px",
          alignSelf: "center",
          backgroundColor: "transparent",

        }}>
          <IonGrid className="content">
            <IonRow>
              <IonCol>
              <IonItem>
                <IonLabel position="floating" style={{fontWeight:'normal'}}>Name</IonLabel>
                <IonInput type="text" onIonChange={(e) => setName(e.detail.value!)}></IonInput>
              </IonItem>
              </IonCol>
            </IonRow>
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
                <IonInput onIonChange={(e) => setPassword(e.detail.value!)}  type="password"></IonInput>
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