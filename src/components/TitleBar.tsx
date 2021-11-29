import { IonHeader, IonToolbar, IonButtons, isPlatform, IonBackButton, IonTitle, IonButton, IonIcon } from "@ionic/react"
import { arrowBack, ellipsisHorizontal, personCircle } from "ionicons/icons"
import React from "react"

const TitleBar: React.FC<{title:string, profile:Boolean}> = (props) => {
    return(
        <IonHeader className="ion-no-border">
                <IonToolbar color="false">
                    <IonButtons slot="start">
                        {isPlatform('ios') ? 
<<<<<<< HEAD
                            <IonBackButton defaultHref="/tabs/home" icon={arrowBack} style={{marginLeft: '10px',width:'20px'}}  text="" />
                        : 
                            <IonBackButton defaultHref="/tabs/home" />}
=======
                            <IonBackButton defaultHref="tabs/home" icon={arrowBack} style={{marginLeft: '10px',width:'20px'}}  text="" />
                        : 
                            <IonBackButton defaultHref="tabs/home" />}
>>>>>>> 948c386e0a1a4132de73da17a953ea088af3705c
                    </IonButtons>
                    <IonTitle style={{fontWeight: 'bolder'}}>{props.title}</IonTitle>
                    <IonButtons slot="end">
                        {props.profile &&    
                        <IonButton routerLink="/settings">
                            <IonIcon icon={personCircle} style={{width:'30px', height:'30px'}}/>
                        </IonButton>
                        }
                        <IonButton>
                            <IonIcon icon={ellipsisHorizontal} style={{width:'20px', height:'20px'}}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
        </IonHeader>
    )
}

export default TitleBar