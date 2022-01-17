import React , {Component} from 'react';
import cookie from './../../services/cookieService';
import PageTitle from './../../components/MainLayout/PageTitle/PageTitle';
import Aux from './../../hoc/Auxiliary/Auxiliary';
import SearchAndInfo from '../../components/MainLayout/SearchAndInfo/SearchAndInfo';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from './../../axios-general';
import AccountSelection from '../../components/MainLayout/AccountSelection/AccountSelection';
import Table from '../../components/UI/Table/Table';

const TABLE_FIELDS = ['المحدد','الحساب ' ,'رصيد مدين', 'رصيد دائن']; 

class TrialBalance extends Component{


    state = {
        currency: this.props.foundCurrency,
        account : {name : '' , index : '' , id :0},
        trialBalance : [],
        accountToSearch : '',
        searchAccountResults:[],
        searchingAccount:false,
        choosingAccount:false,
        loading:false,
        loaded:false,
        exporting:false,
        foundName:this.props.foundName
    }

    accountToSearchChangeHandler = event=>{
        this.setState({
            accountToSearch:event.target.value
        });
    }

    componentDidMount(){
        if(!cookie.get('access-token')){
            this.props.history.replace('/');
            return;
        }
    }


    searchAccountHandler=searchKey=>{
        this.setState({
            searchingAccount:true
        });
        const config = {
            headers:{
                Authorization :'Bearer '+cookie.get('access-token'),
                Accept : 'application/json'
            }
        };

        axios.get(`/accounts/search?foundId=${this.props.foundId}&string=${searchKey}` , config)
        .then(response=>{
            if(response.data.data.length===1){
                this.setState({
                    account:response.data.data[0],
                    searchingAccount:false,
                });

            }else if(response.data.data.length>1){

                this.setState({
                    searchAccountResults:response.data.data,
                    choosingAccount:true,
                    searchingAccount:false
                })

            }

        }).catch(error=>{
            console.log(error);
        });

    }

    chooseAccountFromResults = (accountId)=>{
        
        let vAccount =null;
         this.state.searchAccountResults.forEach(current=>{
            if(current.id===accountId){

                vAccount= current;

            }
        });
        

        
        this.setState({
                account: vAccount,
                choosingAccount:false,
                searchAccountResults:[],
                accountToSearch : vAccount.index + '-'+vAccount.name


            });

    }

    chooseAccountCancelHandler = ()=>{
        this.setState({
            choosingAccount:false,
            searchAccountResults  :[]
        });
    }

    keyPressHandler = event=>{
        if(event.target.name==='searchField'){
            if(event.charCode===13){
                this.searchAccountHandler(this.state.accountToSearch);

            }

        }
    }

    getTrialBalance = ()=>{
        this.setState({
            loading:true
        });
        const config = {
            headers:{
                 Authorization :'Bearer '+cookie.get('access-token'),
                 Accept : 'application/json'
                    }
            };
        
        axios.get(`/foundations/${this.props.foundId}/ledgeraccounts/${this.state.account.id}/trialbalance`,config)
        .then(response=>{
            const vTrialBalance = [{
                rowId:1,
                accountNameAndIndex:response.data.data[0].accountNameAndIndex,
                debitBalance:response.data.data[0].debitBalance,
                creditBalance : response.data.data[0].creditBalance
                
            }];

            this.setState({
                trialBalance:vTrialBalance,
               
                loading:false,
                loaded:true
            });

        });
    }

    exportTrialBalance= ()=>{
        this.setState({
            exporting:true
        });
        const config = {
            responseType: 'blob',
            headers:{
                 Authorization :'Bearer '+cookie.get('access-token'),
                 Accept : 'application/json'
                    }
            }; 
        axios.get(`/foundations/${this.props.foundId}/ledgeraccounts/${this.state.account.id}/exporttrialbalance` , config).then((response)=>{
            
            this.setState({
                exporting:false
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            let currentYear = new Date().getFullYear();
            link.setAttribute('download', this.state.foundName+'_ميزان المراجعة_'+currentYear+'.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();

        });

    }




    render(){
        const hintText =  `صفحة ميزان المراجعة تعرض رصيد حساب و نوعه.`;
        const infos = [{label:'اسم الحساب' , text:this.state.account.index+'-'+this.state.account.name},
                        {label:'العملة' ,text:this.state.currency}];
        let modalContent = null;
        let show = false;
        let backdropHidden = null;
        if(this.state.searchingAccount){
            modalContent = <Spinner color = 'blue'/>;
            show = true

        }else if(this.state.choosingAccount){
            modalContent = (<AccountSelection usedFromAnother 
            chooseAccountFromResults = {this.chooseAccountFromResults} 
            searchAccountResults = {this.state.searchAccountResults}
            currency = {this.state.currency}
            chooseAccountCancelHandler = {this.chooseAccountCancelHandler}/>);
            show = true;
            backdropHidden = this.chooseAccountCancelHandler


        }

        return(
            <Aux>
                {this.state.loading?               
                    <div style = {{
                    margin: '0',
                    padding:'0',
                    backgroundColor:' #fff',
                    height: '100vh',
                    width:'100%',
                    zIndex:'20'
                    
                }} >
                    <Spinner color ='blue'/>
                </div>:null}
                <Modal show = {show} backdropHidden = {backdropHidden}>{modalContent}</Modal>
                <div style ={{
                margin:'0px',
                padding:'0px'
                }} onKeyPress = {this.keyPressHandler}>
                
                    <PageTitle title = 'ميزان المراجعة' hintText = {hintText}/>
                    <SearchAndInfo infos = {infos} changed = {this.accountToSearchChangeHandler} 
                    search = {this.searchAccountHandler}   accountToSearch = {this.state.accountToSearch}
                    previewed = {this.getTrialBalance} previewDisabled = {this.state.account.id===0?true:false}
                    exportDisabled = {this.state.loaded?false:true}
                    exported = {this.exportTrialBalance}/>

                {this.state.loaded?
                  <div style = {{
                    margin:'0',
                    padding:'0' 
               }}>
                   <div style = {{
                       overflowX:'auto',
                       
                       margin:'0',
                       padding:'0',
                       height:'50vh'
                   }}>
                       <Table headers = {TABLE_FIELDS} data = {this.state.trialBalance} className = 'TrialBalanceTable'/>
                   </div>
                  

               </div>:null}
                </div>
            </Aux>

        );
    }




}

export default TrialBalance;