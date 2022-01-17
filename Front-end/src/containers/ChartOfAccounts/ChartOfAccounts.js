import React ,{Component} from 'react';
import PageTitle from './../../components/MainLayout/PageTitle/PageTitle';
import ChartToolbar from './../../components/Navigation/ChartToolbar/ChartToolbar';
import Aux from './../../hoc/Auxiliary/Auxiliary';
import ChartContent from './../../components/MainLayout/ChartOfAccounts/ChartContent/ChartContent';
import Modal from './../../components/UI/Modal/Modal';
import AddAccount from '../../components/MainLayout/ChartOfAccounts/AddAccount/AddAccount';
import EditAccount from '../../components/MainLayout/ChartOfAccounts/EditAccount/EditAccount';
import Spinner from './../../components/UI/Spinner/Spinner';
import axios from './../../axios-general';
import cookie from './../../services/cookieService';


class ChartOfAccounts extends  Component{

    state = {
        rootAccounts:[],
        rootRelatedAccounts:[],
        activeRootAccount:1,
        addingAccount: false,
        editAccount:false,
        currency:'',
        accountToEdit:null,
        parentAccountToEdit:null,
        loading:true,
        refreshAccounts:false
        
    };

//     testData =  [
//         {name:'الأصول' ,
//         amount:5,
//          index:1,
//          relatedAccountsFirstLevel :[{
//             name:'الأصول الثابتة' ,
//             index:11,
//             relatedAccountsSecondLevel :[{
//                 name:'المباني و العقارات',
//                 index:111,
//                 description:'test'
//             }]

//         } , {
//             name:'الأصول المتداولة' ,
//             index:12,
//             relatedAccountsSecondLevel :[{
//                 name:'البضاعة',
//                 index:121,
//                 description:'test'
//             }]}
//          ]    
//     },
//     {name:'المطاليب' ,
//     amount:10,
//     index:2,
//     relatedAccountsFirstLevel :[{
//        name:'المطاليب الثابتة' ,
//        index:21,
//        relatedAccountsSecondLevel :[{
//            name:'رأس المال',
//            index:211,
//            description:'test'
//        },{
//         name:' القروض',
//         index:212,
//         description:'test'
//        }]

//    } ] }]

   showAddAccountModal=()=>{
        this.setState({
            addingAccount:true
        });
   }
   showEditAccountModal=value=>{
       
       const  accountToEditIndex = parseInt(value);
       const accountToEditIndexAsArray = Array.from(String(accountToEditIndex) , num=>Number(num));
       const parentAccountToEditIndex = parseInt([accountToEditIndexAsArray[0] ,accountToEditIndexAsArray[1]].join('')); 
       let rootRelatedAccounts = [];
       let relatedAccountsFirstLevel=[];
       let relatedAccountsSecondLevel = [];
       let AccountToEdit = null;
       let parentAccount = null;
       rootRelatedAccounts = this.state.rootRelatedAccounts;
       rootRelatedAccounts.forEach(current=>{
        if(current.rootAccountIndex=== this.state.activeRootAccount){
            
            relatedAccountsFirstLevel= current.relatedAccountsFirstLevel;

        }else{
            return null;
        }
    });
    relatedAccountsFirstLevel.forEach(current=>{
        if(current.index===parentAccountToEditIndex){
            parentAccount = {
                text:current.name,
                index:current.index
            };
            relatedAccountsSecondLevel = current.relatedAccountsSecondLevel;
        }
    });

    relatedAccountsSecondLevel.forEach(current=>{
        if(current.index===accountToEditIndex){
            AccountToEdit = {index:current.index,
                             name:current.name,
                             description:current.description,
                            id:current.id }
        }
        
    });
    this.setState({
        editAccount:true,
        parentAccountToEdit:parentAccount,
        accountToEdit:AccountToEdit
    });
   }

   cancelEditAccountHandler=()=>{
        this.setState({
            editAccount:false,
            accountToEdit:null,
            parentAccountToEdit:null
        });
   }

   cancelAddingAccountHandler=()=>{
        this.setState({
            addingAccount:false
        });
    }
    backdropClickedHandler = ()=>{
        if(this.state.addingAccount){
            this.setState({
                addingAccount:false,
                editAccount:false
            });

        }else if(this.state.editAccount){
            this.setState({
                editAccount:false,
                accountToEdit:null,
                parentAccountToEdit:null
            });
        }
    }

