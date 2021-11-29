import {
    IonButtons,
    IonContent,
    IonHeader,
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
    IonItemOption,
  } from '@ionic/react';

  import { useContext, useState, useEffect } from 'react';
  import { useHistory } from 'react-router';
  import UserContext from '../../../../../data/user-context';
  import { urlTransactionAdd } from '../../../../../data/Urls';
  import './AddIncome.css'
import { compassOutline } from 'ionicons/icons';
  
  const AddIncome: React.FC<{type: string}> = props => {
    const {type} = props
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [types, setType] = useState('')
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
          userContext.fetchAllCategory()
          userContext.fetchWallet()
  }, [])

    const addIncomeHandler = () => {
      console.info(title)
      if(wallet == ''){
        showToast('Please Choose the Wallet','danger')
        return
      }
      if(amount < 0){
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
          message: 'Success adding new income',
          duration: 2000,
        }) 
      })
      .catch(err => {
        console.log(err)
        hideLoader()
        showToast('Failed adding new income','danger')
      })
      
    }

    let kategori
    if(userContext.categories.length > 0){
        kategori = userContext.categories.map(category => {
            return <IonSelectOption key={category.id_transaction_category} style={{marginTop: '15px'}} className="card-wallet mx-0 " >
                      <div>{category.category_name}</div>
                   </IonSelectOption>
        })
    }else{
        kategori = <p>No categories yet.</p>
    }

    let dompet
    if(userContext.wallet.length > 0){
        dompet = userContext.wallet.map(wallets => {
            return <IonSelectOption key={wallets.id_user_wallet} style={{marginTop: '15px'}} className="card-wallet mx-0 " >
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
                <IonLabel position="floating">Enter Income Title</IonLabel>
                <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
              </IonItem>

              <IonItem class="ion-item">
                <IonLabel position="floating">Enter Income Description</IonLabel>
                <IonInput value={description} onIonChange={e => setDescrition(e.detail.value!)}></IonInput>
              </IonItem>

              <IonItem class="ion-item">
                <IonLabel position="floating">Enter Amount</IonLabel>
                <IonInput type='number' value={amount} onIonChange={e => setAmount(e.detail.value as unknown as number)}></IonInput>
              </IonItem>

              <IonItem class="ion-item">
                <IonLabel>Type</IonLabel>
                <IonSelect value={types} onIonChange={e => setType(e.detail.value!)}>
                  <IonSelectOption value="types">{type}</IonSelectOption>
                </IonSelect>
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

              <IonButton class="ion-item ion-button"  onClick={addIncomeHandler}>
                Add Income Transaction
              </IonButton>
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default AddIncome;