import React, { useContext, useEffect } from "react"
import {IonItemSliding, IonContent, IonIcon, IonPage, IonItem, IonItemOption, IonItemOptions, IonLabel, IonList, IonFab, IonFabButton, useIonLoading, useIonToast} from "@ionic/react"
import {add, create, trash} from "ionicons/icons"
import UserContext from "../../../../../data/user-context"
import { useHistory } from "react-router"
import { urlCategoryDelete } from "../../../../../data/Urls"
import TitleBar from "../../../../../components/TitleBar"

const Category:React.FC = () => {
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
        const checkToken = async() =>{

            if(await userContext.getToken() == ''){
                history.push('/login')
            }else{
                // Fetch all category
                userContext.fetchAllCategory()
            } 
        }
        checkToken()
    }, [])

    const deleteHandler = async (id: any) => {
        showLoader({
            message: "Loading...",
            spinner: "circular"
        })
        fetch(urlCategoryDelete+id,{ 
        method: "DELETE",
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            hideLoader()
            // Sukses delete
            if(data.success == true){
                showToast('Delete category success','success')
                userContext.fetchAllCategory()
            }
            // Gagal delete
            else{
                showToast('Failed to delete category','danger')
            }
        })
        .catch(_ => {
            hideLoader()
            showToast('Failed to delete category','danger')
        })
    }

    let layout
    if(userContext.categories.length > 0){
        layout = userContext.categories.map(category => {
            return <IonItemSliding key={category.id_transaction_category} style={{marginTop: '15px'}} className="card-wallet mx-0 " >
                <IonItemOptions side="start">
                    {/* TODO: Edit category */}
                    <IonItemOption color="warning">
                        <IonIcon icon={create} style={{width:'60px', height:'30px'}}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() => deleteHandler(category.id_transaction_category)}>
                        <IonIcon icon={trash} style={{width:'60px', height:'30px'}}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                <IonItem color="light">
                    <div style={{display: "flex", alignContent:"middle"}}>
                        <IonLabel style={{
                            fontSize:'0.8rem',
                            fontWeight:'bold',
                            color: 'black'
                        }}>{category.category_name}</IonLabel>
                    </div>
                </IonItem>
            </IonItemSliding>
        })
    }else{
        layout = <p>No categories yet.</p>
    }

    return(
        <IonPage>
            <div style={{
                         textAlign: "center",
                         fontSize: "25px",
                         fontWeight: "bold",
                         marginTop: "10px"
                        }}>Category List </div>
            <TitleBar profile={true} title={""} />

            <IonContent className="container">
                    <IonFab vertical="bottom" horizontal="end">
                        <IonFabButton href="/addCategory">
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

export default Category;