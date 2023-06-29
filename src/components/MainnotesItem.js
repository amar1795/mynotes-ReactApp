import React,{useContext} from 'react'
import notecontext from "../context/notes/NoteContext"

const MainnotesItem = (props) => {
  const context=useContext(notecontext)
    const {deleteNote}= context;
    const {note}=props;
   
  return (  
    <div className="col-md-3">
        
       
        <div className="card my-3" >
        <div className="card-body ">
            <div className="d-flex align-items-center ">
        <h5 className="card-title ">{note.title}</h5>
        <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)
        console.log(note._id)}}></i>
        <i className="fa-regular fa-pen-to-square "></i>
        </div>
       
        <p className="card-text">{note.description}</p>
      
        </div>
        </div>
        </div>
    
  )
}

export default MainnotesItem
