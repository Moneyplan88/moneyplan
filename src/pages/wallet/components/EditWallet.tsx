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
import { urlWalletEdit } from '../../../data/Urls';
import TitleBar from '../../../components/TitleBar';
import Wallet from '../../../model/wallet.model';

const EditWallet: React.FC<{walletData:Wallet}> = props => {
  const {walletData} = props
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [wallet, setWallet] = useState(walletData.wallet_name ?? '')
  const [saldo, setSaldo] = useState(walletData.balance ?? 0)

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
    formData.append('id_user_wallet',walletData.id_user_wallet ?? '')
    formData.append('wallet_name',wallet)
    formData.append('balance',saldo.toString())

    fetch(urlWalletEdit,{ 
      method: 'PUT',
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
          { text: 'Yay!', handler: () => history.push('/wallet') },
        ],
        color: 'success',
        message: 'Editing wallet successfull',
        duration: 2000,
      }) 
    })
    .catch(err => {
      console.log(err)
      hideLoader()
      showToast('Failed editing the wallet','danger')
    })
    
  }

  return <IonPage>
    <TitleBar title="Edit Wallet" profile={true} />
    <IonContent>
      <IonGrid>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={wallet} onIonChange={e => setWallet(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Balance</IonLabel>
            <IonInput type={'number'} value={saldo} onIonChange={e => setSaldo(e.detail.value as unknown as number)}></IonInput>
          </IonItem>
          <IonButton onClick={addWalletHandler} className="mt-3">
            Edit Wallet
          </IonButton>
        </IonList>
      </IonGrid>
    </IonContent>
  </IonPage>
};

export default EditWallet;