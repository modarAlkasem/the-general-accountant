import React , {useEffect} from 'react';
import classes from './SignUp.module.css';
import TextField from './../../UI/TextField/TextField';
import Button from './../../UI/Button/Button';
import Logo from './../../../assets/images/Logo/withText&Enh.png';
import {Link} from 'react-router-dom';
import Validation from '../../Validation/ValidationText/ValidationText';
import ValidationWarning from '../../Validation/ValidationWarning/ValidationWarning';
import cookie from './../../../services/cookieService';
import Spinner from './../../UI/Spinner/Spinner';
const SignUp = props=>{
    useEffect(()=>{
        if(cookie.get('access-token')){
            cookie.remove('access-token'); 
        }
    },[]);
    
    const textFieldStyle = {
        'height':'40px',
        'padding':'8px 10px 6px',
        'border':'1px solid #b2c2cd',
        borderRadius:' 4px',
        marginBottom:'14px',
        'transition': 'border .15s ease-in-out,box-shadow .15s ease-in-out',
        'color': '#b2c2cd',
        fontWeight: 'normal',
        backgroundColor:'white',
        ':focus':{
            'border':'1px solid #136acd',
            boxShadow:'0px 0px 5px 1px #136acd ',
            'color': '#1c252c',
        }
        


    };
    const textFieldErrorStyle={
        'height':'40px',
        'padding':'8px 10px 6px',
        'border':'1px solid #d74242',
        borderRadius:' 4px',
        marginBottom:'14px',
        'transition': 'border .15s ease-in-out,box-shadow .15s ease-in-out',
        'color': '#b2c2cd',
        fontWeight: 'normal',
        backgroundColor:'white',
        ':focus':{
            border: '1.5px solid #d74242',
            boxShadow:'0px 0px 5px 1px #d74242',
            'color': '#1c252c',
        }
    }
    const ButtonStyle = {
        backgroundColor:'#30dfe8',
        marginTop:'14px',
        'color': '#1c252c',
        'border':'1px solid transparent',
        'transition': 'border .15s ease-in-out , background-color .15s ease-in-out   ',
        ':hover':{
            'border':'1px solid #07b0b9',
            backgroundColor:'#07b0b9'
        }
        
        
    };
    let validationWarning = null;
    if(!props.passwordValidate || !props.emailValidate ){
        validationWarning = <ValidationWarning/>

    }
    return(

            <div className = {classes.SignUp}>
                <Link to='/' className = {classes.imgWrap}><img src={Logo} alt='Logo'/></Link>
                <h1>نظام محاسبي شامل و مجاني! — جربه الأن</h1>
                <p>برنامج المحاسب العام يساعد الأستشاريين و اصحاب الأعمال الصغيرة لإدارة نشاطاتهم المالية</p>
                {validationWarning}
                <div className = {classes.Form} >
                    <TextField type='email' name='email' value={props.email} changed={props.changed}
                    placeHolder='البريد الإلكتروني' customStyle = {props.emailValidate?textFieldStyle:textFieldErrorStyle} idNum ='emailsignUp'/>
                    <Validation show = {!props.emailValidate} className ={props.usedEmailValidate?classes.UsedEmailValidate:null}>{props.emailValidateText}</Validation>
                    <TextField type='password' name='password' value={props.password} changed={props.changed}
                    placeHolder='كلمة المرور' customStyle = {props.passwordValidate?textFieldStyle:textFieldErrorStyle} idNum ='passsignUp'/>
                    <span id='signUpPassValidate' style= {{position:'relative', right:'3%'}}>على الأقل عشر محارف من حروف صغيرة و كبيرة, إضافة الى ارقام و رموز</span>
                    <Button clicked = {props.signedUp} customStyle={ButtonStyle} >{props.registering?<Spinner backColor = 'light blue' color='black'/>:'ابدأ'}</Button>
                </div>
            </div>
        
    );
}

export default SignUp;