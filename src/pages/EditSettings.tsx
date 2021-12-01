import {
  IonButton,
  IonIcon,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonRow,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import TitleBar from "../components/TitleBar";
import { urlUserEdit } from "../data/Urls";
import {Directory, Filesystem} from "@capacitor/filesystem";
import UserContext from "../data/user-context";
import { camera } from "ionicons/icons";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import "./EditSettings.css";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import axios from "axios";

const EditSettings: React.FC = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [token, setToken] = useState("");

  const [presentToast, dismissToast] = useIonToast();
  const [showLoader, hideLoader] = useIonLoading();

  useEffect(() => {
    const checkToken = async () => {
      if ((await userContext.getToken()) === "") {
        history.push("/login");
        setToken(await userContext.getToken());
      } else {
        console.info("has token");
        console.log(userContext.user);
        setEmail(userContext.user.email ?? "");
        setName(userContext.user.name ?? "");
        setPhoto(userContext.user.photo_user ?? "");
      }
    };
    checkToken();
  }, [userContext]);

  const showToast = (msg: string, color: "danger" | "success") => {
    presentToast({
      buttons: [{ text: "Okay", handler: () => dismissToast() }],
      color: color,
      message: msg,
      duration: 2000,
    });
  };

  const [takenPhoto, setTakenPhoto] = useState<{
    path: any;
    preview: any;
  }>();

  function dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  const b64toBlob = (
    b64Data: any,
    contentType = "image/jpg",
    sliceSize = 512
  ) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const takePhotoHandler = async () => {
    const photo = Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
      height: 500,
    });
    console.log(photo);

    if (!photo || /*!(await photo).path*/ !(await photo).webPath) {
      return;
    }

    setTakenPhoto({
      path: (await photo).path,
      preview: (await photo).webPath,
    });
  };

  const submitChangeProfile = async () => {
    console.info(email);
    console.warn(password);
    if (email === "" || !email.includes("@"))
      showToast("Email is invalid. Please Check Again.", "danger");
    if (password === "")
      showToast("Password is invalid. Please Check Again.", "danger");

    let file: Blob;
    let base64: any;
    const fileName = new Date().getTime() + ".jpg";
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    if (takenPhoto! !== undefined) {
      base64 = await base64FromPath(takenPhoto!.preview);
      var blob = new Blob([base64], { type: "image/jpg" });
      await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.Data
    })
      // const blob = dataURItoBlob(takenPhoto!.path)
      // file = dataURLtoFile(base64, fileName)
      console.log(takenPhoto!.preview);
      const file = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data
    })
      // const blob = b64toBlob(base64.replace("data:image/png;base64,", ""))
      // console.log(file)
      console.log(blob);
      // console.log(file.data)
      formData.append("photo_user",b64toBlob(file.data),"gambar1.jpg");
    }
    // console.log(base64)

    showLoader({
      message: "Loading...",
      spinner: "circular",
    });

    const token2 = await userContext.getToken();
    // console.log(token2)

    axios({
      method: "post",
      data: formData,
      url: urlUserEdit,
      headers: {
        Authorization: `Bearer ${token2}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((data) => {
        console.log(data);
        hideLoader();
        console.log(data.data);

        // Sukses login
        if (data.data.success === true) {
          showToast("Change profile success", "success");

          // Simpan token
          userContext.storeToken(data.data.data.token);

          // TODO: Redirect to dashboard
         window.location.href="/tabs/home"
        }
        // Gagal login
        else {
          showToast(data.data.errors, "danger");
        }
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        showToast("Failed to change your profile", "danger");
      });
  };

  return (
    <IonPage>
      <TitleBar title="Edit Settings" profile={false} />
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid id="content">
          <IonRow className="ion-text-center">
            <IonCol>
              <div className="image-preview-wrapper">
                <div className="image-preview">
                  {!takenPhoto ? !photo ? <h3>No photo chosen.</h3> : <img src={'https://mymoney.icedicey.com/' + photo} alt="Preview" /> : <img src={takenPhoto.preview} alt="Preview" />}
                </div>
              </div>
              <IonButton fill="clear" onClick={takePhotoHandler}>
                <IonIcon slot="start" icon={camera} />
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating" style={{ fontWeight: "normal" }}>
                  Name
                </IonLabel>
                <IonInput
                  value={name}
                  type="text"
                  onIonChange={(e) => setName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating" style={{ fontWeight: "normal" }}>
                  Email Address
                </IonLabel>
                <IonInput
                  value={email}
                  type="email"
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="mt-4">
            <IonCol className="ion-text-center">
              <IonButton
                expand="block"
                className="button-login"
                strong={true}
                type="submit"
                onClick={submitChangeProfile}
              >
                Change Profile
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditSettings;
