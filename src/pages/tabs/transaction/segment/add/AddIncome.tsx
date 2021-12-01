import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  useIonLoading,
  useIonToast,
  IonIcon
} from '@ionic/react';
import {cameraOutline} from 'ionicons/icons';

import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import UserContext from '../../../../../data/user-context';
import { urlTransactionAdd } from '../../../../../data/Urls';
import './AddIncome.css'

const AddIncome: React.FC<{type: string}> = props => {
  const {type} = props
  const history = useHistory()
  const userContext = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescrition] = useState('')
  const [wallet, setWallet] = useState('')

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

  useEffect(() => {
    const checkToken = async() => {

      if(await userContext.getToken() == ''){
        history.push('/login')
      }else{
        console.info('use effect')
        if(userContext.categories.length == 0){
          userContext.fetchAllCategory()
        }
        if(userContext.wallet.length == 0){
          userContext.fetchWallet()
        }
      }
    }
    checkToken()
  }, [userContext])

  const addIncomeHandler = () => {
    console.info(title)
    if(wallet == ''){
      showToast('Please Choose the Wallet','danger')
      return
    }
    if(amount <= 0){
      showToast('Please fill the amount','danger')
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
    formData.append('type',type)
    formData.append('id_transaction_category',category)
    formData.append('id_user_wallet', wallet)

    fetch(urlTransactionAdd,{ 
      method: "POST",
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
          { text: 'Yay!', handler: () => history.push('/tabs/transaction') },
        ],
        color: 'success',
        message: `Success adding new ${type} transaction`,
        duration: 2000,
      }) 
    })
    .catch(err => {
      console.log(err)
      hideLoader()
      showToast(`Failed adding new ${type} transaction`,'danger')
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
    <IonPage>
      <IonContent>
        <IonList>
            <IonItem class="ion-item">
              <IonLabel position="floating">{type == "income" ? "Income Title": "Expense Title"}</IonLabel>
              <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem class="ion-item">
              <IonLabel position="floating">{type == "income" ? "Income Description": "Expense Description"}</IonLabel>
              <IonInput value={description} onIonChange={e => setDescrition(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem class="ion-item">
              <IonLabel position="floating">{type == "income" ? "Amount": "Price"}</IonLabel>
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
            <IonButton class="ion-item ion-button" routerLink="/category">
              <IonIcon icon={cameraOutline}>

              </IonIcon>
              Manage Category
            </IonButton>

            <IonItem class="ion-item">
              <IonLabel>Wallet</IonLabel>
              <IonSelect value={wallet} onIonChange={e => setWallet(e.detail.value!)}>
                {dompet}
              </IonSelect>
            </IonItem>

            <IonButton class="ion-item ion-button"  onClick={addIncomeHandler}>
              Add {type == "income" ? "Income": "Expense"} Transaction
            </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddIncome;