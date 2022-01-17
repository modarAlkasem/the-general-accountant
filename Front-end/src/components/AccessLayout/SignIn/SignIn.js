import React ,{useEffect} from 'react';
import TextField from './../../UI/TextField/TextField';
import Button from './../../UI/Button/Button';
import Logo from './../../../assets/images/Logo/withText&Enh.png';
import classes from './SignIn.module.css';
import {Link} from 'react-router-dom';
import Validation from '../../Validation/ValidationText/ValidationText';
import ValidationWarning from '../../Validation/ValidationWarning/ValidationWarning';
import cookie from './../../../services/cookieService';
import Spinner from './../../UI/Spinner/Spinner';

const SignIn = props=>{
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
        backgroundColor:'#136acd',
        'color': '#fff',
        'border':'1px solid transparent',
        'transition': 'border .15s ease-in-out , background-color .15s ease-in-out   ',
        ':hover':{
            'border':'1px solid #0052af',
            backgroundColor:'#0052af'
        }
        
        
    };
    let validationWarning = null;
    if(!props.passwordValidate || !props.emailValidate ){
        validationWarning = <ValidationWarning/>

    }
    return (
        <div className = {classes.SignIn}>
            <Link to='/' className = {classes.imgWrap}><img src={Logo} alt='Logo'/></Link>
            <h1>تسجيل الدخول</h1>
            {validationWarning}
            <div className = {classes.Form} >
                <TextField type='email' name='email' value={props.email} changed={props.changed}
                placeHolder='البريد الإلكتروني' customStyle =  {props.emailValidate?textFieldStyle:textFieldErrorStyle} idNum ='emailsignIn'/>
                <Validation show = {!props.emailValidate} className ={props.usedEmailValidate?classes.UsedEmailValidate:null}>{props.emailValidateText}</Validation>
                 <TextField type='password' name='password' value={props.password} changed={props.changed}
                placeHolder='كلمة المرور' customStyle = {props.passwordValidate?textFieldStyle:textFieldErrorStyle} idNum ='passsignIn'/>
                <Validation show = {!props.passwordValidate} weakPassword = {props.weakPassword}>{props.passwordValidateText}</Validation>
                <Button clicked = {props.signedIn} customStyle={ButtonStyle} >{props.loggingIn?<Spinner color='white'/>:'تسجيل الدخول'}</Button>
            </div>
        </div>
    );
}

export default SignIn ;