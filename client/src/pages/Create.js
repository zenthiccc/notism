import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { FormControlLabel, makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { createNote } from "../actions/notes";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const [noteData, setNoteData] = useState({
    title: "",
    details: "",
    category: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    setCategoryError(false);

    if (noteData.title === "") {
      setTitleError(true);
    }

    if (noteData.details === "") {
      setDetailsError(true);
    }

    if (noteData.category === "") {
      setCategoryError(true);
    }
    if (noteData.title && noteData.details && noteData.category) {
      dispatch(createNote(noteData)).then(() => history.push("/notes"));
    }
  };
  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        ></TextField>
        <TextField
          onChange={(e) =>
            setNoteData({ ...noteData, details: e.target.value })
          }
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          rows={4}
          required
          error={detailsError}
        ></TextField>

        <FormControl className={classes.field} required error={categoryError}>
          <FormLabel color="secondary"> Note Category </FormLabel>
          <RadioGroup
            value={noteData.category}
            onChange={(e) =>
              setNoteData({ ...noteData, category: e.target.value })
            }
          >
            <FormControlLabel value="Money" control={<Radio />} label="Money" />
            <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="Reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="Work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
