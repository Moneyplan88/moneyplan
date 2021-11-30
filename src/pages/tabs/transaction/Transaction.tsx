import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { useContext, useState, useEffect } from "react";
import Income from "./segment/Income";
import Expense from "./segment/Expense";
import TitleBar from "../../../components/TitleBar";
import { arrowBack, personCircle, ellipsisHorizontal } from "ionicons/icons";
import { useHistory } from "react-router";
import UserContext from "../../../data/user-context";

const Transaction: React.FC = () => {
  const history = useHistory()
    const userContext = useContext(UserContext)
  const [selected, setSelected] = useState<string>("Income");
  const [fetched, setFetched] = useState(false)
  
  
  useEffect(() => {
    const checkToken = async() => {

        if(await userContext.getToken() == ''){
            history.push('/login')
        }else{
            if(userContext.transaction.length == 0 && !fetched){
                userContext.fetchTransaction()
                setFetched(true)
            }
        }
    }
    checkToken()
}, [userContext])
  return (
    <IonPage>
      {/* <TitleBar title="Transaction List" profile={true} /> */}
      <IonHeader className="ion-no-border">
                <IonToolbar color="false">
                   
                    <IonTitle style={{fontWeight: 'bolder'}}>Transaction list</IonTitle>
                    <IonButtons slot="end">
                        
                        <IonButton routerLink="/settings">
                            <IonIcon icon={personCircle} style={{width:'30px', height:'30px'}}/>
                        </IonButton>
                        
                        
                    </IonButtons>
                </IonToolbar>
        </IonHeader>
      <IonHeader
        style={{
          maxWidth: "414px",
          alignSelf: "center",
          backgroundColor: "transparent",
        }}
      >
        <IonSegment
          value={selected}
          onIonChange={(e) => {
            let selectedtemp = e.detail.value;
            if (selectedtemp === "Income") {
              setSelected(selectedtemp);
            } else if (selectedtemp === "Expense") {
              setSelected(selectedtemp);
            }
          }}
          style={{}}
        >
          <IonSegmentButton value="Income">
            <IonLabel>Income</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Expense">
            <IonLabel>Expense</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>

      <IonContent>
        {selected === "Income" ? (
          <Income />
        ) : selected === "Expense" ? (
          <Expense />
        ) : (
          ""
        )}
      </IonContent>
    </IonPage>
  );
};
export default Transaction;
