import React ,{useContext} from 'react';
import {IconContext} from 'react-icons';
import {IoIosArrowForward ,IoIosArrowBack } from 'react-icons/io';
import TextField from './../../UI/TextField/TextField';
import Button from './../../UI/Button/Button';
import classes from './EntryDocNavigator.module.css';
import EntryDocContext from './../../../context/entry-doc-context';


const EntryDocNavigator = props=>{
    const entryDocContext  =useContext(EntryDocContext);
    let nextDocId = 0;
    let prevDocId = 0;
    if(parseInt(entryDocContext.docId) < entryDocContext.docIds.length){

        nextDocId = entryDocContext.docIds[parseInt(entryDocContext.docId)];

    }else if(parseInt(entryDocContext.docId) === entryDocContext.docIds.length || parseInt(entryDocContext.docId) > entryDocContext.docIds.length ){
        nextDocId = 0;
    }
    if(parseInt(entryDocContext.docId) < entryDocContext.docIds.length && parseInt(entryDocContext.docId)>1 ){

        prevDocId = entryDocContext.docIds[parseInt(entryDocContext.docId)-2];

    }else if(parseInt(entryDocContext.docId) === entryDocContext.docIds.length && parseInt(entryDocContext.docId)!==1 ){
        prevDocId = entryDocContext.docIds[parseInt(entryDocContext.docId)-2];
    }else if(parseInt(entryDocContext.docId) === entryDocContext.docIds.length && parseInt(entryDocContext.docId)===1){
        prevDocId =0;
    }else if(parseInt(entryDocContext.docId)>entryDocContext.docIds.length &&entryDocContext.docIds.length>=1 ){

             prevDocId =entryDocContext.docIds[entryDocContext.docIds.length-1];
    }
    return (

        <td className = {classes.EntryDocNavigator}>
            <div className = {classes.ButtonWrapper} >
                <Button clicked = {entryDocContext.searchDocEntryHandler.bind(this,nextDocId)} disabled = {entryDocContext.nextDocDisabled ?true:false} className = {entryDocContext.nextDocDisabled ?classes.NavBtnDisabled:null}>
                    <IconContext.Provider value = {{
                        style :{
                            fontSize:'30px',
                            color:'#fff'
                        }
                    }}>
                        <IoIosArrowForward/>
                    </IconContext.Provider>
                </Button>
            </div>
            <div className = {classes.InputWrapper}>
            <TextField type = "text" name = 'docIdField' value ={entryDocContext.docId}  placeHolder = 'رقم السند'
                        disabled/>
            </div>
          <div className = {classes.ButtonWrapper}>
            <Button clicked ={entryDocContext.searchDocEntryHandler.bind(this,prevDocId)} disabled = {entryDocContext.prevDocDisabled ?true:false} className = {entryDocContext.prevDocDisabled ?classes.NavBtnDisabled:null}>
                    <IconContext.Provider value = {{
                        style:{
                            fontSize:'30px',
                            color:'#fff'
                        }
                    }}>
                            <IoIosArrowBack/>
                    </IconContext.Provider> 
            </Button>
          </div>


        </td>
    );
}

export default EntryDocNavigator;