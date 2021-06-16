import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button, TextField } from "@material-ui/core";
import { Create } from "../../api/note";

export default function CreateNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content } = note;
        const newNote = {
          title,
          content,
        };

        await Create(newNote, token);

        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create-note">
      <Typography variant="h5">Create Note</Typography>
      <form onSubmit={createNote} autoComplete="off">
        <div className="row">
          <TextField
            color="secondary"
            label="title"
            type="text"
            value={note.title}
            id="title"
            fullWidth
            name="title"
            required
            onChange={onChangeInput}
          />
        </div>

        <div className="row">
          <TextField
            color="secondary"
            label="content"
            type="text"
            value={note.content}
            id="content"
            fullWidth
            multiline
            rows={4}
            name="content"
            required
            onChange={onChangeInput}
          />
        </div>

        <Button color="secondary" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}
