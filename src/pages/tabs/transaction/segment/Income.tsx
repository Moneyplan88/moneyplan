import React from "react"
import {IonItemSliding, IonContent, IonIcon, useIonToast, useIonLoading, IonPage, IonItem, IonItemOption, IonItemOptions, IonLabel, IonList, IonFab, IonFabButton} from "@ionic/react"
import {add, create, trash} from "ionicons/icons"
import UserContext from '../../../../data/user-context';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { urlTransactionDelete } from "../../../../data/Urls";

const Income:React.FC = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [presentToast, dismissToast] = useIonToast()
    const [showLoader, hideLoader] = useIonLoading()  
    const [fetched, setFetched] = useState(false)

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
    // useEffect(() => {
    //     const checkToken = async() => {

    //         if(await userContext.getToken() == ''){
    //             history.push('/login')
    //         }else{
    //             if(userContext.transaction.length == 0 && !fetched){
    //                 userContext.fetchTransaction()
    //                 setFetched(true)
    //             }
    //         }
    //     }
    //     checkToken()
    // }, [userContext])

    const deleteHandler = async (id: any) => {
        showLoader({
            message: "Loading...",
            spinner: "circular"
        })
        fetch(urlTransactionDelete+id,{ 
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
                showToast('Successfully delete transaction','success')
                userContext.fetchTransaction()
            }
            // Gagal delete
            else{
                showToast('Failed to delete transaction','danger')
            }
        })
        .catch(_ => {
            hideLoader()
            showToast('Failed to delete transaction','danger')
        })
    }


    let layout
    if(userContext.transaction.length > 0){
        layout = userContext.transaction.map(trans => {
            if(trans.type == "income"){
                return <IonItemSliding key={trans.id_transaction} style={{marginTop: '15px'}} className="card-wallet mx-0 " >
                    <IonItemOptions side="start">
                        {/* TODO: Edit category */}
                        <IonItemOption color="warning">
                            <IonIcon icon={create} onClick={() => history.push(`../editTransaction/${trans.id_transaction}`)} style={{width:'60px', height:'30px'}}></IonIcon>
                        </IonItemOption>
                    </IonItemOptions>
                    <IonItemOptions side="end">
                        <IonItemOption color="danger" onClick={() => deleteHandler(trans.id_transaction)}>
                            <IonIcon icon={trash} style={{width:'60px', height:'30px'}}></IonIcon>
                        </IonItemOption>
                    </IonItemOptions>
                    <IonItem color="light" onClick={() => history.push(`../transaction/${trans.id_transaction}`)}>
                        <div style={{display: "flex", alignContent:"middle"}}>
                            <IonLabel style={{
                                fontSize:'0.8rem',
                                fontWeight:'bold',
                                color: 'black'
                            }}>{trans.title}</IonLabel>
                        </div>
                    </IonItem>
                </IonItemSliding>
            }
        })
    }else{
        layout = <p style={{textAlign: 'center'}}>No Income yet.</p>
    }

    return(
      
            <IonContent  style={{
                maxWidth: "414px",
                alignSelf: "center",
                backgroundColor: "transparent",
              }}>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton href="/addTransaction">
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                <IonList>
                    <div className="w-full justify-content-center mx-3 pb-1" >   
                        {layout}
                    </div>      
                </IonList>
            </IonContent>
      
    )
}

export default Income;