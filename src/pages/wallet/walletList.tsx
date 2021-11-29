import React, { useContext, useEffect, useState } from "react"
import {IonItemSliding,useIonLoading,useIonToast, IonContent, IonIcon, IonPage, IonItem, IonItemOption, IonItemOptions, IonLabel, IonList, IonFab, IonFabButton} from "@ionic/react"
import {add, create, trash} from "ionicons/icons"
import "./walletList.css"
import TitleBar from "../../components/TitleBar"
import { useHistory } from "react-router"
import UserContext from "../../data/user-context"
import axios from "axios"

const WalletList:React.FC = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [token, setToken] = useState("")
    const [showLoader, hideLoader] = useIonLoading()
    const [presentToast, dismissToast] = useIonToast()

    useEffect(() => {
        const checkToken = async() => {
            showLoader({
                message: "Loading...",
                spinner: "circular"
            })
            const token = await userContext.getToken()
            await setToken(token)
            await userContext.fetchWallet()
            if(token === ''){
                hideLoader()
                history.push('/login')
            }else{
                hideLoader()
                console.info("has token")
                // Fetch wallet if the length is 0
                if(userContext.wallet.length === 0){
                }else{
                    console.info(userContext.wallet)
                }
            }
        }
        checkToken()

    }, [])

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

    const deleteHandler = async(id: any) => {

        showLoader({
            message: "Loading...",
            spinner: "circular"
          })
        axios(`https://moneyplan-api.herokuapp.com/api/wallet/remove?id_user_wallet=${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}` 
            } 
            
        }).then(res => {
            console.log(res)
            hideLoader()
            if(res.data.success===true){
                window.location.href = '/wallet'
                showToast('Wallet berhasil didelete','success')
            } else{
                showToast(res.data.errors.message,'danger')
              }
        }).catch(err => {
            console.log(err)
            hideLoader()
            showToast('An error occured during logged you in','danger')
          })
    }

    let layout
    if(userContext.wallet.length > 0){
        layout = userContext.wallet.map(wallet => {
            return <IonItemSliding key={wallet.id_user_wallet} style={{marginTop: '15px'}}className="card-wallet mx-0 " >
                <IonItemOptions side="start">
                    <IonItemOption color="warning">
                        <IonIcon icon={create} onClick={() => history.push(`wallet/edit/${wallet.id_user_wallet}`)} style={{width:'60px', height:'30px'}}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                <IonItemOptions side="end">
                    <IonItemOption color="danger" >
                        <IonIcon icon={trash} onClick={() => deleteHandler(wallet.id_user_wallet)} style={{width:'60px', height:'30px'}}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                <IonItem color="primary" onClick={() => history.push(`wallet/${wallet.id_user_wallet}`)}>
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
        layout = <p>No Wallet in yout account</p>
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