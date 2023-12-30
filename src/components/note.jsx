import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props){
    return (
        <div className="note-added">
            <h1 name="title" className="note-title">{props.title}</h1>
            <p name="content" className="note-content">{props.content}</p>
            <button className="delete" onClick={()=>{return props.delete(props.id)}} >
                <DeleteIcon />
            </button>
        </div>
    )
}

export default Note;