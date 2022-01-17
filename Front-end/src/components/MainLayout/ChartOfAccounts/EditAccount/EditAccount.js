import React , {Component} from 'react';
import classes from './EditAccount.module.css';
import Label from './../../../UI/Label/Label';
import Dropdown from './../../../UI/Dropdown/Dropdown';
import TextField from  './../../../UI/TextField/TextField';
import TextArea from  './../../../UI/TextArea/TextArea';
import Button from './../../../UI/Button/Button';
import ModalHeader from './../ModalHeader/ModalHeader';
import Aux from './../../../../hoc/Auxiliary/Auxiliary';
import Radium from 'radium';
import axios from './../../../../axios-general';
import Spinner from '../../../UI/Spinner/Spinner';
import cookie from '../../../../services/cookieService';


class EditAccount extends Component {

    state = {
        relatedAccountFirstLevel:this.props.relatedAccountFirstLevel,
        accountName : this.props.accountToEdit.name,
        accountCurrency:this.props.currency,
        accountIndex:this.props.accountToEdit.index,
        accountDescription:this.props.accountToEdit.description,
        editing:false,
        accountId: this.props.accountToEdit.id

    }

    inputFieldChangeHandler=event=>{
         if(event.target.name==='editAccountNameField'){
            this.setState({
                accountName: event.target.value
            });

        }else if(event.target.name==='editAccountDescriptionField'){
            this.setState({
                accountDescription: event.target.value
            });

        }
    }
    editAccountHandler=()=>{
        this.setState({
            editing:true
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
            

        };
        axios.put(`/foundations/${this.props.foundId}/accounts/${this.state.accountId}`,data , config).then(()=>{
            this.setState({
                editing:false,

                

            });
            this.props.refreshedAccounts();
        })
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

        let content = (
            <Aux>
                <ModalHeader text={this.state.relatedAccountFirstLevel.text}/>
                <div className = {classes.MainContent}>
                    <div className = {classes.group}>
                            <div className = {classes.LabelWrapper}>
                                <Label text="نوع الحساب" id ="editAccountTypeFieldId"/>
                            </div>
                            <div className = {classes.InputWrapper}>
                                <Dropdown name="editAccountTypeField" options = {[this.state.relatedAccountFirstLevel]} id="editAccountTypeFieldId"
                                value = {this.state.relatedAccountFirstLevel.index}  disabled/>
                            </div>

                        </div>
                        <div className = {classes.group}>
                            <div className = {classes.LabelWrapper}>
                                <Label text="اسم الحساب" id ="editAccountNameFieldId" />
                            </div>
                            <div className = {classes.InputWrapper}>
                                <TextField type ="text" name = "editAccountNameField"
                                idNum ="editAccountNameFieldId" value={this.state.accountName} changed={this.inputFieldChangeHandler} customStyle={textFieldStyle} />
                            </div>

                        </div>
                        <div className = {classes.group}>
                            <div className = {classes.LabelWrapper}>
                                <Label text="عملة الحساب" id ="editAccountCurrencyFieldId" />
                            </div>
                            <div className = {classes.InputWrapper}>
                                
                                <TextField type ="text" name = "editAccountCurrencyField"
                                idNum ="editAccountCurrencyFieldId" value={this.state.accountCurrency}  customStyle={textFieldStyle}
                                disabled  />
                            </div>

                        </div>
                        <div className = {classes.group}>
                            <div className = {classes.LabelWrapper}>
                                <Label text="محدد الحساب" id ="editAccountIdFieldId" />
                            </div>
                            <div className = {classes.InputWrapper}>
                            
                                <TextField type ="text" name = "editAccountIdField"
                                idNum ="editAccountIdFieldId" value={this.state.accountIndex}  customStyle={textFieldStyle}
                                disabled  />
                            </div>

                        </div>
                        <div className = {classes.group}>
                            <div className = {classes.LabelWrapper+' '+classes.Special} >
                                <Label text="الوصف" id ="editAccountDescriptionFieldId" />
                            </div>
                            <div className = {classes.InputWrapper}>
                            
                                <TextArea  name ="editAccountDescriptionField"  changed={this.inputFieldChangeHandler}
                                id ="editAccountDescriptionFieldId" value={this.state.accountDescription}  customStyle={textFieldStyle}
                                    />
                            </div>

                        </div>  
                </div>
                <div className = {classes.Footer} dir="ltr">
                    <div className ={classes.BtnWrapper}>
                        <Button  customStyle = {SaveBtnStyle} clicked = {this.editAccountHandler}>حفظ</Button>

                    </div>
                    <div className ={classes.BtnWrapper}>
                        <Button clicked ={this.props.canceled}  customStyle = {CancelBtnStyle}>إلغاء</Button>

                    </div>

                </div>
            </Aux>
        );
        if(this.state.editing){
            content = ( <div style = {{
                margin: '0',
                padding:'0',
                backgroundColor:' #fff',
                height: '289px',
                width:'100%',
                
            }} >
                <Spinner color ='blue' style= {{height:'6em',
            width:'6em'}}/>
            </div>);

        }
        return content;


        
    }
}

export default Radium(EditAccount);