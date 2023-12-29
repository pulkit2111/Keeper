import React , {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function NewNote(props){

    const [newData, setNewData] = useState({
        title: "",
        content: "",
    });

    function dataAdded(event){
        let { value, name}=event.target;
        setNewData(prevData => {
            return{
                ...prevData,
                [name]:value,
            }
        })
    }

    function formSubmitted(event){
        event.preventDefault();
    }

    const [extended, setExtended] = useState(false);

    function addWhole(){
        setExtended(true);
    }

    return(
        <div className="note-structure">
            <form onSubmit={formSubmitted} className="newNote">
            {extended && <input onClick={addWhole} value={newData.title} onChange={dataAdded} name="title" className="note-title" placeholder="Title" />}
            <textarea onClick={addWhole} value={newData.content} onChange={dataAdded} name="content" className="note-content" placeholder="Take a note.." rows={extended? 3 : 1}/>
            <Zoom in={extended}>
            <Fab type="submit" className="add-button" onClick={() => {
               const a =  newData.title.trim();
               const b =  newData.content.trim();
                if(a!=="" || b!==""){
                return (props.onAdd(newData), setNewData({title:"", content:""}));}
                else{
                    return(props.notValid())
                }
            }
            }><AddIcon />
            </Fab>
            </Zoom>
            </form>
        </div>
    )
}

export default NewNote;