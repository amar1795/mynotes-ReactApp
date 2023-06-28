import React,{useContext} from 'react'
import notecontext from "../context/notes/NoteContext"
import MainnotesItem from './MainnotesItem';
import AddNote from './AddNote';
const Mainnotes = () => {
    const context=useContext(notecontext)
    const {notes,addNote}= context;
    
  return (
    
    
    <div className='row my-3'>
        <h2>Your notes</h2>
  {/* Populating the DOM with cards using map function */}   
      {notes.map((note)=>{
        return <MainnotesItem key={note._id} note={note}/>;
      })}
      
    </div>

  )   
}

export default Mainnotes
