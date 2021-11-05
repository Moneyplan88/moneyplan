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
  } from '@ionic/react';

  import React, {useState} from 'react';
  
  const AddIncome = () => {
    const [text, setText] = useState<string>();

    return (
      <IonPage>
        <IonList>
            <IonItem style={{margin: '5%'}}>
              <IonInput value={text} placeholder="Enter Input" onIonChange={e => setText(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem style={{margin: '5%'}}>
              <IonInput value={text} placeholder="Enter Amount" onIonChange={e => setText(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem style={{margin: '5%'}}>
              <IonLabel>Category</IonLabel>
              <IonSelect>
                <IonSelectOption value="commerce">Commerce</IonSelectOption>
                <IonSelectOption value="shopping">Shopping</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem style={{margin: '5%'}}>
              <IonLabel>Wallet</IonLabel>
              <IonSelect>
                <IonSelectOption value="BCA">BCA</IonSelectOption>
                <IonSelectOption value="Mandiri">Mandiri</IonSelectOption>
              </IonSelect>
            </IonItem>

          </IonList>
      </IonPage>
    );
  };
  
  export default AddIncome;