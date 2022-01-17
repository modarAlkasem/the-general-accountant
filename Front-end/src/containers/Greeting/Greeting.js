import React , {Component} from 'react';
import GreetingContent from './../../components/HomeLayout/Home/GreetingContent/GreetingContent';
import axios from './../../axios-general';
import {withRouter , Redirect} from 'react-router-dom';
import cookie from './../../services/cookieService';


class Greeting extends Component{

    state = {
        inputEmail:'',
        inputPassword:'',
        validationCode : 0,
        validationField :0,
        registering:false
    }

    changeInputFieldHandler = event=>{
        if(event.target.name==='email'){
            this.setState({inputEmail:event.target.value});

        }else if(event.target.name==='password'){
            this.setState({inputPassword:event.target.value});
        }
    }
    validate  =()=>{
        const whiteSpaceRegEx = /^\s*\S+.*/;
        const strongPassRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        const passEle = document.getElementById('passwordFieldId');
        const emailEle = document.getElementById('emailFieldId');
        if(emailEle.value.match(whiteSpaceRegEx)){
            if(passEle.value.match(whiteSpaceRegEx)){

                if(passEle.value.match(strongPassRegEx)){
                    return true;
                }else{
                    this.setState({
                        validationCode:2,
                        validationField:2
                    });
                    return false;
                }

            }else{
                this.setState({
                    validationCode:1,
                    validationField:2
                });
                return false;
            }
        }else{
            
            this.setState({
                validationCode:1,
                validationField:1
                
            });
            return false;

        }

    }
    signUp = ()=>{
        if(this.validate()){
            this.setState({registering:true});
            const data  = {
                email:this.state.inputEmail,
                password:this.state.inputPassword,
                clientId:1,
                clientSecret :cookie.get('client-secret')
            };
            axios.post('/register' , data).then(response=>{
                this.setState({registering:false,
                                inputEmail:'',
                                inputPassword:''});
                let currentDate = new Date();
                const followingDate  =new Date(currentDate.getTime()+86400000) ;
                
                cookie.set('access-token' , response.data.access_token ,{expires:followingDate} );
                this.props.history.replace({pathname:'/onboarding',
                                            userId :response.data.userId,
                                        from:'register'});
                

            }).catch(error=>{
                
                this.setState({
                    validationCode :3,
                    validationField :1,
                    registering:false,
                    inputEmail:'',
                    inputPassword:''
                });
            });
        }
    }
    render(){
        let redirect = null;
        if(this.state.validationCode!==0){
            redirect = <Redirect to={{
                pathname:'/register',
                validationData :{
                    validationCode:this.state.validationCode,
                    validationField:this.state.validationField 
                }
            }}/>

        }
        return(
            <React.Fragment>
            {redirect}
                <GreetingContent inputEmail = {this.state.inputEmail} inputPassword = {this.state.inputPassword}
                             emailChanged = {this.changeInputFieldHandler} passwordChanged = {this.changeInputFieldHandler}
                             signedUp = {this.signUp}
                             registering = {this.state.registering}/>
            </React.Fragment>
        );
    }
}

export default withRouter(Greeting);