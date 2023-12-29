import React from "react";

function Warning(props){
    return( !props.isValid &&
        <div className="note-added">
            <h1 className="note-content">Empty Note Discarded</h1>
        </div>
    )
}

export default Warning;