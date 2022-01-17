import React , {Component} from 'react';
import SignIn from './../../components/AccessLayout/SignIn/SignIn';
import SignUp from './../../components/AccessLayout/SignUp/SignUp';
import Onboarding from './../../components/AccessLayout/Onboarding/Onboarding';
import {withRouter} from 'react-router-dom';
import cookie from './../../services/cookieService';
import axios from './../../axios-general';

const CURRENCIES = [

    {text:'الأمارات العربية المتحدة ' ,currency:'AED' , currencyText:'الدرهم الإماراتي'},
    {text:'السعودية' , currency:'SAR' , currencyText:'الريال السعودي'},
    {text:'البحرين' , currency:'BHD' , currencyText:'الدينار البحريني'},
    {text:'الكويت' , currency:'KWD' , currencyText:'الدينار الكويتي'},
    {text:'المملكة الأردنية الهاشمية' ,currency:'JOD' , currencyText:'الدينار الأردني'},
    {text:'سلطنة عمان' , currency:'OMR' , currencyText:'الريال العماني'},
    {text:'سوريا' ,currency:'SYP' , currencyText:'الليرة السورية'},
    {text:'مصر ' , currency:'EGP' , currencyText:'الجنيه المصري'},
    {text:'قطر ' , currency:'QAR' , currencyText:'الريال القطري'},
];

class AccessLayout extends Component{

    state={
        signInEmail:'',
        signInPass:'',
        signUpEmail:'',
        signUpPass:'',
        firstName:'',
        lastName:'',
        businessName:'',
        country:'',
        currency:'',
        typeOfBusiness:0,
        render:0,
        hidden:true,
        currencyOption:{
            currency:'',
            currencyText:''
        },
        emailValidate:true,
        passwordValidate:true,
        emailValidateText:'',
        passwordValidateText:'',
        weakPassword:false,
        userInfoSubmitting:false,
        registering:false,
        loggingIn:false,
        usedEmailValidate:false


    }
    static getDerivedStateFromProps(props , state){
        let newState = {...state};
        newState.render = props.render;
        return newState;

    }

    signInInfoChangeHandler = event=>{
        if(event.target.name==='email'){
            this.setState({signInEmail:event.target.value});

        }else if(event.target.name==='password'){
            this.setState({signInPass:event.target.value});
        }

    }

    signInHandler = ()=>{
       
       if(this.validateInput('signIn')){
        this.setState({loggingIn:true});
        const data  = {
            email:this.state.signInEmail,
            password:this.state.signInPass,
            clientId:1,
            clientSecret :cookie.get('client-secret')
        };
        axios.post('/signin' , data).then(response=>{
            this.setState({loggingIn:false,
                            signInEmail:'',
                            signInPass:''});
            let currentDate = new Date();
            const followingDate  =new Date(currentDate.getTime()+86400000) ;

            cookie.set('access-token' , response.data.access_token ,{expires:followingDate} );
            this.props.history.replace({pathname:`/${response.data.data.foundData.name}/chartOfAccounts`,
                                        foundData:response.data.data.foundData,
                                        userId :response.data.data.userId
                                    });
            

        }).catch(error=>{
            if(error.response.status===401){
                this.setState({
                    signInEmail:'',
                    signInPass:'',
                    loggingIn:false,
                    usedEmailValidate:true,
                    emailValidate:false,
                    emailValidateText:'الرجاء إدخال البريد الإلكتروني الصحيح وكلمة المرور الصحيحة. لاحظ أن حقل كلمة المرور حساس لحالة الأحرف'
                })

            }
        });
    }

    }


