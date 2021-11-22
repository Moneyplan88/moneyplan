import {
  IonButton,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  useIonLoading,
  useIonToast,
} from '@ionic/react';

import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import UserContext from '../../../data/user-context';
import { urlWalletAdd } from '../../../data/Urls';
import TitleBar from '../../../components/TitleBar';

const AddWallet: React.FC = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [wallet, setWallet] = useState('')
  const [saldo, setSaldo] = useState(0)

  const [presentToast, dismissToast] = useIonToast()
  const [showLoader, hideLoader] = useIonLoading()

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

  const addWalletHandler = () => {
    if(wallet == ''){
      showToast('Check the wallet name','danger')
      return
    }
    if(saldo < 0){
      showToast('Check the saldo amount','danger')
      return
    }
    showLoader({
      message: "Loading...",
      spinner: "circular"
    })
    const formData = new FormData()
    formData.append('wallet_name',wallet)
    formData.append('balance',saldo.toString())

    fetch(urlWalletAdd,{ 
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Bearer ' + userContext.token,
      },
    }).then(res => {
      if(res.status != 500){
        console.log("tdk 500")
        return res.json()
      }
    })
    .then(data => {
      console.log(data)
      hideLoader()
      presentToast({
        buttons: [
          { text: 'Okay', handler: () => history.push('/wallet') },
        ],
        color: 'success',
        message: 'Success adding new wallet',
        duration: 2000,
      }) 
    })
    .catch(err => {
      console.log(err)
      hideLoader()
      showToast('Failed adding new wallet','danger')
    })
    
  }

  return <IonPage>
    <TitleBar title="Add New Wallet" profile={true} />
    <IonContent>
      <IonGrid>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={wallet} onIonChange={e => setWallet(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Starting Balance</IonLabel>
            <IonInput type={'number'} value={saldo} onIonChange={e => setSaldo(e.detail.value as unknown as number)}></IonInput>
          </IonItem>
          <IonButton onClick={addWalletHandler}>
            Add New Transaction
          </IonButton>
        </IonList>
      </IonGrid>
    </IonContent>
  </IonPage>
};

export default AddWallet;