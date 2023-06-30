import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  //to fetch the notes

  const getNotes=async()=>{
    
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5N2U4MDFhZjJiMzk3ZDZjZWJjYzZjIn0sImlhdCI6MTY4NzY3Njk4Mn0.No-Ibi6vSDngfLSKRP_4pZjCnQyfjIYoG8jSCYoyMBA",
      },
     
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    setNotes(json)
  };
 

  //to add the note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",// no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5N2U4MDFhZjJiMzk3ZDZjZWJjYzZjIn0sImlhdCI6MTY4NzY3Njk4Mn0.No-Ibi6vSDngfLSKRP_4pZjCnQyfjIYoG8jSCYoyMBA",
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    console.log("adding a new note");
    const note = {
      _id: "649838c4e2fc629ec5266a46",
      user: "6497e801af2b397d6cebcc6c",
      title: title,
      description: description,
      tag: tag,
      date: "2023-06-25T12:53:24.451Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };
  //to delete the note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5N2U4MDFhZjJiMzk3ZDZjZWJjYzZjIn0sImlhdCI6MTY4NzY3Njk4Mn0.No-Ibi6vSDngfLSKRP_4pZjCnQyfjIYoG8jSCYoyMBA",
      },
     
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //to edit the note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5N2U4MDFhZjJiMzk3ZDZjZWJjYzZjIn0sImlhdCI6MTY4NzY3Njk4Mn0.No-Ibi6vSDngfLSKRP_4pZjCnQyfjIYoG8jSCYoyMBA",
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    //logic to edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
