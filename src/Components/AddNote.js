import React, { useState, useContext } from 'react'
import noteContext from '../Context/Notes/NoteContext';

function AddNote(props) {
    const {showAlert} = props;

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"});

    const handleClick = (e)=> {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Note Added", 'success');
        setNote({title: "", description: "", tag: "default"});
    }
    const onChanging = (e)=> {
        setNote({...note, [e.target.name]: e.target.value} )
    }
  return (
    <div>
      <h2>Write your note</h2>
        <form action="" className="my-3 ">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" name="title" id="title" onChange={onChanging} value={note.title} required minLength={3}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" id="description" onChange={onChanging} value={note.description} required minLength={5}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" name="tag" id="tag" onChange={onChanging} value={note.tag} required minLength={2}/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<5 || note.tag.length<2} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
    </div>
  )
}

export default AddNote
