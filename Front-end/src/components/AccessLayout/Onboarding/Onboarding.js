import React , {useEffect} from 'react';
import TextField from './../../UI/TextField/TextField';
import Button from './../../UI/Button/Button';
import classes from './Onboarding.module.css';
import Spinner from './../../UI/Spinner/Spinner';
import cookie from './../../../services/cookieService';
const businessDesc = [
    {text:'خدمات إبداعية  , فن و تصوير',id:1 , key:'descOption1'},
    {text:'خدمات مالية و تأمين' , id:2, key:'descOption2'},
    {text:'بناء و ديكور' , id:3,key:'descOption3'},
    {text:'خدمات استشارية و مهنية'   ,id:4, key:'descOption4'},
    {text:'طب, اسنان و صحة' , id:5,key:'descOption5'},
    {text:'عقارات' , id:6,key:'descOption6'},
    {text: 'ويب , تقنية و وسائط متعددة' , id:7, key:'descOption7'},
    {text:'بيع بالتجزئة و الجملة' , id:8, key:'descOption8'},
    {text:'منظمات غير ربحية  , جمعيات و مجموعات' , id:9,key:'descOption9'},
    {text:'غير ذلك : انا اقدم خدمة' , id:10, key:'descOption10'},
    {text:'غير ذلك : انا اصنع او ابيع منتج', id:11,key:'descOption11'},
];
const countries = [

    {text:'الأمارات العربية المتحدة ' ,key:'countOption1' },
    {text:'السعودية' ,key:'countOption2'  },
    {text:'البحرين' ,key:'countOption3' },
    {text:'الكويت' ,key:'countOption4' },
    {text:'المملكة الأردنية الهاشمية' ,key:'countOption5' },
    {text:'سلطنة عمان' ,key:'countOption6' },
    {text:'سوريا' ,key:'countOption7' },
    {text:'مصر ' ,key:'countOption8' },
    {text:'قطر ' ,key:'countOption9' },
];

const Onboarding = props=>{

    useEffect(()=>{
        if(!cookie.get('access-token')){
            props.history.replace('/');
        }    // eslint-disable-next-line
    },[]);
    if(props.location.from!=='register'){
        props.history.replace('/');

    }
    const descOptionItems = businessDesc.map(descItem=>
            <option key = {descItem.key} value = {descItem.id}>{descItem.text}</option>
            );
     const countOptionItems = countries.map(country=>
            <option key = {country.key} value = {country.text}>{country.text}</option>
             );
     

             const textFieldStyle = {
                'height':'50px',
                'padding':'8px 10px 6px',
                'border':'1px solid #b2c2cd',
                borderRadius:' 4px',
                fontFamily:'inherit',
                fontSize:'16px',
                'transition': 'border .15s ease-in-out,box-shadow .15s ease-in-out',
                fontWeight: 'normal',
                backgroundColor:'white',
                ':focus':{
                    'border':'1px solid #136acd',
                    boxShadow:'0px 0px 5px 1px #136acd ',
                    'color': '#1c252c',
                }

            };
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

    return (


        <React.Fragment>
            {props.submitting?<div className = {classes.SpinnerWrapper}>
                <Spinner color='blue'/>

            </div>:null}
            <div dir ='rtl' className = {classes.Onboarding}>
                <div className = {[classes.OnboardingRight , !props.hidden?classes.Open:null].join(' ')}>
                    <h1>مرحبا بك في المحاسب العام!</h1>
                    <span>اخبرنا عنك وعن عملك</span>
                    <div  className = {classes.Wrapper}>
                        <label htmlFor = 'userName'>ما هو اسمك؟</label>
                        <div id='userName' className = {classes.UserName}> 
                        <TextField type='text' name='firstName' value={props.firstName} changed={props.changed}
                          placeHolder='الأسم الأول' customStyle = {textFieldStyle} idNum ='firstNameOnboarding'/>
                         <TextField type='text' name='lastName' value={props.lastName} changed={props.changed}
                          placeHolder='الأسم الأخير' customStyle = {textFieldStyle} idNum ='lastNameOnboarding'/>
                        </div>
                    </div>
                    <div className = {classes.Wrapper}>
                        <label htmlFor = 'businessName'>ما هو اسم عملك؟</label>
                        <TextField type='text' name='businessName' value={props.businsessName} changed={props.changed}
                          placeHolder=' اسم عملك' customStyle = {textFieldStyle} idNum ='businessName'/>
                    </div>
                    <div className = {classes.Wrapper}>
                        <label htmlFor = 'businessDesc'>ما هو وصف عملك؟</label>
                        <select id='businessDesc' name='businessDescription' onChange = {props.changed} value= {props.businessDescription}>
                            <option disabled selected hidden value=''> حدد أفضل وصف لعملك</option>
                            {descOptionItems}
                        </select>
                    </div>
                    <div className = {classes.Wrapper} >   
                        <label htmlFor = 'businessCountry'>مكان العمل؟</label>
                        <select id='businessCountry' name='country' onChange = {props.changed} value= {props.country}>
                            <option disabled selected hidden value=''> اختر مكان</option>
                            {countOptionItems}
                        </select>
                    </div>
                    <div className = {classes.Wrapper} hidden={props.hidden}>   
                        <label htmlFor = 'businessCurrency'>العملة؟</label>
                        <select id='businessCurrency' name='currency' onChange = {props.changed} value= {props.currency}>
                            <option disabled selected hidden value=''> اختر العملة</option>
                            <option value='USD'>USD - الدولار الأميركي</option>
                            <option value={props.currencySymb}>{props.currencySymb+' - '+props.currencyText}</option>
                        </select>
                    </div>
                    <div className = {classes.Wrapper}>
                    <Button clicked = {props.submitted} customStyle={ButtonStyle} >التالي</Button>
                    </div>
                   

                </div>


                <div className = {classes.OnboardingLeft}>

                </div>
                
            </div>
        </React.Fragment>
        
    );
};

export default Onboarding;