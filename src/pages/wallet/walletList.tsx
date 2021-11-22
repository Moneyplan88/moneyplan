import React, { useContext, useEffect } from "react"
import {IonItemSliding, IonContent, IonIcon, IonPage, IonItem, IonItemOption, IonItemOptions, IonLabel, IonList, IonFab, IonFabButton} from "@ionic/react"
import {add, create, trash} from "ionicons/icons"
import "./walletList.css"
import TitleBar from "../../components/TitleBar"
import { useHistory } from "react-router"
import UserContext from "../../data/user-context"

const WalletList:React.FC = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)

    useEffect(() => {
        if(userContext.token == ''){
            history.push('/login')
        }else{
            console.info("has token")

            // Fetch wallet if the length is 0
            if(userContext.wallet.length == 0){
                userContext.fetchWallet()
            }else{
                console.info("data is not 0")
            }
        }
    }, [userContext])
    
    return(
        <IonPage>
            <TitleBar title="Your Wallet" profile={true} />
            <IonContent className="container">
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton routerLink="/wallet/add">
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>

                    <IonList>
                        <div className="w-full justify-content-center mx-3 pb-1" >
                            {userContext.wallet.map(wallet => {
                                return <IonItemSliding style={{marginTop: '15px'}}className="card-wallet mx-0 " >
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
                                            }}>{wallet.wallet_name}</IonLabel>
                                            <p style={{
                                                fontSize: '1.2rem',
                                                marginTop: '8px',
                                                textAlign: 'left',
                                                fontWeight: 'bold',
                                                padding: '0px 0px',
                                                color: 'white'
                                            }}>Rp. {wallet.balance}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </IonItem>
                                </IonItemSliding>
                            })}
                        </div>      
                    </IonList>
            </IonContent>
        </IonPage>
    )
}

export default WalletList