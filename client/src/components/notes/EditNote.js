import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function EditNote({ match }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    id: "",
  });
  const history = useHistory();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (match.params.id) {
        const res = await axios.get(`/api/notes/${match.params.id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [match.params.id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, id } = note;
        const newNote = {
          title,
          content,
        };

        await axios.put(`/api/notes/${id}`, newNote, {
          headers: { Authorization: token },
        });

        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create-note">
      <Typography variant="h5">Edit Note</Typography>
      <form onSubmit={editNote} autoComplete="off">
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
          Save
        </Button>
      </form>
    </div>
  );
}
