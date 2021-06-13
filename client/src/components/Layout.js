import React from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    toolbar: theme.mixins.toolbar,
  };
});

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer></Drawer>
      <div className={classes.page}>
        {" "}
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
