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
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  } from '@ionic/react';
  import graphic from './images-dashboard/graphic.png';
  import './dashboard.css';
  import { wallet, cashOutline, personCircle } from 'ionicons/icons';
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
  import { urlTransactionChart, urlTransactionList } from '../../../data/Urls';

  const Dashboard: React.FC = () => {
    const userContext = useContext(UserContext);
    const history = useHistory()
    const [spending, setSpending] = useState<any[]>([])
    const [amount, setAmount] = useState(0)
    const [data, setData] = useState<any>()
    const [income, setIncome] = useState<transaction[]>([])
    const [expense, setExpense] = useState<transaction[]>([])
    const date = new Date()

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
      setExpense(trx)
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
      setIncome(trx)
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
          const year = date.getFullYear();
          const month = date.getMonth()+1
          const token = await userContext.getToken()

          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

          axios.all([
            axios.get(urlTransactionChart+year+`&month=`+month, options), 
            axios.get(urlTransactionList, options)
          ])
          .then(axios.spread(async (top, trans) => {
            setSpending(top.data.data)
            let labels = await mapLabel(trans.data.data)
            let incomes = await mapIncomes(labels, trans.data.data)
            let expenses = await mapExpenses(labels, trans.data.data)
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
          text: `Monthly Transactions`,
        },
      },
    };

    useEffect(() => {
      if(spending.length > 0){
        let total = 0
        for(let i = 0; i < spending.length;i++){
          if(spending[i].type === "expense"){
                total -= spending[i].amount
          } else {
            total += spending[i].amount
          }
        }
        setAmount(total)
      }
    }, [spending])

    let layout 
    if(expense.length == 0){
      layout = (
        <div>
          <img className="justify-content-center" src={empty} alt="No Spending" />
          <h4 className="align-center">No spending found.</h4>
        </div>
      )
    }else{
      layout = spending.map(spend => {
        if(spend.type === "expense"){
          return(
            <IonList className="mx-3 my-3" key={spend.id_transaction}>
              <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
                <IonIcon slot="start" icon={cashOutline} />
                <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>{spend.title}</IonLabel>
                <IonLabel style={{textAlign:'right'}}>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(spend.amount as number)}</IonLabel>
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
        if(spend.type === "income"){
          return(
          <IonList className="mx-3 my-3" key={spend.id_transaction}>
            <IonItem style={{borderRadius:'15px'}} lines="none" color="light">
              <IonIcon slot="start" icon={cashOutline} />
              <IonLabel style={{fontWeight:'bolder', fontSize:'18px'}}>{spend.title}</IonLabel>
              <IonLabel style={{textAlign:'right'}}>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(spend.amount as number)}</IonLabel>
            </IonItem>
          </IonList>
          )
        }
      })
    }

    return(
      <IonPage>
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
                                {date.toLocaleString('default', { month: 'long' })} Balance
                              </div>
                              <div style={{fontSize:'18px', fontWeight:'bolder'}}>
                              {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount as number)}
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
                  <p className="latest-trans"><b>Top Expenses</b></p>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {layout}
              </IonCol>
            </IonRow>
            <div>
              <p className="latest-trans"><b>Top Incomes</b></p>
            </div>
            {layoutIncome}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
  
  
  export default Dashboard;