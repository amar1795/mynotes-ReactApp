
import React,{useContext,useState} from 'react'
import notecontext from "../context/notes/NoteContext"
import Mainnotes from './Mainnotes'

const AddNote = () => {
    const context=useContext(notecontext)
    const {addNote}= context;
    const[note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)

    }
    //to add the title and description we are adding 
     const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    
  return (
    <div>
        <h2>Add a note</h2>
    <div className="container my-3">
      <form>
        <div className="container my-3"> 
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add a note</button>
  </div>
</form>
      
      <Mainnotes/>
    </div>
      
    </div>
  )
}

export default AddNote
