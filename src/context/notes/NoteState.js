import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{

    const notesinitial=[
        {
          "_id": "649838a3e2fc629ec5266a58",
          "user": "6497e801af2b397d6cebcc6c",
          "title": "geography",
          "description": "sdkjgnksjdng nsmdg",
          "tag": "sdmn gnmsdf g",
          "date": "2023-06-25T12:52:51.691Z",
          "__v": 0
        },
        {
          "_id": "649838b3e2fc629ec5266a60",
          "user": "6497e801af2b397d6cebcc6c",
          "title": "biology",
          "description": "sdgm sdgsdg nsmdg",
          "tag": "sdmn gnmsdf g",
          "date": "2023-06-25T12:53:07.787Z",
          "__v": 0
        },
        {
          "_id": "649838bae2fc629ec5266a62",
          "user": "6497e801af2b397d6cebcc6c",
          "title": "history",
          "description": "sdfkmg skmdfm gsmdfg",
          "tag": "sdmn gnmsdf g",
          "date": "2023-06-25T12:53:14.188Z",
          "__v": 0
        },
        {
          "_id": "649838c4e2fc629ec5266a66",
          "user": "6497e801af2b397d6cebcc6c",
          "title": "maths",
          "description": "sdfkmg skmdfm gsmdfg sdagfsdg",
          "tag": "sdmn gnmsdf g",
          "date": "2023-06-25T12:53:24.451Z",
          "__v": 0
        }
      ]

      const [notes,setNotes]=useState(notesinitial);
    

    
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

    }
export default NoteState;