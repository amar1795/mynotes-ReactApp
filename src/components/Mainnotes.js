import React,{useContext,useEffect,useRef,useState} from 'react'
import notecontext from "../context/notes/NoteContext"
import MainnotesItem from './MainnotesItem';
import AddNote from './AddNote';
const Mainnotes = () => {
    const context=useContext(notecontext)
    const {notes,getNotes}= context;
    useEffect(()=>{
      getNotes(); 
    },[])
    const[note,setNote]=useState({etitle:"",edescription:"",etag:""})
     const ref=useRef(null)

     const updateNote=(CurrentNote)=>{
      ref.current.click();
      setNote({etitle:CurrentNote.title,edescription:CurrentNote.description,etag:CurrentNote.tag})
     }

    const handleClick=(e)=>{
      console.log("updating the note",note)
        e.preventDefault();
        

    }
    //to add the title and description we are adding 
     const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    
  return (
    <>

<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="container my-3"> 
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle}onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">description</label>
    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
  </div>
  
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    
    
    <div className='row my-3'>
        <h2>Your notes</h2>
  {/* Populating the DOM with cards using map function */}   
      {notes.map((note)=>{
        return <MainnotesItem key={note._id} updateNote={updateNote} note={note}/>;
      })}
      
    </div>
    </>

  )   
}

export default Mainnotes
