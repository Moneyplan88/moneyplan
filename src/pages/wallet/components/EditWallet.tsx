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
    IonRow,
    IonCol
  } from '@ionic/react';
  
  import { useContext, useEffect, useState } from 'react';
  import { useHistory, useParams } from 'react-router';
  import UserContext from '../../../data/user-context';
  import { urlWalletAdd, urlWalletEdit } from '../../../data/Urls';
  import TitleBar from '../../../components/TitleBar';
  import axios from 'axios';
  
  const EditWallet: React.FC = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [wallet, setWallet] = useState('')
    const [infoWallet, setInfoWallet] = useState({})
    const [saldo, setSaldo] = useState(0)
    const { id } = useParams<{id: string}>()
    const [token, setToken] = useState('')
    

    const [presentToast, dismissToast] = useIonToast()
    const [showLoader, hideLoader] = useIonLoading()
  
    useEffect(() => {

      const getToken = async() => {

          const token = await userContext.getToken()
          console.log(token)

          if(token === ''){
              history.push('/login')
          }

        // console.log(token)
        console.log(id)
        axios(`https://moneyplan-api.herokuapp.com/api/wallet/info?id_user_wallet=${id}`, {
            method: 'get',
            headers: {
              Authorization: `Bearer ${token}` 
            } 
            
        }).then(res => {
            console.log(res)
            setInfoWallet(res)
            setWallet(res.data.data.wallet_name)
              setSaldo(res.data.data.balance)
          }).catch(err => console.log(err))
      }
      getToken()
      
      
    }, [userContext.wallet])

   
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
  
    const editWalletHandler = async() => {
      const token = await userContext.getToken()
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
      formData.append('id_user_wallet',id)
      formData.append('wallet_name',wallet)
      formData.append('balance',saldo.toString())
    //   console.log(formData.values())
  
      fetch(urlWalletEdit,{ 
        method: 'put',
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + token,
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
          message: 'Wallet has been edited',
          duration: 2000,
        }) 
        // history.push('/wallet')
        window.location.href = '/wallet'
      })
      .catch(err => {
        console.log(err)
        hideLoader()
        showToast('Failed adding new wallet','danger')
      })
      
    }
  
    return <IonPage>
      <TitleBar title="Edit Wallet" profile={true} />
      {wallet!=='' && (
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

                
            </IonList>
            <IonRow className="mt-3" style={{display:'flex', justifyContent:'center'}}>
                    <IonCol className="ion-text-center">
                        <IonButton className="ion-align-self-center" onClick={editWalletHandler} style={{textAlign: 'center'}}>
                        Edit Wallet
                        </IonButton>
                    </IonCol>
                </IonRow>  
            </IonGrid>
            </IonContent>
      )}
     
    </IonPage>
  };
  
  export default EditWallet;