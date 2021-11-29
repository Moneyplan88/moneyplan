import React, { useContext, useEffect } from "react"
import {IonItemSliding, IonContent, IonIcon, IonPage, IonItem, IonItemOption, IonItemOptions, IonLabel, IonList, IonFab, IonFabButton, useIonLoading, useIonToast} from "@ionic/react"
import {add, create, trash} from "ionicons/icons"
import "./walletList.css"
import TitleBar from "../../components/TitleBar"
import { useHistory } from "react-router"
import UserContext from "../../data/user-context"
import { urlWalletDelete } from "../../data/Urls"
import Wallet from "../../model/wallet.model"

const WalletList:React.FC = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)

    const [presentToast, dismissToast] = useIonToast()
    const [showLoader, hideLoader] = useIonLoading()  

    const showToast = (msg: string, color: ('danger'|'success')) => {    
        presentToast({
            buttons: [
                { text: 'Okay', handler: () => dismissToast() },
            ],
            color: color,
            message: msg,
            duration: 2000,
        }) 
    };

    useEffect(() => {
        if(userContext.token === ''){
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

    const deleteHandler = async (id: any) => {
        showLoader({
            message: "Loading...",
            spinner: "circular"
        })
        fetch(urlWalletDelete+id,{ 
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + userContext.token,
            },
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            hideLoader()
            // Sukses delete
            if(data.success == true){
                showToast('Delete wallet success','success')
                userContext.fetchWallet()
            }
            // Gagal delete
            else{
                showToast('Failed to delete wallet','danger')
            }
        })
        .catch(_ => {
            hideLoader()
            showToast('Failed to delete wallet','danger')
        })
    }

    const editHandler = (wallet: Wallet) => {
        history.push({
            pathname: '/wallet/edit',
            state: wallet,
        })
    }

    let layout
    if(userContext.wallet.length > 0){
        layout = userContext.wallet.map(wallet => {
            return <IonItemSliding id={wallet.id_user_wallet} style={{marginTop: '15px'}}className="card-wallet mx-0 " >
                <IonItemOptions side="start">
                    <IonItemOption color="warning" onClick={() => editHandler(wallet)}>
                        <IonIcon icon={create} style={{width:'60px', height:'30px'}}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() => deleteHandler(wallet.id_user_wallet)}>
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
        })
    }else{
        layout = <p style={{textAlign: 'center',}}>No Wallet in your account</p>
    }
    
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
                            {layout}
                        </div>      
                    </IonList>
            </IonContent>
        </IonPage>
    )
}

export default WalletList