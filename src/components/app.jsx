import React, { useState } from "react";
import Header from "./header";
import NewNote from "./newNote";
import Note from "./note";
import Warning from "./warning";
import Footer from "./footer";
// import Notes from "../notes";

function App(){
    const [notes, setNotes] = useState([])

    function addNote(newData){
        setNotes(prevNotes =>{
            return [...prevNotes, newData]
        }, setWarning(true))
    }

    function deleteNote(id){
        setNotes(prevNotes => {
            return prevNotes.filter((note, index)=>{
                return index !== id;
            })
        }, setWarning(true))
    }

    const [warning, setWarning] = useState(true);
    function handleNotValid(){
         setWarning(false);
    }

    return (
    <div>
        <Header />
        <NewNote onAdd={addNote} notValid={handleNotValid} />
        <Warning isValid={warning}/>
        <div className="notes-submitted">
            {notes.map((eachNote, index) =>{
             return <Note key={index} id={index} title={eachNote.title} content={eachNote.content} delete={deleteNote}/>
            })}
        </div>
        <Footer />
        </div>)
}

export default App;