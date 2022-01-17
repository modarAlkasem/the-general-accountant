import React from 'react';
import classes from  './Spinner.module.css';
import blackClasses from './SpinnerBlack.module.css';
import WhiteClasses from './SpinnerWhite.module.css';

const Spinner = (props)=>{
    let classesType  = null;
    let backColor = null;
    if(props.color==='black'){
        classesType = blackClasses;
        if(props.backColor ==="yellow"){
            backColor = classesType.LoaderBackYeollow

        }else{
            backColor = classesType.LoaderBackBlue
        }
    }else if(props.color==='blue'){
        classesType = classes

    }else if(props.color==='white'){
        classesType = WhiteClasses
    }

   return  (<div className={[classesType.Loader , backColor ].join(' ')} style={props.style}>Loading...</div>)
};

export default Spinner;