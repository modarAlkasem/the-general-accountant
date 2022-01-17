import React , {Component } from 'react';
import ModalHeader from './../ModalHeader/ModalHeader';
import Aux from './../../../../hoc/Auxiliary/Auxiliary';
import classes from './AddAccount.module.css';
import Label from './../../../UI/Label/Label';
import Dropdown from './../../../UI/Dropdown/Dropdown';
import TextField from  './../../../UI/TextField/TextField';
import TextArea from  './../../../UI/TextArea/TextArea';
import Button from './../../../UI/Button/Button';
import Radium from 'radium';
import axios from './../../../../axios-general';
import Spinner from './../../../UI/Spinner/Spinner';
import cookie from './../../../../services/cookieService';

class AddAccount extends Component{


    constructor(props){
        super(props);
        let AccountFirstLevelIndex=null;
        let accounts = [];
        let AccountIndex=null;
        let accountsSecondLevel =[];
        this.props.rootRelatedAccounts.forEach(current=>{
            if(current.rootAccountIndex===this.props.activeRootAccount){
                accounts=current.relatedAccountsFirstLevel;

            }else{
                return null;
            }
        });
         AccountFirstLevelIndex=accounts[0].index;
         let parentAccountId =  accounts[0].id;
         let accountsSecondLevelIndexes=[];
         for(let i=0;i<accounts.length;i++){
             if(accounts[i].index===AccountFirstLevelIndex){

                accountsSecondLevel= accounts[i].relatedAccountsSecondLevel
                break;
             }

         }
         if(accountsSecondLevel.length===0){
           
                AccountIndex=(AccountFirstLevelIndex*10)+1
            

        }else{
            accountsSecondLevel.forEach(current=>{
                accountsSecondLevelIndexes.push(current.index)
            });
           
                AccountIndex=Math.max(...accountsSecondLevelIndexes)+1
           
        }


        this.state={
            accountFirstLevelIndex:AccountFirstLevelIndex,
            accountName : '',
            accountCurrency:this.props.currency,
            accountIndex:AccountIndex,
            accountDescription:'',
            saving:false,
            parentAccountId:parentAccountId

        }
        this.flag = false;

    }
    
    shouldComponentUpdate(nextProps , nextState){
        if(nextState.accountFirstLevelIndex!== this.state.accountFirstLevelIndex){
           this.flag =true
        }
        return true;
    }
    
    specifyAccountIndex = ()=>{

        let accounts = [];
        let accountsSecondLevel = [];
        let accountsSecondLevelIndexes=[];
        this.props.rootRelatedAccounts.forEach(current=>{
            if(current.rootAccountIndex===this.props.activeRootAccount){
                accounts=current.relatedAccountsFirstLevel;

            }else{
                return null;
            }
        });
       
        accounts.forEach(current=>{
            if(current.index===this.state.accountFirstLevelIndex){
                accountsSecondLevel= current.relatedAccountsSecondLevel;

            }else{
                return null;
            }
        });
        if(accountsSecondLevel.length===0){
            this.setState({
                accountIndex:(this.state.accountFirstLevelIndex *10)+1
            });

        }else{
            accountsSecondLevel.forEach(current=>{
                accountsSecondLevelIndexes.push(current.index)
            });
            this.setState({
                accountIndex:Math.max(...accountsSecondLevelIndexes)+1
            });
        }
        this.flag=false
    }
    specifyParentAccountId = (parentAccountIndex)=>{
        let accounts = [];
        let parentAccountId = null;
       
        this.props.rootRelatedAccounts.forEach(current=>{
             
            if(current.rootAccountIndex===this.props.activeRootAccount){
                
                accounts=current.relatedAccountsFirstLevel;

            }else{
                return null;
                
            }
        });
        accounts.forEach(current=>{
            if(current.index===parseInt(parentAccountIndex)){
                parentAccountId = current.id;
            }
        });

        return parentAccountId;
    }
    inputFieldChangeHandler=event=>{

        if(event.target.name==='newAccountTypeField'){
            this.setState({
                accountFirstLevelIndex:parseInt(event.target.value),
                parentAccountId:this.specifyParentAccountId(event.target.value)

            });
            

        }else if(event.target.name==='newAccountNameField'){
            this.setState({
                accountName: event.target.value
            });

        }else if(event.target.name==='newAccountDescriptionField'){
            this.setState({
                accountDescription: event.target.value
            });

        }
    }
    addAccountHandler=()=>{
        this.setState({
            saving:true
        });
        const config = {
            headers:{
                Authorization :'Bearer '+cookie.get('access-token'),
                Accept : 'application/json'
            }
        };
        const data = {
            name:this.state.accountName,
            description:this.state.accountDescription,
            index:this.state.accountIndex,
            parent_account_id:this.state.parentAccountId
        };
        axios.post(`/foundations/${this.props.foundId}/accounts`,data , config).then(()=>{
            this.setState({
                saving:false,
                accountName:'',
                accountDescription:'',
                accountIndex:this.specifyAccountIndex()

            });
            this.props.refreshedAccounts();
        })
    }
componentDidUpdate(){
    if(this.flag){
        this.specifyAccountIndex();

    }
}


