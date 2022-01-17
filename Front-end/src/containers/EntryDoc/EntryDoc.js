import React ,{Component} from 'react';
import PageTitle from './../../components/MainLayout/PageTitle/PageTitle';
import cookie from './../../services/cookieService';
import EntryDocContext from './../../context/entry-doc-context';
import EntryDocBody from './../../components/MainLayout/EntryDoc/EntryDocBody/EntryDocBody';
import EntryDocFooter from './../../components/MainLayout/EntryDoc/EntryDocFooter/EntryDocFooter';
import Modal from './../../components/UI/Modal/Modal';
import Confirmation from './../../components/MainLayout/EntryDoc/Confirmation/Confirmation';
import AccountSelection from './../../components/MainLayout/AccountSelection/AccountSelection';
import axios from './../../axios-general';
import Spinner from './../../components/UI/Spinner/Spinner';



class EntryDoc extends Component{

    state = {
        docDate:'',
        currency:'',
        docId:'1',
        docAmount:1,
        docIds:[],
        docContent:[],
        entryAccountsIds:[],
        creditSum:0,
        debitSum :0,
        creditFromDebit:0,
        debitFromCredit:0,
        isNotEqual:false,
        deleting:false,
        adding:false,
        creatingNewEntryDoc:false,
        isCreatingNewEntryDoc:false,
        searchingAccount :false,
        choosingAccount :false,
        changingEntryPartIndex:0,
        searchAccountResults:[],
        accountSpecified:false,
        addingToServer:false,
        loading:true,
        prevDocDisabled:false,
        nextDocDisabled:false,
        searchingEntryDoc:false,
        createNewEntryDocDisabled:true,
        deletingFromServer : false,
        deleteEntryDocDisabled : true,
        editing:false,
        editingInServer:false,
        editEntryDocDisabled : true


    };


    docIdChangedHandler =event=>{
       
        this.setState({
            docId:event.target.value
        });
    }

    entryPartChangedHandler = (rowId ,event)=>{
            let entryParts = [...this.state.docContent];
            let entryPart = null;
            let entryPartIndex = null;
            let flag =false;
           entryPartIndex= entryParts.findIndex(current=>{
                if(current.rowId===rowId){
                   return true;

                }else{
                    return false;
                }
            });
            entryPart = {...entryParts[entryPartIndex]};
            if(event.target.name==='descriptionField'){
                entryPart.description = event.target.value;
            }else if(event.target.name==='creditField'){
                entryPart.credit = event.target.value;
            }else if(event.target.name==='debitField'){
                entryPart.debit = event.target.value;
            }else if(event.target.name==='dateField'){
                entryPart.date = event.target.value;
            }else if(event.target.name==='accountNameAndIndexField'){
                entryPart.accountNameAndIndex = event.target.value;
                flag= true;
            }

            entryParts[entryPartIndex] =entryPart;
            if(flag && this.state.accountSpecified){
                this.setState({
                    docContent :entryParts,
                    changingEntryPartIndex : entryPartIndex,
                    accountSpecified:false
                });
            }else if(flag && !this.state.accountSpecified ){
                this.setState({
                docContent :entryParts,
                changingEntryPartIndex : entryPartIndex
                });
            }else if(!flag && !this.state.accountSpecified ){
                this.setState({
                docContent :entryParts,
                changingEntryPartIndex : entryPartIndex
                });

            }else if(!flag && this.state.accountSpecified){
                this.setState({
                    docContent :entryParts,
                    changingEntryPartIndex : entryPartIndex
                    });

            }




    }

    keyPressHandler=event=>{

      if(event.charCode===13){
          if(event.target.name==='accountNameAndIndexField'){

              this.searchAccountHandler(event.target.value);
          }else if(event.target.name==='creditField'){
              this.updateSumCreditOrDebit('credit')
          }else if(event.target.name==='debitField'){
              this.updateSumCreditOrDebit('debit');
          }
      }
    }

    updateSumCreditOrDebit=(specifier)=>{

            this.setState((prevState)=>{
                let sum = 0;
                let difference =0;
                prevState.docContent.forEach(current=>{
                    sum = sum+(current[specifier]===''?0:parseInt(current[specifier]));
                });
                if(specifier==='credit'){
                    if(prevState.debitSum===sum){
                        return {
                            creditSum:sum,
                            debitFromCredit:0,
                            creditFromDebit:0,
                            isNotEqual:false
                        }
                    }else {
                        difference = prevState.debitSum-sum;
                        return{
                            creditSum:sum,
                            debitFromCredit:difference,
                            creditFromDebit:(-1*difference),
                            isNotEqual:true
                        }
                    }

                }else if(specifier==='debit'){
                    if(prevState.creditSum===sum){
                        return {
                            debitSum:sum,
                            debitFromCredit:0,
                            creditFromDebit:0,
                            isNotEqual:false
                        }
                    }else {
                        difference = prevState.creditSum-sum;
                        return{
                            debitSum:sum,
                            debitFromCredit:(-1*difference),
                            creditFromDebit:difference,
                            isNotEqual:true
                        }
                    }
                }

                                     });
        
    }
    blurHandler = event=>{
        if(event.target.name==='accountNameAndIndexField'){
            if(!this.state.accountSpecified){
                this.searchAccountHandler(event.target.value);
            }
            
        }else if(event.target.name==='creditField'){
              this.updateSumCreditOrDebit('credit')
        }else if(event.target.name==='debitField'){
              this.updateSumCreditOrDebit('debit');
        }
    }

    deleteDocEntryClickHandler=()=>{
        this.setState({
            deleting:true
        });
    }



    addEntryDocClickHandler = ()=>{
        this.setState({
            adding:true
        });
    }
    addEntryDocCancelHandler =()=>{
        this.setState({
            adding:false
        });
    }

    editEntryDocClickHandler = ()=>{
        this.setState({
            editing:true
        });
    }
    editEntryDocCancelHandler=()=>{
        this.setState({
            editing:false
        });
    }

    editEntryDocContinueHandler=()=>{
        this.setState({
            editing:false,
            editingInServer:true
        });
        const config = {
                            headers:{
                                Authorization :'Bearer '+cookie.get('access-token'),
                                Accept : 'application/json'
                                     }
                        }; 
        let filledEntryAccounts = [];
        this.state.docContent.forEach((current,index)=>{
            if(current.accountNameAndIndex!=='' &&current.description!==''&&(current.debit!=='' ||current.credit!=='')&&current.date!==''){
                 filledEntryAccounts.push({
                     ...current,
                     accountId:this.state.entryAccountsIds[index]
                 });

            }
        });
        const data = {

            docDate:this.state.docDate,
            docContent:filledEntryAccounts

        };
        const vDocIdIndex = parseInt(this.state.docId)-1;
        const vDocId = this.state.docIds[vDocIdIndex];
        axios.put(`/documents/${vDocId}` ,data , config)
            .then(response=>{
            this.setState({
                editingInServer:false,
             });
            });
    }

    
    continueAddingEntryDocHandler = ()=>{

        this.setState({
            adding:false,
            addingToServer:true
        });
        const config = {
                            headers:{
                                Authorization :'Bearer '+cookie.get('access-token'),
                                Accept : 'application/json'
                                     }
                        }; 
        let filledEntryAccounts = [];
        this.state.docContent.forEach((current,index)=>{
            if(current.accountNameAndIndex!=='' &&current.description!==''&&(current.debit!=='' ||current.credit!=='')&&current.date!==''){
                 filledEntryAccounts.push({
                     ...current,
                     accountId:this.state.entryAccountsIds[index]
                 });

            }
        });
        

        const data = {

            docDate:this.state.docDate,
            docContent:filledEntryAccounts

        };

        axios.post(`/foundations/${this.props.foundId}/documents` ,data , config)
            .then(response=>{

            const array  =new Array(15);
            array.fill(null);
            const entryAccountsIdsArr  =new Array(15);
            entryAccountsIdsArr.fill(0);
            const docContent = array.map((current,index)=>{
                return {
                    rowId:index+1,
                    accountNameAndIndex:'',
                    description:'',
                    credit:'',
                    debit:'',
                    date:'',
                    correspondingAcc:''
                };
            });
            let today = new Date().toISOString().slice(0, 10);
            let vDocIds = [...this.state.docIds];
            vDocIds.push(response.data.docId);
            this.setState({
                docContent:docContent,
                currency:this.props.foundCurrency,
                docDate:today,
                entryAccountsIds:entryAccountsIdsArr,
                docIds:vDocIds,
                docId:vDocIds.length+1+'',
                docAmount:response.data.docAmount,
                creditSum:0,
                debitSum:0,
                debitFromCredit:0,
                creditFromDebit:0,
                addingToServer:false,
                changingEntryPartIndex:0,
                prevDocDisabled:false,
                nextDocDisabled:true
            });
            });


    }

    deleteDocEntryCancelHandler = ()=>{
        this.setState({
          deleting:false
        });
    }

    deleteEntryDocContinueHandler = ()=>{
        this.setState({
            deletingFromServer : true,
            deleting:false
        });
        const config = {
            headers:{
                Authorization :'Bearer '+cookie.get('access-token'),
                Accept : 'application/json'
            }
        };
        
        const docIdIndex = parseInt(this.state.docId)-1;
        const docId = this.state.docIds[docIdIndex];
        let prevEntryDocId = 0;
        axios.delete(`/documents/${docId}` , config).then(response=>{

            const vDocIds = [...this.state.docIds];
            vDocIds.splice(docIdIndex,1);
            if(vDocIds.length===0){
                this.createNewEntryDocContinueHandler(true);

            }else if(vDocIds>0 && !(docIdIndex-1<0)){
                prevEntryDocId = this.state.docIds[docIdIndex-1];
                this.searchDocEntryHandler(prevEntryDocId);


            }else{
                this.setState({
                    deleteEntryDocDisabled:true
                });
            }

        });

    }

    createNewEntryDocHandler = ()=>{
        this.setState({
            creatingNewEntryDoc:true
        });
    }

    createNewEntryDocCancelHandler = ()=>{
        this.setState({
            creatingNewEntryDoc:false
        });
    }

    createNewEntryDocContinueHandler = (usedFromAnother)=>{
        if(!usedFromAnother){
            this.setState({
            creatingNewEntryDoc :false,
            isCreatingNewEntryDoc:true
            });
        }

        let today = new Date().toISOString().slice(0, 10);
        const array  =new Array(15);
        array.fill(null);
        const entryAccountsIdsArr  =new Array(15);
        entryAccountsIdsArr.fill(0);

        const vDocContent = array.map((current,index)=>{

            return {
                rowId:index+1,
                accountNameAndIndex:'',
                description:'',
                credit:'',
                debit:'',
                date:'',
                correspondingAcc:''
                };
         });
         if(!usedFromAnother){
                this.setState({
                            docDate : today,
                            nextDocDisabled:true,
                            prevDocDisabled:false,
                            docId : this.state.docIds.length+1+'',
                            docContent : vDocContent,
                            entryAccountsIds : entryAccountsIdsArr,
                            creditSum:0,
                            debitSum:0,
                            debitFromCredit:0,
                            creditFromDebit:0,
                            isNotEqual:false,
                            isCreatingNewEntryDoc :false,
                            changingEntryPartIndex:0,
                            searchAccountResults:[],
                            deleteEntryDocDisabled : true,
                            editEntryDocDisabled:true




                        });

         }else{
             this.setState({
             docDate : today,
             nextDocDisabled:true,
             prevDocDisabled:true,
             docId : 1+'',
             docIds:[],
             docContent : vDocContent,
             entryAccountsIds : entryAccountsIdsArr,
             creditSum:0,
             debitSum:0,
             debitFromCredit:0,
             creditFromDebit:0,
             isNotEqual:false,
             changingEntryPartIndex:0,
             searchAccountResults:[],
             deletingFromServer :false,
             deleteEntryDocDisabled:true,
             editEntryDocDisabled:true




         });
         }
         
    }


