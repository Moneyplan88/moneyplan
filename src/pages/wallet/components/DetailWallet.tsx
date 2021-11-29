import {
  IonButton,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  useIonLoading,
  useIonToast,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
} from "@ionic/react";

import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../../../data/user-context";
import { urlWalletAdd, urlWalletEdit } from "../../../data/Urls";
import TitleBar from "../../../components/TitleBar";
import axios from "axios";
import transaction from '../../../model/transaction.model';

const DetailWallet: React.FC = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [wallet, setWallet] = useState("");
  const [infoWallet, setInfoWallet] = useState({});
  const [saldo, setSaldo] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useState("");
  const [transactions, setTransactions] = useState<Array<transaction>>([]);

  const [presentToast, dismissToast] = useIonToast();
  const [showLoader, hideLoader] = useIonLoading();

  useEffect(() => {
    const fetchWalletData = async () => {
      const token = await userContext.getToken();
      console.log(token);

      if (token === "") {
        history.push("/login");
      }

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      axios.all([
        axios.get(`https://moneyplan-api.herokuapp.com/api/wallet/info?id_user_wallet=${id}`, options), 
        axios.get(`https://moneyplan-api.herokuapp.com/api/transaction/user-transaction?id_user_wallet=${id}`, options)
      ])
      .then(axios.spread((wallet, transactions) => {
        
        console.log(wallet);
        setInfoWallet(wallet);
        setWallet(wallet.data.data.wallet_name);
        setSaldo(wallet.data.data.balance);
        console.log(transactions);
        setTransactions(transactions.data.data);
        
      })).catch((err) => console.log(err));
    };
    fetchWalletData();
  }, [userContext.wallet]);

  const showToast = (msg: string, color: "danger" | "success") => {
    presentToast({
      buttons: [{ text: "Okay", handler: () => dismissToast() }],
      color: color,
      message: msg,
      duration: 2000,
    });
  };

  const down = 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-down-icon.png';
  const up = 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-up-icon.png';

  return (
    <IonPage>
      <TitleBar title="Edit Wallet" profile={true} />
      {wallet !== "" && (
        <IonContent>
          <IonGrid>

            <IonRow>
              <IonCol>
                <IonCard>
                  <IonImg src="https://d2j6dbq0eux0bg.cloudfront.net/default-store/giftcards/gift_card_003_1500px.jpg" />
                  <IonCardHeader>
                    <IonCardSubtitle>{wallet}</IonCardSubtitle>
                    <IonCardTitle>{saldo}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonList>
            {transactions.map(transaction =>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src={transaction.type == 'income' ? up : down} />
                </IonAvatar>
                <IonLabel>
                  <h2>{transaction.title}</h2>
                  <h3>{transaction.amount}</h3>
                  <h4>{transaction.description}</h4>
                </IonLabel>
              </IonItem>)}
            </IonList>

          </IonGrid>
        </IonContent>
      )}
    </IonPage>
  );
};

export default DetailWallet;