    extractRootAccounts=accounts=>{
        let rootAccounts = [];
        accounts.forEach(rootAccount=>{
            rootAccounts.push({
                name:rootAccount.name,
                index:rootAccount.index,
                relatedAccountsSecondlevelAmount:rootAccount.relatedAccountsSecondlevelAmount,
                id:rootAccount.id
            });
        });
        return rootAccounts;


    }

    extractRootRelatedAccounts=accounts=>{
        let rootRelatedAccounts = [];
       
        accounts.forEach(rootAccount=>{
            
            rootRelatedAccounts.push({
                rootAccountIndex : rootAccount.index,
                relatedAccountsFirstLevel : rootAccount.relatedAccountsFirstLevel
            });

        });
        return rootRelatedAccounts;

    }

    switchRootAccountHandler = event=>{
        
        if(parseInt(event.target.value)===this.state.activeRootAccount){
            return ;
        }else{
            
            this.setState({
                activeRootAccount: parseInt(event.target.value)
            });
        }

    }

    refreshAccounts=(specifier)=>{
        if(specifier===1){
            this.setState({
                refreshAccounts:true,
                addingAccount:false
            });
        }else if(specifier===2){
            this.setState({
                refreshAccounts:true,
                editAccount:false
            });
        }

    }
    componentDidMount(){
       
        const config = {
            headers:{
                Authorization :'Bearer '+cookie.get('access-token'),
                Accept : 'application/json'
            }
        };
        axios.get(`/foundations/${this.props.foundId}/accounts` , config).then(response=>{
            this.setState({
                loading:false,
                rootAccounts:this.extractRootAccounts(response.data.data),
                rootRelatedAccounts:this.extractRootRelatedAccounts(response.data.data),
                currency:this.props.foundCurrency
            });
        });
    }
    componentDidUpdate(){
        if(this.state.refreshAccounts){
            const config = {
                headers:{
                    Authorization :'Bearer '+cookie.get('access-token'),
                    Accept : 'application/json'
                }
            };
            axios.get(`/foundations/${this.props.foundId}/accounts` , config).then(response=>{
                this.setState({
                    loading:false,
                    rootAccounts:this.extractRootAccounts(response.data.data),
                    rootRelatedAccounts:this.extractRootRelatedAccounts(response.data.data),
                    currency:this.props.foundCurrency,
                    refreshAccounts:false
                });
            });
        }

    }

    render(){
       
        const hintText = `صفحة دليل الحسابات تعرض قائمة بالحسابات المالية الخاصة بعملك.`;
        let ModalContent=null;
        if(this.state.addingAccount){
           
            ModalContent =<AddAccount  rootRelatedAccounts = {this.state.rootRelatedAccounts} 
            activeRootAccount = {this.state.activeRootAccount} currency = {this.state.currency}
            canceled = {this.cancelAddingAccountHandler} foundId={this.props.foundId}
            refreshedAccounts ={this.refreshAccounts.bind(this,1)}/>

        }else if(this.state.editAccount){
            ModalContent = <EditAccount accountToEdit = {this.state.accountToEdit}  
            relatedAccountFirstLevel = {this.state.parentAccountToEdit}
            currency = {this.state.currency} canceled = {this.cancelEditAccountHandler}
            refreshedAccounts ={this.refreshAccounts.bind(this,2)}
            foundId={this.props.foundId}/>

        }
        let content = (<div style = {{
            margin: '0',
            padding:'0',
            backgroundColor:' #fff',
            height: '100vh',
            width:'100%',
            
        }} >
            <Spinner color ='blue'/>
        </div>);
        if(!this.state.loading){
            content=(
                <Aux> 
                    <Modal show={this.state.addingAccount||this.state.editAccount?true:false}
                    backdropHidden = {this.backdropClickedHandler}>
                        {ModalContent}
                    </Modal>      
                    <PageTitle title ='دليل الحسابات' hintText = {hintText}/>  
                    <ChartToolbar rootAccounts= {this.state.rootAccounts} 
                    active = {this.state.activeRootAccount} clicked = {this.switchRootAccountHandler} />
                    <ChartContent rootRelatedAccounts = {this.state.rootRelatedAccounts} 
                    activeRootAccount = {this.state.activeRootAccount}
                    addAccount = {this.showAddAccountModal}
                    editAccount = {this.showEditAccountModal}/>
                </Aux>   
            );

        }
        return content;
    }

}

export default ChartOfAccounts;