    searchAccountHandler=searchKey=>{
        this.setState({
            searchingAccount:true
        });
        const config = {
            headers:{
                Authorization :'Bearer '+cookie.get('access-token'),
                Accept : 'application/json'
            }
        };

        axios.get(`/accounts/search?foundId=${this.props.foundId}&string=${searchKey}` , config)
        .then(response=>{
            if(response.data.data.length===1){
                let entryParts = [...this.state.docContent];
                let entryPart = null;
                let entryAccountsIdsArr = [...this.state.entryAccountsIds];
                entryAccountsIdsArr[this.state.changingEntryPartIndex]=response.data.data[0].id;
                entryPart = {...entryParts[this.state.changingEntryPartIndex]};
                entryPart['accountNameAndIndex'] = response.data.data[0].index+'-'+response.data.data[0].name;
                
                entryParts[this.state.changingEntryPartIndex] = entryPart;
              


                this.setState({
                    docContent:entryParts,
                    searchingAccount:false,
                    accountSpecified:true,
                    entryAccountsIds :entryAccountsIdsArr
                });

            }else if(response.data.data.length>1){

                this.setState({
                    searchAccountResults:response.data.data,
                    choosingAccount:true,
                    searchingAccount:false,
                    accountSpecified:true
                })

            }

        }).catch(error=>{
            console.log(error);
        });

    }


    searchDocEntryHandler=(docId)=>{
        this.setState({
            searchingEntryDoc:true
        });
        const config = {
            headers:{
                 Authorization :'Bearer '+cookie.get('access-token'),
                 Accept : 'application/json'
                    }
                        };
        axios.get(`/foundations/${this.props.foundId}/documents/${docId}` , config).then(response=>{

            let vDocContent = [...response.data.data.docContent];
            let vDebitSum = 0;
            let vCreditSum = 0;
            let vNextDocDisabled =false;
            let vPrevDocDisabled = false;
            let entryAccountsIdsArr  =[...response.data.data.entryAccountsIds];
            vDocContent.forEach(current=>{

                if(current.debit!==''){
                    vDebitSum = vDebitSum + parseInt(current.debit);


                }else if(current.credit!==''){
                    vCreditSum = vCreditSum + parseInt(current.credit);

                }
            });
            for(let i = vDocContent.length+1;i<=15 ; i++){
                
                vDocContent.push({
                    rowId:i,
                    accountNameAndIndex:'',
                    description:'',
                    credit:'',
                    debit:'',
                    date:'',
                    correspondingAcc:''
                });
                entryAccountsIdsArr.push(0);

            }
            let docNum =this.state.docIds.findIndex(current=>{
                if(current===docId){
                    return true;

                }else{
                    return null;
                }
            });
            docNum = docNum+1;
            if(docNum===1 && this.state.docIds.length>1){

                vPrevDocDisabled = true;

            }else if(docNum===this.state.docIds.length&& this.state.docIds.length!==1){
                vNextDocDisabled = true;
            }
            this.setState({
                searchingEntryDoc:false,
                docId:docNum+'',
                nextDocDisabled:vNextDocDisabled,
                prevDocDisabled:vPrevDocDisabled,
                docContent:vDocContent,
                entryAccountsIds:entryAccountsIdsArr,
                docDate:response.data.data.docDate,
                creditSum:vCreditSum,
                debitSum :vDebitSum,
                creditFromDebit:0,
                debitFromCredit:0,
                changingEntryPartIndex:0,
                createNewEntryDocDisabled:false,
                deletingFromServer:false,
                deleteEntryDocDisabled : false,
                editEntryDocDisabled:false

            });


        });
            
            
            

    
    }



