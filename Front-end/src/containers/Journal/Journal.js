import React , {Component} from 'react';
import Aux from './../../hoc/Auxiliary/Auxiliary';
import cookie from '../../services/cookieService';
import Spinner from '../../components/UI/Spinner/Spinner';
import PageTitle from '../../components/MainLayout/PageTitle/PageTitle';
import JournalContext from '../../context/journal-context';
import JournalBody from '../../components/MainLayout/Journal/JournalBody/JournalBody';
import axios from './../../axios-general';
import Modal from '../../components/UI/Modal/Modal';


class Journal extends Component{

    state = {

        loading :true,
        data :{},
        date:'',
        currency:'',
        exporting:false,
        foundName:''
    }

    getJournal = ()=>{

        const config = {
            headers:{
                 Authorization :'Bearer '+cookie.get('access-token'),
                 Accept : 'application/json'
                    }
            }; 
        axios.get(`/foundations/${this.props.foundId}/journal` , config).then(response=>{
            
            let today = new Date().toISOString().slice(0, 10);
            
            this.setState({
                date : today,
                currency:this.props.foundCurrency,
                loading:false,
                data:response.data.data,
                foundName:this.props.foundName
            });
        });

    }
    exportJournal = ()=>{
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
        axios.get(`/foundations/${this.props.foundId}/exportjournal` , config).then((response)=>{
            
            this.setState({
                exporting:false
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            let currentYear = new Date().getFullYear();
            link.setAttribute('download', this.state.foundName+'_دفتر اليومية_'+currentYear+'.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();

        });

    }
    
    componentDidMount(){

        if(!cookie.get('access-token')){
            this.props.history.replace('/');
            return;
        }else{
            this.getJournal();
        }
    }

    render(){
        const hintText = 'صفحة دفتر اليومية تعرض القيود المالية المسجلة بحسب التسلسل الزمني .';
        return(
            <JournalContext.Provider value = {{
                data:this.state.data,
                date:this.state.date,
                currency:this.state.currency,
                loading:this.state.loading,
                exporting:this.state.exporting,
                getJournal : this.getJournal,
                exportJournal: this.exportJournal

            }}>


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
                </div>
            :<Aux>
                <Modal show = {this.state.exporting}>
                    <Spinner color ='blue'/>
                </Modal>
                <div style ={{
                margin:'0px',
                padding:'0px'
                }}>
                    <PageTitle title = 'دفتر اليومية' hintText = {hintText}/>
                    <JournalBody/>

                </div>
            </Aux>

            }



            
            </JournalContext.Provider>


        );
    }






}

export default Journal;