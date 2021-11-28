import { IonPage, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonRouterLink, IonButton, IonContent, useIonLoading, useIonToast } from "@ionic/react";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import TitleBar from "../../../../../components/TitleBar";
import { urlCategoryAdd } from "../../../../../data/Urls";
import UserContext from "../../../../../data/user-context";

const AddCategory: React.FC= () => {
  const [name, setName] = useState('')
  const userContext = useContext(UserContext)

  const [presentToast, dismissToast] = useIonToast()
  const [showLoader, hideLoader] = useIonLoading()
  const history = useHistory()

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

  const addCategoryHandler = () => {
    console.info(name)
    if(name == '') showToast('Category name should not be empty','danger')

    const formData = new FormData()
    formData.append('category_name',name)
    
    showLoader({
      message: "Loading...",
      spinner: "circular"
    })
    fetch(urlCategoryAdd,{ 
      method: "POST",
      body: formData,
      headers: {
        'Authorization': 'Bearer ' + userContext.token,
      }
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      hideLoader()
      console.log(data.data.message)

      // Sukses login
      if(data.data.message == "Please use this new token after user update"){
        showToast('Change profile success','success')

        // TODO: Redirect to dashboard
        history.push('/tabs')
      }
      // Gagal login
      else{
        showToast(data.errors.message,'danger')
      }
    })
    .catch(_ => {
      hideLoader()
      showToast('Failed to add new category','danger')
    })
  }
  
  return (
      <IonPage>
        <TitleBar title="Add New Category" profile={true} />
        <IonContent>
          <IonList>
              <IonItem class="ion-item">
                <IonLabel position="floating">Enter Category Name</IonLabel>
                <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
              </IonItem>
              <IonButton class="ion-item ion-button"  onClick={addCategoryHandler}>
                Add Category
              </IonButton>
          </IonList>
        </IonContent>
    </IonPage>
  )
}

export default AddCategory;