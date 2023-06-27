import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const s1={
        "name":"harry",
        "profession":"programmer"
    }

    const [state,setState]=useState(s1);
    const update =()=>{
        setTimeout(() => {
            setState({
                "name":"ron",
                "profession":"analyst"
            })
            
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;