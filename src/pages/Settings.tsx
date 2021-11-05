import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem,
IonLabel, IonPage, IonRow, IonToggle } from "@ionic/react"
import { logOut, moon } from "ionicons/icons"
import React from "react"
import TitleBar from "../components/TitleBar"
import './Settings.css'

const Settings:React.FC = () => {
    const toggleDarkModeHandler = () => {
        // document.body.classList.toggle("dark");
    };

    return(
        <IonPage>
            <TitleBar title="Settings" profile={false} />
            <IonContent>
                <div className="content">    
                    <IonGrid>
                        <div style={{display: 'flex', justifyContent: 'center', width:'full', height:'17%'}}>
                            <IonAvatar style={{height:'100%',width:'105px', backgroundColor: 'transparent'}}>
                                <img src="/assets/icon/default-profile.png" />
                            </IonAvatar>
                        </div>
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonButton size="small" color="primary" style={{fontWeight:'bolder'}} fill="outline">Change Image
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonLabel style={{fontWeight: 'bolder', fontSize: '1.4rem'}}>James Bond</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {/* <div style={{display: 'flex', width:'100%', justifyContent:'center'}}> */}
                        <IonItem className="ion-no-border mt-3 mx-3" lines="none"
                            style={{border:'solid 1.5px',borderRadius:'15px'}}>
                            <IonIcon icon={moon} />
                            <IonLabel style={{marginLeft:'15px', fontWeight: 'bolder', fontSize:'16px'}}>Dark Mode</IonLabel>
                            <IonToggle color="dark" onIonChange={toggleDarkModeHandler}></IonToggle>
                        </IonItem>
                        <IonButton color="danger" fill="solid" expand="block"
                            style={{borderRadius: '15px', marginTop: '15px', textAlign:'left'}} className="ion-text-left mx-3">
                            <IonIcon icon={logOut} />
                            <IonLabel style={{marginLeft:'10px', fontWeight: 'bolder', textAlign: 'left'}}>Logout</IonLabel>
                        </IonButton>
                    {/* </div> */}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings