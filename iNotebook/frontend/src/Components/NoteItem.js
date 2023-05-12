import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);

  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="row-md-3 my-2">
      <div className="card my-2">
        <div className="card-body text-white bg-dark">
          <h5
            className="card-title"
            style={{ color: "rgba(251, 130, 126, 0.898)" }}
          >
            {note.title}
          </h5>
          {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
          <p className="card-text">{note.description}</p>
          <p style={{ fontSize: "12px", color: "rgb(161, 255, 181)" }}>
            {note.tag}
          </p>

          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfull", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
