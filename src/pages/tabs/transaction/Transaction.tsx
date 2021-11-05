import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react"
import { useState } from "react"
import Income from "./segment/Income"
import Expense from "./segment/Expense"

const Transaction:React.FC = () => {
    const [selected,setSelected] = useState<string>('Income')
    return(
        <IonPage>
             <IonHeader style={{
                    maxWidth: '414px',
                    alignSelf: 'center',
                    backgroundColor: 'transparent'
                }}>
                 <IonToolbar color="false">
                     <IonTitle>
                         Transaction
                     </IonTitle>
                 </IonToolbar>
                 <IonSegment value={selected} onIonChange={e => {
                     let selectedtemp = e.detail.value
                     if(selectedtemp === 'Income'){
                        setSelected(selectedtemp)
                     } else if(selectedtemp === 'Expense'){
                        setSelected(selectedtemp)
                     } 
                   }} style={{
                    
                 }}>
                    <IonSegmentButton value="Income">
                        <IonLabel>Income</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="Expense">
                        <IonLabel>Expense</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
             </IonHeader>

            <IonContent>
                {selected==='Income' ? (
                    <Income />
                ) : selected==='Expense' ? (
                    <Expense />
                ) : ''}
            </IonContent>
        </IonPage>
    )
}
export default Transaction;