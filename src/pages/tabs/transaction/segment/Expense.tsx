import React from "react"
import {IonItemSliding, IonContent, IonIcon, IonPage, IonItem, IonItemOption, IonItemOptions, IonLabel, IonList, IonFab, IonFabButton, IonTitle} from "@ionic/react"
import {add, create, trash} from "ionicons/icons"

const Expense:React.FC = () => {
    return(
        <IonPage>
            <div style={{
                         textAlign: "center",
                         fontSize: "25px",
                         fontWeight: "bold",
                         marginTop: "10px"
                        }}>Your Expense</div>

            <IonContent className="container">
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton  href="/addTransaction">
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

                                    <IonItem color="medium">
                                        <div >
                                        <div style={{display: "flex", alignContent:"middle", marginTop:'15px'}}>
                                            <div >
                                            <IonLabel style={{
                                                fontSize:'0.8rem',
                                                fontWeight:'bold',
                                                color: 'black'

                                            }}>Investment</IonLabel>
                                            <p style={{
                                                fontSize: '1.2rem',
                                                marginTop: '8px',
                                                textAlign: 'left',
                                                fontWeight: 'bold',
                                                padding: '0px 0px',
                                                color: 'black'
                                            }}>Rp 1.200.000</p>
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

                                    <IonItem color="medium">
                                        <div >
                                        <div style={{display: "flex", alignContent:"middle", marginTop:'15px'}}>
                                            <div >
                                            <IonLabel style={{
                                                fontSize:'0.8rem',
                                                fontWeight:'bold',
                                                color: 'black'

                                            }}>Freelance</IonLabel>
                                            <p style={{
                                                fontSize: '1.2rem',
                                                marginTop: '8px',
                                                fontWeight: 'bold',
                                                padding: '0px 0px',
                                                color: 'black'
                                            }}>Rp 5.500.000</p>
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

export default Expense;