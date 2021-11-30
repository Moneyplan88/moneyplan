import {
  IonContent,
  IonGrid,
  IonPage,
  useIonLoading,
  useIonToast,
  IonRow,
  IonCol,
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import './Transaction.css';

import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../../../data/user-context";
import TitleBar from "../../../components/TitleBar";
import axios from "axios";
import transaction from "../../../model/transaction.model";
import moment from "moment";

const DetailTransaction: React.FC = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<transaction>({});
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [presentToast, dismissToast] = useIonToast();
  const [showLoader, hideLoader] = useIonLoading();

  useEffect(() => {
    const fetchTransactionData = async () => {
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
      };

      axios(
        `https://mymoney.icedicey.com/api/transaction/user-transaction?id_transaction=${id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          setTransaction(res.data.data);
          const str = transaction.created_at;
          const date = moment(str);
          const dateComponent = date.utc().format('dddd, DD MMMM YYYY');
          const timeComponent = date.utc().format('HH:mm:ss');
          setDate(dateComponent);
          setTime(timeComponent);
          hideLoader();
        })
        .catch((err) => {
          console.log(err);
          hideLoader();
        });
    };
    fetchTransactionData();
  }, []);

  const showToast = (msg: string, color: "danger" | "success") => {
    presentToast({
      buttons: [{ text: "Okay", handler: () => dismissToast() }],
      color: color,
      message: msg,
      duration: 2000,
    });
  };

  return (
    <IonPage>
      <TitleBar title={transaction?.type == 'income' ? 'Income' : 'Expense'} profile={true} />
      {transaction !== "" && (
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard className={transaction?.type == 'income' ? 'income-bg' : 'expense-bg'}>
                  <IonCardHeader>
                    <IonCardSubtitle>{transaction?.title}</IonCardSubtitle>
                    <IonCardTitle>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(transaction?.amount as number)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="ion-text-end">
                    {transaction?.description}
                    <h2>{transaction.transaction_category}</h2>
                    <p className="transaction-detail">{date}</p>
                    <p className="transaction-detail">{time}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      )}
    </IonPage>
  );
};

export default DetailTransaction;
