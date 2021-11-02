import React from "react"
import {IonBackButton,IonItemSliding, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonItem, IonItemOption, IonItemOptions, IonLabel, IonList, IonThumbnail, isPlatform, IonFab, IonFabButton} from "@ionic/react"
import {add, arrowBack, create, femaleOutline, heart, maleOutline, personCircle, trash} from "ionicons/icons"
import "./walletList.css"
const WalletList:React.FC = () => {
    return(
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="false">
                    <IonButtons slot="start">
                        {isPlatform('ios') ? 
                            <IonBackButton defaultHref="home" icon={arrowBack} style={{marginLeft: '10px',width:'20px'}}  text="" />
                        : 
                            <IonBackButton defaultHref="home" />}
                    </IonButtons>
                    <IonTitle style={{fontWeight: 'bolder'}}>Your Wallet</IonTitle>
                    <IonButtons slot="end">
                        <IonButton>
                            <IonIcon icon={personCircle} style={{width:'30px', height:'30px'}}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>


            <IonContent className="container">
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton>
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>

                    <IonList>
                        <div className="w-full justify-content-center mx-3 pb-1" >   
                            <IonItemSliding style={{marginTop: '15px'}}className="card-wallet mx-0 " >
                                <IonItemOptions side="start">
                                    <IonItemOption color="warning">
                                        <IonIcon icon={create} style={{width:'60px', height:'30px'}}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItemOptions side="end">
                                    <IonItemOption color="danger" >
                                        <IonIcon icon={trash} style={{width:'60px', height:'30px'}}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>

                                    <IonItem color="primary">
                                        <div >
                                        <div style={{display: "flex", alignContent:"middle", marginTop:'15px'}}>
                                            <div >
                                            <IonLabel style={{
                                                fontSize:'0.8rem',
                                                fontWeight:'bold'

                                            }}>Gopay Current Balance</IonLabel>
                                            <p style={{
                                                fontSize: '1.2rem',
                                                marginTop: '8px',
                                                textAlign: 'left',
                                                fontWeight: 'bold',
                                                padding: '0px 0px',
                                                color: 'white'
                                            }}>Rp 3.000.000</p>
                                            </div>
                                        
                                        </div>
                                        </div>
                                    </IonItem>
                            </IonItemSliding>



                            <IonItemSliding style={{marginTop: '15px'}}className="card-wallet mx-0 " >
                                <IonItemOptions side="start">
                                    <IonItemOption color="warning">
                                        <IonIcon icon={create} style={{width:'60px', height:'30px'}}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItemOptions side="end">
                                    <IonItemOption color="danger" >
                                        <IonIcon icon={trash} style={{width:'60px', height:'30px'}}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>

                                    <IonItem color="primary">
                                        <div >
                                        <div style={{display: "flex", alignContent:"middle", marginTop:'15px'}}>
                                            <div >
                                            <IonLabel style={{
                                                fontSize:'0.8rem',
                                                fontWeight:'bold'

                                            }}>Dana Current Balance</IonLabel>
                                            <p style={{
                                                fontSize: '1.2rem',
                                                marginTop: '8px',
                                                fontWeight: 'bold',
                                                padding: '0px 0px',
                                                color: 'white'
                                            }}>Rp 4.065.000</p>
                                            </div>
                                        
                                        </div>
                                        </div>
                                    </IonItem>
                            </IonItemSliding>

                            
                            <IonItemSliding style={{marginTop: '15px'}}className="card-wallet mx-0 " >
                                <IonItemOptions side="start">
                                    <IonItemOption color="warning">
                                        <IonIcon icon={create} style={{width:'60px', height:'30px'}}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItemOptions side="end">
                                    <IonItemOption color="danger" >
                                        <IonIcon icon={trash} style={{width:'60px', height:'30px'}}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>

                                    <IonItem color="primary">
                                        <div >
                                        <div style={{display: "flex", alignContent:"middle", marginTop:'15px'}}>
                                            <div >
                                            <IonLabel style={{
                                                fontSize:'0.8rem',
                                                fontWeight:'bold'

                                            }}>OVO Current Balance</IonLabel>
                                            <p style={{
                                                fontSize: '1.2rem',
                                                marginTop: '8px',
                                                fontWeight: 'bold',
                                                padding: '0px 0px',
                                                color: 'white'
                                            }}>Rp 935.330</p>
                                            </div>
                                        
                                        </div>
                                        </div>
                                    </IonItem>
                            </IonItemSliding>
                        </div>      
                    </IonList>
            </IonContent>
        </IonPage>
    )
}

export default WalletList