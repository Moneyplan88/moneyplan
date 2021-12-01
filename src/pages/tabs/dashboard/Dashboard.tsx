import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonRouterLink,
    IonContent,
    IonHeader,
    IonList,
    IonItem, 
    IonLabel,
    IonPage,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  } from '@ionic/react';
  import graphic from './images-dashboard/graphic.png';
  import TitleBar from "../../../components/TitleBar";
  import './dashboard.css';
  import { bag, wallet, fastFoodOutline, cashOutline, personCircle, cash } from 'ionicons/icons';
  import { useContext, useEffect, useState } from 'react';
  import UserContext from '../../../data/user-context';
  import { useHistory } from 'react-router';
  import axios from 'axios';
  import empty from '../../images/empty.png';
  import transaction from '../../../model/transaction.model';

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { Bar } from 'react-chartjs-2';
  import moment from 'moment';

  const Dashboard: React.FC = () => {
    const userContext = useContext(UserContext);
    const history = useHistory()
    const [spending, setSpending] = useState<any[]>([])
    const [transactions, setTransactions] = useState<Array<transaction>>([]);
    const [amount, setAmount] = useState(0)
    const [data, setData] = useState<any>()
    const [income, setIncome] = useState([])
    const [up, setUp] = useState<any[]>([])
    const [down, setDown] = useState<any[]>([])

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    const mapLabel = async(trx: transaction[]) => {
      let labels = new Set<string>()
      trx.map((item: transaction) => {
        labels.add(moment(item.created_at!.toLocaleString('default', { month: 'long' }).substring(5, 7)).format("MMMM"))
      })
      let temp: string[] = []
      labels.forEach(v => temp.push(v))
      return temp
    }

    const mapExpenses = async(labels: string[], trx: transaction[]) => {
      let expenses: number[] = []
      let expense: number
      labels.forEach(item => {
        expense = 0
        trx.filter((item: transaction) => item.type == 'income').forEach((tx: transaction) => {
          if (item == moment(tx.created_at!.toLocaleString('default', { month: 'long' }).substring(5, 7)).format("MMMM")) {
            expense += tx.amount ?? 0
          }
        })
        expenses.push(expense)
      })
      return expenses
    }

    const mapIncomes = async(labels: string[], trx: transaction[]) => {
      let incomes: number[] = []
      let income: number
      labels.forEach(item => {
        income = 0
        trx.filter((item: transaction) => item.type == 'expense').forEach((tx: transaction) => {
          if (item == moment(tx.created_at!.toLocaleString('default', { month: 'long' }).substring(5, 7)).format("MMMM")) {
            income += tx.amount ?? 0
          }
        })
        incomes.push(income)
      })
      return incomes
    }

    useEffect(() => {
      const checkToken = async() => {
        if(await userContext.getToken() === ''){
          history.push('/login')
        } else {
          const date = new Date()
          const year = date.getFullYear();
          const month = date.getMonth()
          const token = await userContext.getToken()

          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

          axios.all([
            axios.get(`https://mymoney.icedicey.com/api/transaction/user-transaction-top-spending?year=${year}&month=${month}`, options), 
            axios.get(`https://mymoney.icedicey.com/api/transaction/user-transaction`, options)
          ])
          .then(axios.spread(async (top, trans) => {
            console.log(top)
            setSpending(top.data.data)
            setTransactions(trans.data.data)
            console.log(transactions)

            let labels = await mapLabel(transactions)

            let incomes = await mapIncomes(labels, transactions)

            let expenses = await mapExpenses(labels, transactions)

            // let trx = trans.data.data
            // let labels = new Set<string>()
            // trx.map((item: transaction) => {
            //   labels.add(moment(item.created_at!.toLocaleString('default', { month: 'long' }).substring(5, 7)).format("MMMM"))
            // })

            // let temp: string[] = []
            // labels.forEach(v => temp.push(v))

            // let expenses: number[] = []
            // let incomes: number[] = []

            // let income: number, expense: number
            // labels.forEach(item => {
            //   income = 0
            //   trx.filter((item: transaction) => item.type == 'expense').forEach((tx: transaction) => {
            //     if (item == moment(tx.created_at!.toLocaleString('default', { month: 'long' }).substring(5, 7)).format("MMMM")) {
            //       income += tx.amount ?? 0
            //     }
            //   })
            //   incomes.push(income)
            //   expense = 0
            //   trx.filter((item: transaction) => item.type == 'income').forEach((tx: transaction) => {
            //     if (item == moment(tx.created_at!.toLocaleString('default', { month: 'long' }).substring(5, 7)).format("MMMM")) {
            //       expense += tx.amount ?? 0
            //     }
            //   })
            //   expenses.push(expense)
            // })
            const result = {
              labels: labels,
              datasets: [
                {
                  label: 'Income',
                  data: incomes,
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                  label: 'Expense',
                  data: expenses,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
              ]
            }
            setData(result)
          })).catch((err) => console.log(err));

          // await axios({
          //   method: 'get',
          //   url: `https://mymoney.icedicey.com/api/transaction/user-transaction-top-spending?year=${year}&month=${month}`,
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // })
          //   .then(res => {
          //       console.log(res)
          //       setSpending(res.data.data)
          //   }).catch(err => {
          //       console.log(err)
          //   })
        }
      }
      checkToken()
    }, [userContext])

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Monthly Transactions',
        },
      },
    };

    useEffect(() => {
     if(spending.length > 0){
       let total = 0
       for(let i = 0; i < spending.length;i++){
         if(spending[i].type === "expense"){
              total -= spending[i].amount
              console.log(total)
              // setUp((curr: any) => {
              //   return curr.push(spending[i])
              // })
         } else {
           total += spending[i].amount
          //  setDown((curr: any) => {
          //   return curr.push(spending[i])
          // })
         }
        console.log(spending[i])
       }
       setAmount(total)
       console.log('masuk')
     }
    }, [spending])

    let layout 
    if(spending.length == 0){
      layout = (
        <div>
          <img className="justify-content-center" src={empty} alt="No Spending" />
          <h4 className="align-center">No spending found.</h4>
        </div>
      )
    }else{
      layout = spending.map(spend => {
        console.log(spend)
        if(spend.type === "expense"){
          return(
            <IonList className="mx-3" key={spend.id_transaction}>
            <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
              <IonIcon slot="start" icon={cashOutline} />
              <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>{spend.title}</IonLabel>
              <IonLabel style={{textAlign:'right'}}>{spend.transaction_category}</IonLabel>
            </IonItem>
            </IonList>
          )
        }
      })
    }

    let layoutIncome
    if(income.length == 0){
      layoutIncome = (
        <div>
          <img className="justify-content-center" src={empty} alt="No Income" />
          <h4 className="align-center">No income found.</h4>
        </div>
      )
    }else{
      layoutIncome = spending.map(spend => {
        console.log(spend)
        if(spend.type === "income"){
          return(
          <IonList className="mx-3">
            <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
              <IonIcon slot="start" icon={cashOutline} />
              <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>{spend.title}</IonLabel>
              <IonLabel style={{textAlign:'right'}}>{spend.transaction_category}</IonLabel>
            </IonItem>
          </IonList>
          )
        }
      })
    }

    return(
      <IonPage>

        {console.log(data)}
        <IonHeader className="ion-no-border">
                  <IonToolbar color="false">
                     
                      <IonTitle style={{fontWeight: 'bolder'}}>Dashboard</IonTitle>
                      <IonButtons slot="end">
                          
                          <IonButton routerLink="/settings">
                              <IonIcon icon={personCircle} style={{width:'30px', height:'30px'}}/>
                          </IonButton>
                          
                          
                      </IonButtons>
                  </IonToolbar>
          </IonHeader>
        <IonContent >


        <IonGrid>

        <IonRow>
          <IonCol>
            <IonCard style={{background: '#ecf0f1'}}>
                <IonCardContent>
                  <IonRouterLink routerLink="/wallet">
                    <div className="card-container">
                        <img className="home-card" src={graphic}/>
                        <div className="card-content mx-3">
                          <div style={{fontSize:'12px', fontWeight:'bold'}}>
                            Monthly Balance
                          </div>
                          <div style={{fontSize:'20px', fontWeight:'bolder'}}>
                          {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount as number)}
                          </div>
                          <div className="mt-2" style={{display:'flex'}}>
                            <IonIcon icon={wallet} style={{width:'20px', height:'20px'}} />
                            <span style={{marginLeft:'4px'}}>Wallet </span>
                          </div>
                        </div>
                    </div>
                  </IonRouterLink>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {data !== undefined ? <Bar options={options} data={data} /> : ''}
            </IonCol>
          </IonRow>
          

          <IonRow>
            <IonCol>
              <div>
                <p className="latest-trans"><b>Top Spending</b></p>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {layout}
            </IonCol>
          </IonRow>
  
          <div>
            <p className="latest-trans"><b>Top Income</b></p>
          </div>
            {layoutIncome}
          </IonGrid>
      </IonContent>
      </IonPage>
    );
  }
  
  
  export default Dashboard;