    componentDidMount(){
        if(!cookie.get('access-token')){
            this.props.history.replace('/');
            return;
        }
        else{
            const config = {
                headers:{
                     Authorization :'Bearer '+cookie.get('access-token'),
                     Accept : 'application/json'
                        }
                            }; 
   
            axios.get(`/foundations/${this.props.foundId}/documents` , config).then(response=>{
            const array  =new Array(15);
            array.fill(null);
            const entryAccountsIdsArr  =new Array(15);
            entryAccountsIdsArr.fill(0);

            const docContent = array.map((current,index)=>{
                return {
                    rowId:index+1,
                    accountNameAndIndex:'',
                    description:'',
                    credit:'',
                    debit:'',
                    date:'',
                    correspondingAcc:''
                };
            });

            let today = new Date().toISOString().slice(0, 10);
            let documentsAmount = 0;
            let documentsIds = [];
            let docID = 0;
            let vPrevDocDisabled=false;
            let vNextDocDisabled=false;
            if(response.data.documents.length===0){
                documentsAmount = 0;
                docID =1;
                vPrevDocDisabled=true;
                vNextDocDisabled = true;

            }else if(response.data.documents.length>0){
                documentsIds = response.data.documents.map(current=>{
                    return current.document_id;
                });
                documentsAmount =documentsIds.length; 
                docID = documentsIds.length+1;
                vPrevDocDisabled=false;
                vNextDocDisabled = true;
            }
            this.setState({
                docContent:docContent,
                currency:this.props.foundCurrency,
                docDate:today,
                entryAccountsIds:entryAccountsIdsArr,
                loading:false,
                docAmount:documentsAmount,
                docIds : documentsIds,
                docId:docID+'',
                prevDocDisabled:vPrevDocDisabled,
                nextDocDisabled :vNextDocDisabled
            });

            });
          
        }
    }
    chooseAccountCancelHandler = ()=>{

        this.setState({
            choosingAccount:false,
            searchAccountResults:[],
            accountSpecified:false
        });
    }
    chooseAccountFromResults = (accountId)=>{
 
        
        let account =null;
         this.state.searchAccountResults.forEach(current=>{
            if(current.id===accountId){

                account= current;

            }
        });
        
        let entryParts = [...this.state.docContent];
        let entryPart = null;
        let entryAccountsIdsArr = [...this.state.entryAccountsIds];
        entryAccountsIdsArr[this.state.changingEntryPartIndex]=account.id;
        entryPart = {...entryParts[this.state.changingEntryPartIndex]};
        entryPart['accountNameAndIndex'] =account.index +'-'+account.name;
        
        entryParts[this.state.changingEntryPartIndex] = entryPart;
        
        this.setState({
                docContent:entryParts,
                choosingAccount:false,
                searchAccountResults:[],
                entryAccountsIds : entryAccountsIdsArr


            });

    }
/*    لا تنسى حل مشكلة عندما تكون نتيجة البحث عن حساب اكثر من واحدة اضطر الى النقر مريتن على الحساب المختار*/
    render(){
        
        const hintText =`صفحة سند قيد تسمح لك بإدارة القيود المالية الخاصة بعملك.`;
        let modalContent  = null;
        let backdropHidden = null;
        let show = false;

        if(this.state.deleting ||this.state.adding || this.state.creatingNewEntryDoc ||this.state.editing){


            
            let modalHeaderText = null;
            let modalMessage = null;
            let canceled = null;
            let actionBtnText = null;
            let actionBtnClass =null;
            let actionBtnHandler = null;           
            if(this.state.deleting){
                backdropHidden = this.deleteDocEntryCancelHandler;
                modalHeaderText ='حذف سند قيد';
                modalMessage ='هل انت متأكد انك تريد القيام بعملية الحذف ؟';
                canceled  =this.deleteDocEntryCancelHandler;
                actionBtnText = 'حذف';
                actionBtnClass = 'DeleteBtn';
                show = true;
                actionBtnHandler = this.deleteEntryDocContinueHandler
            }else if(this.state.adding){

                backdropHidden = this.addEntryDocCancelHandler;
                modalHeaderText ='إضافة سند قيد';
                modalMessage ='هل انت متأكد انك تريد القيام بعملية الإضافة ؟';
                canceled = this.addEntryDocCancelHandler;
                actionBtnText = 'إضافة';
                actionBtnClass ='AddBtn';
                show =true; 
                actionBtnHandler = this.continueAddingEntryDocHandler
            }else if(this.state.creatingNewEntryDoc){
                backdropHidden = this.createNewEntryDocCancelHandler;
                modalHeaderText ='إنشاء سند قيد جديد';
                modalMessage ='هل انت متأكد انك تريد القيام بعملية الإنشاء ؟';
                canceled = this.createNewEntryDocCancelHandler;
                actionBtnText = 'جديد';
                actionBtnClass ='CreateBtn';
                show = true;
                actionBtnHandler = this.createNewEntryDocContinueHandler.bind(this,false);

            }else if(this.state.editing){
                backdropHidden = this.editEntryDocCancelHandler;
                modalHeaderText ='تعديل سند قيد ';
                modalMessage ='هل انت متأكد انك تريد القيام بعملية التعديل ؟';
                canceled = this.editEntryDocCancelHandler;
                actionBtnText = 'تعديل';
                actionBtnClass ='EditBtn';
                show = true;
                actionBtnHandler = this.editEntryDocContinueHandler

            }
            modalContent =   (<Confirmation headerText = {modalHeaderText} message = {modalMessage} 
                                    canceled = {canceled} actionBtnText = {actionBtnText} className = {actionBtnClass} clicked={actionBtnHandler} /> );
        }else if(this.state.searchingAccount ){
            show = true;
            modalContent = <Spinner color = 'blue' />

        }else if(this.state.choosingAccount){
            show=true;
            backdropHidden = this.chooseAccountCancelHandler;
            modalContent = <AccountSelection />

        }
    

        return(
            <EntryDocContext.Provider value ={{
                docDate:this.state.docDate,
                currency:this.state.currency,
                docId:this.state.docId,
                docAmount:this.state.docAmount,
                docContent:this.state.docContent,
                creditSum:this.state.creditSum,
                debitSum :this.state.debitSum,
                creditFromDebit:this.state.creditFromDebit,
                debitFromCredit:this.state.debitFromCredit,
                docIdChangedHandler:this.docIdChangedHandler,
                entryPartChangedHandler :this.entryPartChangedHandler,
                isNotEqual:this.state.isNotEqual,
                deleteDocEntryClickHandler:this.deleteDocEntryClickHandler,
                deleteDocEntryCancelHandler :this.deleteDocEntryCancelHandler,
                addEntryDocClickHandler :this.addEntryDocClickHandler,
                searchAccountResults : this.state.searchAccountResults,
                chooseAccountCancelHandler : this.chooseAccountCancelHandler,
                deleting:this.state.deleting,
                adding:this.state.adding,
                searchingAccount :this.state.searchingAccount,
                choosingAccount :this.state.choosingAccount,
                changingEntryPartIndex:this.state.changingEntryPartIndex,
                chooseAccountFromResults : this.chooseAccountFromResults,
                entryAccountsIds: this.state.entryAccountsIds,
                addingToServer :this.state.addingToServer,
                continueAddingEntryDocHandler :this.continueAddingEntryDocHandler,
                loading:this.state.loading,
                docIds:this.state.docIds,
                prevDocDisabled:this.state.prevDocDisabled,
                nextDocDisabled:this.state.nextDocDisabled,
                searchDocEntryHandler : this.searchDocEntryHandler,
                creatingNewEntryDoc : this.state.creatingNewEntryDoc,
                createNewEntryDocHandler : this.createNewEntryDocHandler,
                createNewEntryDocCancelHandler : this.createNewEntryDocCancelHandler,
                isCreatingNewEntryDoc:this.state.isCreatingNewEntryDoc,
                createNewEntryDocContinueHandler:this.createNewEntryDocContinueHandler,
                createNewEntryDocDisabled : this.state.createNewEntryDocDisabled,
                deletingFromServer : this.state.deletingFromServer,
                deleteEntryDocContinueHandler:this.deleteEntryDocContinueHandler,
                deleteEntryDocDisabled:this.state.deleteEntryDocDisabled,
                editing:this.state.editing,
                editEntryDocCancelHandler : this.editEntryDocCancelHandler,
                editEntryDocClickHandler:this.editEntryDocClickHandler,
                editingInServer:this.state.editingInServer,
                editEntryDocDisabled : this.state.editEntryDocDisabled,
                editEntryDocContinueHandler : this.editEntryDocContinueHandler


 
                
            }}>
         
            {
                this.state.loading ||this.state.searchingEntryDoc|| this.state.addingToServer ||this.state.isCreatingNewEntryDoc ||this.state.deletingFromServer || this.state.editingInServer?
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
                :null
        }

                <Modal show = {show} backdropHidden ={backdropHidden} > 
                  {modalContent}
                </Modal>
                <div style = {{
                    margin:'0px',
                    padding:'0px'
                }} onKeyPress = {this.keyPressHandler} onBlur = {this.blurHandler}>
                    <PageTitle title ="سند قيد" hintText = {hintText} />
                    <EntryDocBody/>
                    <EntryDocFooter/>
                </div>
            </EntryDocContext.Provider>

        );
    }

}

export default EntryDoc;