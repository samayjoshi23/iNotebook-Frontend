import React, { useContext } from "react";
import noteContext from '../Context/Notes/NoteContext'

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-6 my-3">
      <div className="card d-flex flex-column p-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
        <div className="buttons d-flex align-items-center">
              <button className="btn btn-sm btn-outline-success mx-3" disabled>{note.tag}</button>
              <i className="uil uil-trash-alt" onClick={()=>{deleteNote(note._id)}}></i>
              <i className="uil uil-edit" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
