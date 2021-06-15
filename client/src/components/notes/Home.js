import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Masonry from "react-masonry-css";
import IconButton from "@material-ui/core/IconButton";
import { DeleteOutlined } from "@material-ui/icons";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };
  const breakpoints = {
    default: 4,
    1100: 3,
    900: 2,
    700: 1,
  };
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <Card className="card" key={note._id}>
            <Typography variant="h6" title={note.title}>
              {note.title}
            </Typography>
            <Typography variant="body2">{note.content}</Typography>
            <div className="card-footer">
              {note.name}
              <Link to={`edit/${note._id}`}>Edit</Link>
            </div>
            <IconButton
              color="secondary"
              className="close"
              onClick={() => deleteNote(note._id)}
            >
              <DeleteOutlined />
            </IconButton>
          </Card>
        ))}
      </Masonry>
    </Container>
  );
}
