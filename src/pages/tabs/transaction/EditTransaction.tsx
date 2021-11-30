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
            <IonContent>
                <EditIncome type={type} />
            </IonContent>
        </IonPage>
    )
}
export default AddTransaction;