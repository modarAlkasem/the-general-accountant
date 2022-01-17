import React from 'react'
import DocInfo from '../EntryDoc/EntryDocBody/EntryDocHeader/DocInfo/DocInfo';
import classes from './SearchAndInfo.module.css';
import TextField  from '../../UI/TextField/TextField';
import Button from '../../UI/Button/Button';
import {GoSearch} from 'react-icons/go';
import { IconContext } from 'react-icons';

const SearchAndInfo = props=>{
    const infos = props.infos.map((current , index)=>{
        return <DocInfo label = {current.label} text = {current.text} className ={classes.InfoWrap} key = {'info'+index}/>
    })
    return(
        <table dir='rtl' className = {classes.SearchAndInfo}>
            <tbody>
                <tr>
                    
                    {infos}
                    <td className= {classes.LargeBtnWrap}>
                        <Button className = {classes.ExportBtn} disabled = {props.exportDisabled?true:false} clicked ={props.exported}>تصدير</Button>  
                    </td>
                    
                        
                    <td className = {classes.LargeBtnWrap}>
                        <Button className = {classes.PreviewBtn} clicked = {props.previewed} disabled = {props.previewDisabled?true:false}>
                            معاينة</Button>
                    </td>
                    <td className = {classes.TextFieldWrap}>
                        <TextField type = 'text' name = 'searchField' value = {props.accountToSearch} changed = {props.changed} placeHolder = 'اسم الحساب'/>
                    </td>
                    <td className = {classes.SearchBtnWrap}>
                        <Button clicked = {props.search.bind(this , props.accountToSearch)} className  ={classes.SearchBtn}>
                                <IconContext.Provider value = {{
                                    style :{
                                            fontSize:'20px'
                                    }
                                }}>

                                    <GoSearch/>
                                </IconContext.Provider>
                            </Button> 

                    </td>
                
                    
                

                
                    
                
                </tr>
            </tbody>
         </table>
    );
}
export default SearchAndInfo;