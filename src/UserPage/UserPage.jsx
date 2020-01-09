import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";

import Layout from "../Layout/Layout";
import PostArticle from "./PostArticle";
import Publications from "./Publications";
import Sidebar from "./Sidebar";
import SnackBar from "./SnackBar";
import DisplayStories from "./DisplayStories";
import PostStorie from "./PostStorie";
import { useStyles } from "./useStyles";

export default function UserPage() {
  const classes = useStyles();
  const [snackBarNotification, setSnackBarNotification] = useState(false);
  const [isErro, setIsErro] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackBar = message => {
    setSnackBarNotification(true);
    setSnackbarMessage(message);
  };

  const handleIsErro = () => {
    setIsErro(!isErro);
  };

  return (
    <Layout>
      <Box mt={15}>
        <Grid container spacing={3} direction="row" alignItems="center">
          <Grid container item xs={2} justify="center">
            <PostStorie classes={classes} handleSnackBar={handleSnackBar} />
          </Grid>
          <Grid container item xs={9} justify="center">
            <DisplayStories classes={classes} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        <Grid container item xs={2} justify="center">
          <PostArticle handleSnackBar={handleSnackBar} />
        </Grid>
        <Grid container item xs={6} justify="center">
          <Publications handleSnackBar={handleSnackBar} />
        </Grid>
        <Grid container item xs={3} justify="center">
          <Sidebar />
        </Grid>
      </Grid>

      <SnackBar
        open={snackBarNotification}
        setOpen={setSnackBarNotification}
        handleSnackBar={handleSnackBar}
        message={snackbarMessage}
      />
    </Layout>
  );
}
