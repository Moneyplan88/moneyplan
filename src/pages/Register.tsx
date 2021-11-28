import {IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, useIonLoading, useIonToast } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { urlRegister } from '../data/Urls';
import UserContext from '../data/user-context';

const Register: React.FC = () => {
  const [presentToast, dismissToast] = useIonToast()
  const history = useHistory()
  const userContext = useContext(UserContext)

  const [showLoader, hideLoader] = useIonLoading()

  useEffect(() => {
    if(userContext.token != ''){
      history.push('/tabs')
    }else{
      console.info("no token")
    }
  }, [userContext])

  const [name, setName] = useState("")
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

  const submitRegisterHandler = () => {
    console.info(email)
    console.warn(password)

    if(name == '') showToast('Name is invalid. Please Check Again.','danger')
    if(email == '' || !email.includes('@')) showToast('Email is invalid. Please Check Again.','danger')
    if(password == '') showToast('Password is invalid. Please Check Again.','danger')

    const formData = new FormData()
    formData.append('name',name)
    formData.append('email',email)
    formData.append('password',password)

    console.info(formData)

    showLoader({
      message: "Loading...",
      spinner: "circular"
    })
    fetch(urlRegister,{ 
      method: "POST",
      body: formData
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      hideLoader()

      // Sukses login
      if (data.success == true) {
        showToast('Login success', 'success')

        // Simpan token
        userContext.storeToken(data.data.token)

        // TODO: Redirect to dashboard
        history.push('/tabs')
      }
      // Gagal login
      else {
        showToast(data.errors.message, 'danger')
      }
    })
    .catch(_ => {
      hideLoader()
      showToast('An error occured when trying to register','danger')
    })
  }

  return (
    <IonPage>
        <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{fontWeight:'bold'}}>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid id="content">
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
              <IonInput type="password" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="mt-4">
            <IonCol className="ion-text-center">
              <IonButton expand="block" className="button-login" strong={true} type="submit" onClick={submitRegisterHandler}>Register</IonButton>
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