import {
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonButton,
  useIonToast,
  IonSelectOption,
  useIonLoading,
} from '@ionic/react';

import React, {useState} from 'react';
import { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import UserContext from '../../../../../data/user-context';
import { urlTransactionEdit, urlTransactionInfo } from '../../../../../data/Urls';
import axios from 'axios';

const EditIncome : React.FC = () => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescrition] = useState('')
  const [infoTrans, setInfoTrans] = useState({})
  const [wallet, setWallet] = useState('')
  const [type,setType] = useState('')
  const { id } = useParams<{id: string}>()

  const [presentToast, dismissToast] = useIonToast()
  const [showLoader, hideLoader] = useIonLoading()

  useEffect(() => {
    const getToken = async() => {
      const token = await userContext.getToken()
      console.log(token)

      if(token === ''){
          history.push('/login')
      }else{
        if(userContext.categories.length == 0){
          userContext.fetchAllCategory()
        }
        if(userContext.wallet.length == 0){
          userContext.fetchWallet()
        }
      }

      axios(urlTransactionInfo+id, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}` 
        } 
      }).then(res => {
        console.log(res)
        setInfoTrans(res)
        setType(res.data.data.type)
        setTitle(res.data.data.title)
        setDescrition(res.data.data.description)
        setAmount(res.data.data.amount)
        setCategory(res.data.data.id_transaction_category)
        setWallet(res.data.data.id_user_wallet)
      }).catch(err => console.log(err))
    }
    getToken()
  }, [userContext.transaction])

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

  const editTransactionHandler = async() => {
    const token = await userContext.getToken()
    if(title == ''){
      showToast('Check the title name','danger')
      return
    }
    if(amount < 0){
      showToast('Check the amount','danger')
      return
    }
    showLoader({
      message: "Loading...",
      spinner: "circular"
    })
    const formData = new FormData()
    formData.append('title',title)
    formData.append('amount',amount.toString())
    formData.append('description',description)
    formData.append('id_transaction',id)
    formData.append('type',type)
    formData.append('id_transaction_category',category)
    formData.append('id_user_wallet', wallet)

    fetch(urlTransactionEdit,{ 
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
      history.push('/tabs/transaction')
      presentToast({
        buttons: [
          { text: 'Yay!', handler: () => history.push('/wallet') },
        ],
        color: 'success',
        message: 'Transaction has been edited',
        duration: 2000,
      })
    })
    .catch(err => {
      console.log(err)
      hideLoader()
      showToast('Failed Edit new Transaction','danger')
    })
    
  }

  let kategori
  if(userContext.categories.length > 0){
      kategori = userContext.categories.map(category => {
          return <IonSelectOption key={category.id_transaction_category} value={category.id_transaction_category} style={{marginTop: '15px'}} className="card-wallet mx-0 " >
                    <div>{category.category_name}</div>
                 </IonSelectOption>
      })
  }else{
      kategori = <p>No categories yet.</p>
  }

  let dompet
  if(userContext.wallet.length > 0){
      dompet = userContext.wallet.map(wallets => {
          return <IonSelectOption key={wallets.id_user_wallet} value={wallets.id_user_wallet} style={{marginTop: '15px'}} className="card-wallet mx-0 " >
                    <div>{wallets.wallet_name}</div>
                 </IonSelectOption>
      })
  }else{
      dompet = <p>No wallet yet.</p>
  }

  return (
    
      <>
     
        <IonList>
            <IonItem class="ion-item">
              <IonLabel position="floating">Item</IonLabel>
              <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem class="ion-item">
              <IonLabel position="floating">Description Item</IonLabel>
              <IonInput value={description} onIonChange={e => setDescrition(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem class="ion-item">
              <IonLabel position="floating">Amount</IonLabel>
              <IonInput type='number' value={amount} onIonChange={e => setAmount(e.detail.value as unknown as number)}></IonInput>
            </IonItem>

            <IonItem class="ion-item">
              <IonLabel>Category</IonLabel>
              <IonSelect value={category} onIonChange={e => setCategory(e.detail.value!)}>
                {kategori}
              </IonSelect>
            </IonItem>

            <IonButton class="ion-item ion-button" routerLink="/category">
              Manage Category
            </IonButton>

            <IonItem class="ion-item">
              <IonLabel>Wallet</IonLabel>
              <IonSelect value={wallet} onIonChange={e => setWallet(e.detail.value!)}>
                {dompet}
              </IonSelect>
            </IonItem>

            <IonButton class="ion-item ion-button"  onClick={editTransactionHandler}>
              Edit {type == "income" ? "Income": "Expense"} Transaction
            </IonButton>
        </IonList>
      </>
    
  );
};

export default EditIncome;