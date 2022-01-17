import React from 'react';
import classes from './GreetingContent.module.css';
import TextField from './../../../UI/TextField/TextField';
import Button from './../../../UI/Button/Button';
import Spinner from './../../../UI/Spinner/Spinner';

const GreetingContent = props=>(
    <div dir='rtl' className = {classes.GreetingContent}>
        <h1>برنامج محاسبي مصمم لرواد الأعمال</h1>
        <div className={classes.inputForm}>
            <TextField type ='email' name='email' value={props.inputEmail} changed={props.emailChanged} placeHolder = 'البريد الإلكتروني' idNum="emailFieldId" />
            <TextField  type ='password' name='password' value={props.inputPassword} changed={props.passwordChanged} placeHolder = 'كلمة المرور' idNum="passwordFieldId"/>
            <Button clicked = {props.signedUp}>{props.registering?<Spinner color='black' backColor = 'yellow'/>:'تسجيل حساب مجانا'}</Button>
        </div>
    </div>
);

export default GreetingContent;