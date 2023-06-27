import React, { useEffect } from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
    const a=useContext(NoteContext);
    useEffect(()=>{
        a.update();

    },[])
  return (
    <div>
      this is {a.state.name} and his  profession is {a.state.profession}
    </div>
  )
}

export default About
