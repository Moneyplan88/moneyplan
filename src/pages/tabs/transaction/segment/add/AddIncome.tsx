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
  } from '@ionic/react';

  import React, {useState} from 'react';
  import './AddIncome.css'
  
  const AddIncome: React.FC<{type: string}> = props => {
    const {type} = props
    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [wallet, setWallet] = useState('')

    const addTransaction = () => {
      console.log(category)
      console.log(wallet)
    }

    return (
      <IonPage>
        <IonContent>
          <IonList>
              <IonItem class="ion-item">
                <IonLabel position="floating">Enter Input</IonLabel>
                <IonInput value={label} onIonChange={e => setLabel(e.detail.value!)}></IonInput>
              </IonItem>

              <IonItem class="ion-item">
                <IonLabel position="floating">Enter Amount</IonLabel>
                <IonInput type='number' value={amount} onIonChange={e => setAmount(e.detail.value as unknown as number)}></IonInput>
              </IonItem>

              <IonItem class="ion-item">
                <IonLabel>Category</IonLabel>
                <IonSelect value={category} onIonChange={e => setCategory(e.detail.value!)}>
                  <IonSelectOption value="Commerce">Commerce</IonSelectOption>
                  <IonSelectOption value="Shopping">Shopping</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonButton class="ion-item ion-button" routerLink="/category">
                Manage Category
              </IonButton>

              <IonItem class="ion-item">
                <IonLabel>Wallet</IonLabel>
                <IonSelect value={wallet} onIonChange={e => setWallet(e.detail.value!)}>
                  <IonSelectOption value="BCA">BCA</IonSelectOption>
                  <IonSelectOption value="Mandiri">Mandiri</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonButton class="ion-item ion-button"  onClick={addTransaction}>
                Add Income Transaction
              </IonButton>
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default AddIncome;