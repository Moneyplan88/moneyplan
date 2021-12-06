import {
  IonContent,
  IonGrid,
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
  IonText,
} from "@ionic/react";

import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../../../data/user-context";
import TitleBar from "../../../components/TitleBar";
import axios from "axios";
import transaction from '../../../model/transaction.model';
import empty from '../../images/empty.png';

const DetailWallet: React.FC = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [wallet, setWallet] = useState("");
  const [infoWallet, setInfoWallet] = useState({});
  const [saldo, setSaldo] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [transactions, setTransactions] = useState<Array<transaction>>([]);

  const [presentToast, dismissToast] = useIonToast();
  const [showLoader, hideLoader] = useIonLoading();

  useEffect(() => {
    const fetchWalletData = async () => {
      showLoader();
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
        axios.get(`https://mymoney.icedicey.com/api/wallet/info?id_user_wallet=${id}`, options), 
        axios.get(`https://mymoney.icedicey.com/api/transaction/user-transaction?id_user_wallet=${id}`, options)
      ])
      .then(axios.spread((wallet, transactions) => {
        
        console.log(wallet);
        setInfoWallet(wallet);
        setWallet(wallet.data.data.wallet_name);
        setSaldo(wallet.data.data.balance);
        console.log(transactions);
        setTransactions(transactions.data.data);
        hideLoader();
        
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

  let layout 
  if(transactions.length === 0){
    layout = (
      <div>
        <img id="img-center" src="https://media.istockphoto.com/photos/blank-empty-book-pages-picture-id147877178?k=20&m=147877178&s=170667a&w=0&h=V9XaK5p2gEBUnMdqek4PXeF2wU5k-HSoaBPtl5YB54s=" alt="No History" />
        <IonText className="align-center">No history found.</IonText>
      </div>
    )
  }else{
    layout = transactions.map(transaction =>
      <IonItem key={transaction.id_transaction}>
        <IonAvatar slot="start">
          <IonImg src={transaction.type == 'income' ? up : down} />
        </IonAvatar>
        <IonLabel>
          <h2>{transaction.title}</h2>
          <h3>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(transaction.amount as number)}</h3>
          <h4>{transaction.description}</h4>
        </IonLabel>
      </IonItem>)
  }

  return (
    <IonPage>
      <TitleBar title={`Wallet `+wallet} profile={true} />
      {wallet !== "" && (
        <IonContent>
          <IonGrid>

            <IonRow>
              <IonCol>
                <IonCard>
                  <IonImg src="https://d2j6dbq0eux0bg.cloudfront.net/default-store/giftcards/gift_card_003_1500px.jpg" />
                  <IonCardHeader>
                    <IonCardSubtitle>{wallet}</IonCardSubtitle>
                    <IonCardTitle>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(saldo as number)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonList>
              <h2 className="align-center">Wallet History</h2>
              {layout}
            </IonList>

          </IonGrid>
        </IonContent>
      )}
    </IonPage>
  );
};

export default DetailWallet;
