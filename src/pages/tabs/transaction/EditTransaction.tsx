import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react"
import { useState } from "react"
import TitleBar from "../../../components/TitleBar";
import EditIncome from "./segment/edit/EditIncome";

const EditTransaction:React.FC = () => {
    return(
        <IonPage>
            <TitleBar title="Edit Transaction" profile={true} />
            <IonContent>
                <EditIncome />
            </IonContent>
        </IonPage>
    )
}
export default EditTransaction;