    signUpInfoChangeHandler = event=>{
        if(event.target.name==='email'){
            this.setState({signUpEmail:event.target.value});

        }else if(event.target.name==='password'){
            this.setState({signUpPass:event.target.value});
        }

    }
    validateInput = (type)=>{
        const whiteSpaceRegEx = /^\s*\S+.*/;
        const strongPassRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        // const passValEle = document.getElementById(`${type}PassValidate`);
        // const emailValEle = document.getElementById(`${type}EmailValidate`);
        const passEle = document.getElementById(`pass${type}`);
        const emailEle = document.getElementById(`email${type}`);
        // const whiteSpaceText='لا يجب ان يكون الحقل فارغ';
        // const strongPassText='على الأقل عشر محارف من حروف صغيرة و كبيرة, إضافة الى ارقام و رموز';
        // const visibleStyleStrongPass = 'display:inline ; font-size: 0.9rem;font-weight: normal; white-space: nowrap; position: relative; bottom: 14px; color:#c22929;left:0% ' ;
        // const visibleStyleWhiteSpace = 'display:inline ; font-size: 0.9rem;font-weight: normal; white-space: nowrap; position: relative; bottom: 14px; color:#c22929;left:29% ' ;
        if(emailEle.value.match(whiteSpaceRegEx)){
            // emailValEle.style.cssText = 'display:none';
            if(passEle.value.match(whiteSpaceRegEx)){
                // passValEle.style.cssText = 'display:none';
                if(passEle.value.match(strongPassRegEx)){
                    return true;
                }else{
                    this.setState({
                        passwordValidate:false,
                        passwordValidateText:'على الأقل عشر محارف من حروف صغيرة و كبيرة, إضافة الى ارقام و رموز',
                        weakPassword:true
                    });
                    return false;
                }

            }else{
                this.setState({
                    passwordValidate:false,
                    passwordValidateText:'لا يجب ان يكون الحقل فارغ'
                });
                return false;
            }
        }else{
            
            // emailValEle.style.cssText = visibleStyleWhiteSpace;
            // emailValEle.innerText = whiteSpaceText;
            this.setState({
                emailValidate:false,
                emailValidateText:'لا يجب ان يكون الحقل فارغ'
            });
            return false;

        }



    }
    signUpHandler = ()=>{

        
        if(this.validateInput('signUp')){
            this.setState({registering:true});
            const data  = {
                email:this.state.signUpEmail,
                password:this.state.signUpPass,
                clientId:1,
                clientSecret :cookie.get('client-secret')
            };
            axios.post('/register' , data).then(response=>{
                this.setState({registering:false,
                                signUpEmail:'',
                                signUpPass:''});
                let currentDate = new Date();
                const followingDate  =new Date(currentDate.getTime()+86400000) ;

                cookie.set('access-token' , response.data.access_token ,{expires:followingDate} );
                this.props.history.replace({pathname:'/onboarding',
                                            userId :response.data.userId,
                                        from:'register'});
                

            }).catch(error=>{
                this.setState({
                    emailValidate :true,
                    emailValidateText:'تم تسجيل هذا البريد الإلكتروني بالفعل. الرجاء اختيار بريد إلكتروني مختلف ، أو تسجيل الدخول إذا كنت مستخدمًا بالفعل',
                    registering:false,
                    signUpPass:'',
                    usedEmailValidate:true
                });
            });
        }


    }
    onBoardingHandler = event=>{
        if(event.target.name==='firstName'){
            this.setState({firstName:event.target.value});
        }else if(event.target.name==='lastName'){
            this.setState({lastName:event.target.value});
        }else if(event.target.name==='businessName'){
            this.setState({businessName:event.target.value});
        }else if(event.target.name==='businessDescription'){
            this.setState({typeOfBusiness:parseInt(event.target.value)});
        }else if(event.target.name==='country'){
            let currencyObj = null;
            
            for(let i=0; i< CURRENCIES.length;i++ ){
                if(CURRENCIES[i].text===event.target.value){
                    currencyObj=  {
                        currencyText:CURRENCIES[i].currencyText,
                        currency:CURRENCIES[i].currency
                    }
                }
            }
            this.setState({country:event.target.value,
                            hidden:false,
                            currencyOption:currencyObj 
            
            });
        }else if(event.target.name==='currency'){
            this.setState({currency:event.target.value});
        }
         
    }



