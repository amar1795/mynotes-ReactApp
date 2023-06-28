import React,{useContext} from 'react'
import notecontext from "../context/notes/NoteContext"
import MainnotesItem from './MainnotesItem';
const Mainnotes = () => {
    const context=useContext(notecontext)
    const {notes,setNotes}= context;
  return (
    <div className='row my-3'>
        <h2>Your notes</h2>
      {notes.map((note)=>{
        return <MainnotesItem key={note._id} note={note}/>;
      })}
      
    </div>
  )
}

export default Mainnotes
