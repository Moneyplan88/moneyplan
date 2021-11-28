import {IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, useIonLoading, useIonToast } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import TitleBar from '../components/TitleBar';
import { urlUserEdit } from '../data/Urls';
import UserContext from '../data/user-context';

const EditSettings: React.FC = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [photo, setPhoto] = useState("")

  const [presentToast, dismissToast] = useIonToast()
  const [showLoader, hideLoader] = useIonLoading()

  useEffect(() => {
    if(userContext.token == ''){
      history.push('/login')
    }else{
      console.info("has token")
      setEmail(userContext.user.email ?? '')
      setName(userContext.user.name ?? '')
      setPhoto(userContext.user.photo_user ?? '')
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

  const submitChangeProfile = () => {
    console.info(email)
    console.warn(password)
    if(email == '' || !email.includes('@')) showToast('Email is invalid. Please Check Again.','danger')
    if(password == '') showToast('Password is invalid. Please Check Again.','danger')

    const formData = new FormData()
    formData.append('email',email)
    formData.append('password',password)
    formData.append('name',name)
    // formData.append('photo_user',photo as File)
    
    showLoader({
      message: "Loading...",
      spinner: "circular"
    })
    fetch(urlUserEdit,{ 
      method: "POST",
      body: formData,
      headers: {
        'Authorization': 'Bearer ' + userContext.token,
      }
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      hideLoader()
      console.log(data.data.message)

      // Sukses login
      if(data.data.message == "Please use this new token after user update"){
        showToast('Change profile success','success')

        // Simpan token
        userContext.storeToken(data.data.token)

        // TODO: Redirect to dashboard
        history.push('/tabs')
      }
      // Gagal login
      else{
        showToast(data.errors.message,'danger')
      }
    })
    .catch(_ => {
      hideLoader()
      showToast('Failed to change your profile','danger')
    })
  }

  return (
    <IonPage>
      <TitleBar title="Edit Settings" profile={false} />
      <IonContent fullscreen className='ion-padding ion-text-center'>
        <IonGrid id="content">

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating" style={{fontWeight:'normal'}}>Name</IonLabel>
              <IonInput value={name} type="text" onIonChange={(e) => setName(e.detail.value!)}></IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating" style={{fontWeight:'normal'}}>Email Address</IonLabel>
              <IonInput value={email} type="email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
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
              <IonButton expand="block" className="button-login" strong={true} type="submit" onClick={submitChangeProfile}>Change Profile</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditSettings;