    componentDidMount(){
        
        const validationData = this.props.location['validationData'];
        let validationCode = null;
        let validationField = null;
        if(this.state.render===1){
            if(validationData){
                validationCode = parseInt(validationData.validationCode);
                validationField = parseInt(validationData.validationField);
                if(validationCode===1){
                    if(validationField===1){
                        this.setState({
                            emailValidate:false,
                            emailValidateText:'لا يجب ان يكون الحقل فارغ'
                        });

                    }else if(validationField===2){
                        this.setState({
                            passwordValidate:false,
                            passwordValidateText:'لا يجب ان يكون الحقل فارغ'
                        });
                    }
                }else if(validationCode===2){
                    this.setState({
                        passwordValidate:false,
                        passwordValidateText:'على الأقل عشر محارف من حروف صغيرة و كبيرة, إضافة الى ارقام و رموز',
                        weakPassword:true
                    });
                }else if(validationCode===3){
                    this.setState({
                        emailValidate:false,
                        emailValidateText:'تم تسجيل هذا البريد الإلكتروني بالفعل. الرجاء اختيار بريد إلكتروني مختلف ، أو تسجيل الدخول إذا كنت مستخدمًا بالفعل.',
                        usedEmailValidate:true
                    }); 

                }

            }

        }
    }
    businessInfoSubmitHandler = ()=>{
        this.setState({
            userInfoSubmitting:true
        });
        const data = {
            name :this.state.businessName,
            foundation_type_id : this.state.typeOfBusiness,
            country:this.state.country,
            currency  :this.state.currency,
            first_name : this.state.firstName,
            last_name : this.state.lastName
        };
        const config = {
            headers:{
                Authorization :'Bearer '+cookie.get('access-token'),
                Accept : 'application/json'
            }
        };
        axios.post(`/onboarding/${this.props.location.userId}` , data , config).then(response=>{
            this.setState({userInfoSubmitting:false});
            this.props.history.replace({pathname:`/${response.data.data.name}/chartOfAccounts`,
                                        foundData:response.data.data ,
                                    userId : response.data.userId});
        });


    }
    render(){
        let renderedComponent = null;
        if(this.state.render===3){
            renderedComponent = <SignIn email = {this.state.signInEmail} password = {this.state.signInPass}
                                        changed = {this.signInInfoChangeHandler}
                                        signedIn = {this.signInHandler}
                                        passwordValidate={this.state.passwordValidate}
                                        passwordValidateText = {this.state.passwordValidateText}
                                        emailValidate = {this.state.emailValidate}
                                        emailValidateText = {this.state.emailValidateText}
                                        weakPassword = {this.state.weakPassword}
                                        loggingIn = {this.state.loggingIn}
                                        usedEmailValidate ={this.state.usedEmailValidate}/>

        }else if(this.state.render===1){
            renderedComponent = <SignUp  email = {this.state.signUpEmail} password = {this.state.signUpPass}
            changed = {this.signUpInfoChangeHandler}
            signedUp = {this.signUpHandler}
            passwordValidate={this.state.passwordValidate}
            passwordValidateText = {this.state.passwordValidateText}
            emailValidate = {this.state.emailValidate}
            emailValidateText = {this.state.emailValidateText}
            registering = {this.state.registering}
            usedEmailValidate = {this.state.usedEmailValidate}/>

        }else if (this.state.render===2){
                if(cookie.get('access-token')){
                    renderedComponent = <Onboarding changed = {this.onBoardingHandler} firstName= {this.state.firstName}
                    lastName = {this.state.lastName} businessName ={this.state.businessName}
                    businessDescription = {this.state.typeOfBusiness}
                    country = {this.state.country}
                    currency = {this.state.currency}
                    currencyText = {this.state.currencyOption.currencyText}
                    hidden = {this.state.hidden}
                    currencySymb = {this.state.currencyOption.currency}
                    submitting = {this.state.userInfoSubmitting}
                    submitted = {this.businessInfoSubmitHandler}
                    {...this.props}/>
                }else{
                    this.props.history.push('/');
                }

        }
        return (

            renderedComponent
        );
    }
}

export default withRouter(AccessLayout);