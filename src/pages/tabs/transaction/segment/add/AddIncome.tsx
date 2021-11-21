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
  
  const AddIncome = () => {
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
        <IonList>
            <IonItem style={{margin: '5%'}}>
              <IonLabel position="floating">Enter Input</IonLabel>
              <IonInput value={label} onIonChange={e => setLabel(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem style={{margin: '5%'}}>
              <IonLabel position="floating">Enter Amount</IonLabel>
              <IonInput type='number' value={amount} onIonChange={e => setAmount(e.detail.value as unknown as number)}></IonInput>
            </IonItem>

            <IonItem style={{margin: '5%'}}>
              <IonLabel>Category</IonLabel>
              <IonSelect value={category} onIonChange={e => setCategory(e.detail.value!)}>
                <IonSelectOption value="Commerce">Commerce</IonSelectOption>
                <IonSelectOption value="Shopping">Shopping</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem style={{margin: '5%'}}>
              <IonLabel>Wallet</IonLabel>
              <IonSelect value={wallet} onIonChange={e => setWallet(e.detail.value!)}>
                <IonSelectOption value="BCA">BCA</IonSelectOption>
                <IonSelectOption value="Mandiri">Mandiri</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonButton onClick={addTransaction}>
              Add Income Transaction
            </IonButton>

          </IonList>
      </IonPage>
    );
  };
  
  export default AddIncome;