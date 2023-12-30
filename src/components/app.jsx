import React, { useState } from "react";
import Header from "./header";
import NewNote from "./newNote";
import Note from "./note";
import Warning from "./warning";
import Footer from "./footer";
import Button from '@mui/material/Button';

function App(){
    const [notes, setNotes] = useState([])
    const [isNotes, setIsNotes] = useState(false)

    function addNote(newData){
        setNotes(prevNotes =>{
            return [...prevNotes, newData]
        }, setWarning(true), setIsNotes(true))
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

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        notes.map((eachNote) => {
          return ( fetch(
                'http://localhost:5000/submit', {
                    method: "post",
                    body: JSON.stringify(eachNote),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }));
        })
    }

    const handleOnGet = async () => {
        try {
            const response = await fetch('http://localhost:5000/getNotes');
            const data = await response.json();
            // Add the fetched notes to the state using addNote function
            data.forEach(note => addNote(note));
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }


    return (
    <div>
        <Header />
        <NewNote onAdd={addNote} notValid={handleNotValid} />
        <Warning isValid={warning}/>
        <form onSubmit={handleOnSubmit} className="notes-submitted">
            {notes.map((eachNote, index) =>{
             return <Note key={index} id={index} title={eachNote.title} content={eachNote.content} delete={deleteNote}/>
            })}

        <Button onClick={handleOnGet} className="submit">Get Notes</Button>
        {isNotes && <Button onclick={handleOnSubmit} type="submit" className="submit">Submit</Button>}
        </form>
        <Footer />
        </div>)
}

export default App;