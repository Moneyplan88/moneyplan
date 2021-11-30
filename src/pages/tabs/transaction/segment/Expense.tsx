import React from "react"
import {IonItemSliding, IonContent, IonIcon, useIonLoading, useIonToast, IonPage, IonItem, IonItemOption, IonItemOptions, IonLabel, IonList, IonFab, IonFabButton, IonTitle} from "@ionic/react"
import {add, create, trash} from "ionicons/icons"
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserContext from '../../../../data/user-context';
import { urlTransactionDelete } from "../../../../data/Urls";

const Expense:React.FC = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [saldo, setSaldo] = useState(0)
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

    useEffect(() => {
        if(userContext.token == ''){
            history.push('/login')
        }else{
            if(userContext.transaction.length == 0 && !fetched){
                userContext.fetchTransaction()
                setFetched(true)
            }
        }
    }, [userContext])

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
            if(trans.type == "expense"){
                return <IonItemSliding key={trans.id_transaction_category} style={{marginTop: '15px'}} className="card-wallet mx-0 " >
                    <IonItemOptions side="start">
                        {/* TODO: Edit category */}
                        <IonItemOption color="warning">
                            <IonIcon icon={create} style={{width:'60px', height:'30px'}}></IonIcon>
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
        layout = <p style={{textAlign: 'center'}}>No Expense yet.</p>
    }

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
                            {layout}
                        </div>      
                    </IonList>

                    {/* <IonList>
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
                    </IonList> */}
            </IonContent>
        </IonPage>
    )
}

export default Expense;