    render(){

        const textFieldStyle={
            height:'40px',
            padding:'8px 10px 6px 10px',
            backgroundColor:"#fff",
            marginBottom:"0",
            border: '1px solid rgb(178, 194, 205)',
            fontWeight: 'normal',
            color: 'rgb(28, 37, 44)',
            fontSize:'16px',
            transition: 'border .15s ease-in-out,box-shadow .15s ease-in-out',
            borderRadius: '4px',

            ':focus':{
                border:'1px solid #136acd',
                boxShadow:'0px 0px 5px 1px #136acd ',
                color:' #1c252c',
                backgroundColor:"#fff"
            }


        };
        const SaveBtnStyle = {
            height:'40px',
            paddingTop:'6px',
            backgroundColor:'#136ACD',
            color:'#fff',
            borderColor:'#136ACD',
            ':hover':{
                backgroundColor:'#204a79',
                borderColor:'#204a79',
            },
            ':active':{
                backgroundColor:'#204a79',
                borderColor:'#204a79',
            }
        };
        const CancelBtnStyle ={
            height:'40px',
            backgroundColor:'#fff',
            paddingTop:'6px',
            color:'#136ACD',
            borderColor:'#136ACD',
            transition: 'color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out ',
            ':hover':{
                backgroundColor:'#97c3f5',
                borderColor:'#204a79',
                color:'#204a79'
            },
            ':active':{
                backgroundColor:'#97c3f5',
                borderColor:'#204a79',
                color:'#204a79'
            }
        };

        let accounts = [];
        this.props.rootRelatedAccounts.forEach(current=>{
            if(current.rootAccountIndex===this.props.activeRootAccount){
                accounts=current.relatedAccountsFirstLevel;

            }else{
                return null;
            }
        });
        const transformedAccounts = accounts.map(current=>{
            return {
                text:current.name,
                index:current.index
            }
        });
        let content = (  <Aux>
            <ModalHeader text="إضافة حساب جديد"/>
            <div className = {classes.MainContent}>
                <div className = {classes.group}>
                    <div className = {classes.LabelWrapper}>
                        <Label text="نوع الحساب" id ="newAccountTypeFieldId"/>
                    </div>
                    <div className = {classes.InputWrapper}>
                        <Dropdown name="newAccountTypeField" options = {transformedAccounts} id="newAccountTypeFieldId"
                        value = {this.state.accountFirstLevelIndex} changed={this.inputFieldChangeHandler}/>
                    </div>

                </div>
                <div className = {classes.group}>
                    <div className = {classes.LabelWrapper}>
                        <Label text="اسم الحساب" id ="newAccountNameFieldId" />
                    </div>
                    <div className = {classes.InputWrapper}>
                        <TextField type ="text" name = "newAccountNameField"
                         idNum ="newAccountNameFieldId" value={this.state.accountName} changed={this.inputFieldChangeHandler} customStyle={textFieldStyle} />
                    </div>

                </div>
                <div className = {classes.group}>
                    <div className = {classes.LabelWrapper}>
                        <Label text="عملة الحساب" id ="newAccountCurrencyFieldId" />
                    </div>
                    <div className = {classes.InputWrapper}>
                        
                        <TextField type ="text" name = "newAccountCurrencyField"
                         idNum ="newAccountCurrencyFieldId" value={this.state.accountCurrency}  customStyle={textFieldStyle}
                         disabled  />
                    </div>

                </div>
                <div className = {classes.group}>
                    <div className = {classes.LabelWrapper}>
                        <Label text="محدد الحساب" id ="newAccountIdFieldId" />
                    </div>
                    <div className = {classes.InputWrapper}>
                       
                        <TextField type ="text" name = "newAccountIdField"
                         idNum ="newAccountIdFieldId" value={this.state.accountIndex}  customStyle={textFieldStyle}
                          disabled  />
                    </div>

                </div>
                <div className = {classes.group}>
                    <div className = {classes.LabelWrapper+' '+classes.Special} >
                        <Label text="الوصف" id ="newAccountDescriptionFieldId" />
                    </div>
                    <div className = {classes.InputWrapper}>
                       
                        <TextArea  name ="newAccountDescriptionField"  changed={this.inputFieldChangeHandler}
                         id ="newAccountDescriptionFieldId" value={this.state.accountDescription}  customStyle={textFieldStyle}
                            />
                    </div>

                </div>


            </div>
            <div className = {classes.Footer} dir="ltr">
                <div className ={classes.BtnWrapper}>
                    <Button  customStyle = {SaveBtnStyle} clicked = {this.addAccountHandler}>حفظ</Button>

                </div>
                <div className ={classes.BtnWrapper}>
                    <Button clicked ={this.props.canceled}  customStyle = {CancelBtnStyle}>إلغاء</Button>

                </div>

            </div>

        </Aux>);
        if(this.state.saving){
            content = (
                <div style = {{
                    margin: '0',
                    padding:'0',
                    backgroundColor:' #fff',
                    height: '289px',
                    width:'100%',
                    
                }} >
                    <Spinner color ='blue' style= {{height:'6em',
                width:'6em'}}/>
                </div>
            )

        }

        return content;
    }
}

export default Radium(AddAccount);