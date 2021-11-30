import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react"
import { useState } from "react"
import TitleBar from "../../../components/TitleBar";
import AddIncome from "./segment/add/AddIncome";
import EditIncome from "./segment/edit/EditIncome";

const AddTransaction:React.FC = () => {
    const [type,setType] = useState<'income'|'expense'>('income')

    return(
        <IonPage>
            <TitleBar title="Edit Transaction" profile={true} />
             <IonHeader style={{
                    maxWidth: '414px',
                    alignSelf: 'center',
                    backgroundColor: 'transparent'
                }}>
                 <IonSegment value={type} onIonChange={e => {
                     let selectedtemp = e.detail.value
                     if(selectedtemp === 'income'){
                        setType(selectedtemp)
                     } else if(selectedtemp === 'expense'){
                        setType(selectedtemp)
                     } 
                   }}>
                    <IonSegmentButton value="income">
                        <IonLabel>Income</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="expense">
                        <IonLabel>Expense</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
             </IonHeader>

            <IonContent>
                <EditIncome type={type} />
            </IonContent>
        </IonPage>
    )
}
export default AddTransaction;