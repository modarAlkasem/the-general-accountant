import React ,{useContext} from 'react';
import classes from './EntryDocFooter.module.css';
import Button from './../../../UI/Button/Button';
import EntryDocContext from  './../../../../context/entry-doc-context';

const EntryDocFooter = props=>{
    const entryDocContext  =useContext(EntryDocContext);

    return(
        <div className = {classes.EntryDocFooter} dir= 'rtl'>

            <div className = {classes.BtnWrap}>
                <Button className = {[classes.AddBtn , entryDocContext.isNotEqual?classes.Disabled:null].join(' ')} clicked = {entryDocContext.addEntryDocClickHandler} disabled = {entryDocContext.isNotEqual?true:false} disabledClass='DisabledBlue'>إضافة</Button>
            </div>

            <div className = {classes.BtnWrap}>
                <Button className = {[classes.EditBtn ,entryDocContext.editEntryDocDisabled || entryDocContext.isNotEqual ?classes.EditBtnDisabled:null ].join(' ')} clicked = {entryDocContext.editEntryDocClickHandler}
                disabled = {entryDocContext.editEntryDocDisabled || entryDocContext.isNotEqual ?true:false}>تعديل</Button>
            </div>

            <div className = {classes.BtnWrap}>
                <Button className = {[classes.NewBtn ,entryDocContext.createNewEntryDocDisabled?classes.NewBtnDisabled:null ].join(' ')} clicked ={entryDocContext.createNewEntryDocHandler}
                        disabled = {entryDocContext.createNewEntryDocDisabled?true:false} >جديد</Button>
            </div>

            <div className = {classes.BtnWrap}>
                <Button className = {[classes.DeleBtn , entryDocContext.deleteEntryDocDisabled?classes.DeleBtnDisabled:null].join(' ')} clicked ={entryDocContext.deleteDocEntryClickHandler} disabled = {entryDocContext.deleteEntryDocDisabled?true:false} >حذف</Button>
            </div>


        </div>
    );
}

export default EntryDocFooter;