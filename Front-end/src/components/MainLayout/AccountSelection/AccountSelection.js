import React , {useContext} from 'react';
import ModalHeader from './../ChartOfAccounts/ModalHeader/ModalHeader';
import classes from './AccountSelection.module.css';
import EntryDocContext from './../../../context/entry-doc-context';
import Button from './../../UI/Button/Button';


const AccountSelection = props=>{
    let entryDocContext = useContext(EntryDocContext);

    if(props.usedFromAnother){
        entryDocContext = {
            searchAccountResults:props.searchAccountResults,
            chooseAccountFromResults  : props.chooseAccountFromResults,
            currency : props.currency,
            chooseAccountCancelHandler : props.chooseAccountCancelHandler

        }

    }
    const searchAccountResults = entryDocContext.searchAccountResults.map((current , index)=>{
        
        return (
                    <tr key = {'searchResult-'+index+1} onClick = {entryDocContext.chooseAccountFromResults.bind(this,current['id'])}>
                        <td>{current.index}</td>
                        <td>{current.name}</td>
                        <td>{entryDocContext.currency}</td>
                    </tr>
                );
    });
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

    return(
        <div dir = 'rtl' className = {classes.AccountSelection}>
        
            <ModalHeader text = "اختيار حساب"/>
            <div className = {classes.TableWrap}>
            
                <table className = {classes.Content}>
                    <thead>
                        <tr>
                            <th>الرمز</th>
                            <th>اسم الحساب</th>
                            <th className = {classes.ThCurrency}>العملة</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchAccountResults}
                    </tbody>
                
                </table>
        

            </div>
            <div className = {classes.Footer} dir="ltr">
                
                <div className ={classes.BtnWrapper}>
                    <Button clicked ={entryDocContext.chooseAccountCancelHandler}  customStyle = {CancelBtnStyle}>إلغاء</Button>

                </div>
            
            </div>

        
        </div>
    );
}

export default AccountSelection;