import React ,{useState}from 'react';
import classes from './PageTitle.module.css';
import {IconContext} from 'react-icons';
import {FaRegQuestionCircle} from 'react-icons/fa';
import Hint from './Hint/Hint';

const PageTitle = props=>{
    const[showHint , setShowHint] = useState(false);

    const showHintHandler = ()=>{
         
        setShowHint(true);
    }
    const hideHintHandler = ()=>{
        
        setShowHint(false);
    }
    return(
        <div dir='rtl' className = {classes.PageTitle}>
            <span  className = {classes.Title}> {props.title}</span>
            <IconContext.Provider value={{
                style:{
                    color:'#718fa2',
                    fontSize:'20px'
                },
                
                className:classes.QuestionLogo
            }}>
            <span onClick = {showHintHandler} className = {classes.WrapQuestionLogo}>
                <FaRegQuestionCircle/>
            </span>
        </IconContext.Provider>
        <Hint show={showHint} closed = {hideHintHandler}>
            {props.hintText}
        </Hint>

        </div>

    );
}

export default PageTitle;