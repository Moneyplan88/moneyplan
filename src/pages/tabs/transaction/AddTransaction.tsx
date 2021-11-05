import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react"
import { useState } from "react"
import AddIncome from "./segment/add/AddIncome"
import AddExpense from "./segment/add/AddExpense"

const AddTransaction:React.FC = () => {
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
                         Add Transaction
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
                    <AddIncome />
                ) : selected==='Expense' ? (
                    <AddExpense />
                ) : ''}
            </IonContent>
        </IonPage>
    )
}
export default AddTransaction;