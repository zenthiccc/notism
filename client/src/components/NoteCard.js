import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { blue, green, pink, yellow } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import { deleteNote } from "../actions/notes";
import { MONEY, TODOS, WORK } from "../constants/Categories";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category == WORK) {
        return yellow[700];
      } else if (note.category == MONEY) {
        return green[700];
      } else if (note.category == TODOS) {
        return pink[700];
      }
      return blue[700];
    },
  },
});

export default function NoteCard({ note }) {
  const classes = useStyles(note);
  const dispatch = useDispatch();

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => dispatch(deleteNote(note._id))}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
