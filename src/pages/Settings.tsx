import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToggle, IonToolbar, isPlatform } from "@ionic/react"
import { arrowBack, ellipsisHorizontal, logOut, moon, personCircle } from "ionicons/icons"
import React, { useState } from "react"
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
                <div style={{display: 'flex', justifyContent: 'center', width:'full', height:'17%'}}>
                    <IonAvatar style={{height:'100%',width:'105px', backgroundColor: 'transparent'}}>
                        <img src="/assets/icon/default-profile.png" />
                    </IonAvatar>
                </div>

                <IonGrid>
                    <IonRow>
                        <IonCol className="ion-text-center">
                            <IonButton size="small" color="dark" style={{fontWeight:'bolder'}} fill="clear">Change Image</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-text-center">
                            <IonLabel style={{fontWeight: 'bolder', fontSize: '1.4rem'}}>James Bond</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                {/* <div style={{display: 'flex', width:'100%', justifyContent:'center'}}> */}
                    <IonItem className="ion-no-border mt-3 mx-3" lines="none" style={{border:'solid 1.5px',borderRadius:'15px'}}>
                        <IonIcon icon={moon} />
                        <IonLabel style={{marginLeft:'15px', fontWeight: 'bolder', fontSize:'16px'}}>Dark Mode</IonLabel>
                        <IonToggle   color="dark" onIonChange={toggleDarkModeHandler}></IonToggle>
                    </IonItem>

                    
                   
                        <IonButton color="dark" fill="outline"  expand="block" style={{borderRadius: '15px', marginTop: '15px', textAlign:'left'}} className="ion-text-left mx-3">
                            <IonIcon icon={logOut}  />
                            <IonLabel style={{marginLeft:'10px', fontWeight: 'bolder', textAlign: 'left'}}>Logout</IonLabel>
                        </IonButton>
                   
                    
                    
                    
                {/* </div> */}

                
            </IonContent>
        </IonPage>
    )
}

export default Settings