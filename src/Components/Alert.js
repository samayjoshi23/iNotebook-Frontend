import React from 'react'

function Alert(props) {
    if(props.alert !== null){
        return (
          <div style={{height: '50px'}}>
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
              <strong> {props.alert.msg}</strong>
            </div>
          </div>
        );
    }
    else{
        return(
            <div style={{height: '50px'}}>
            </div>
        );
    }
}

export default Alert
