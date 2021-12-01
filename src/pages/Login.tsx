import { IonImg, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, useIonLoading, useIonToast } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    const checkToken = async() => {

      const token = await userContext.getToken()
      console.log(token)
      if(token !== ''){
        history.push('/tabs/home')
      }else{
        console.info("no token")
      }
    }
    checkToken()
  }, [userContext])

  const [showLoader, hideLoader] = useIonLoading()

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
      
      showLoader({
        message: "Loading...",
        spinner: "circular"
      })
      // Sukses login
      if(data.success == true){
        hideLoader()
        showToast('Login success','success')

        // Simpan token
        userContext.storeToken(data.data.token)

        // TODO: Redirect to dashboard
        history.push('/tabs/home')
      }
      // Gagal login
      else{
        hideLoader()
        showToast(data.errors.message,'danger')
      }
    })
    .catch(_ => {
      hideLoader()
      showToast('An error occured during logged you in','danger')
    })
  }

  let layout
  if(!loginClick){
    layout = (
      <IonContent>
        <IonGrid className="mx-5 ion-padding ion-text-center">
        <img src={login} className="mt-3 mb-3" />
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
          <IonGrid className="content">
            <IonRow>
              <IonCol>
                <IonImg src={login} />
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
                <IonButton expand="block" className="button-login" strong={true} type="submit" onClick={submitLoginHandler}>Login</IonButton>
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