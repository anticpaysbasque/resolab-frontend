import React, { useState } from "react";
import { Box, Grid, Snackbar } from "@material-ui/core";

import { useStyles } from "../UserPage/useStyles";
import PostStorie from "../UserPage/PostStorie";
import Layout from "../Layout/Layout";
import DisplayStories from "../UserPage/DisplayStories";
import PostArticle from "../UserPage/PostArticle";
import Publications from "../UserPage/Publications";
import Notifications from "../UserPage/Notifications";
import ModeratorInfo from "./ModeratorInfos";

export default function ModeratorPage() {
  const classes = useStyles();
  const [snackBarNotification, setSnackBarNotification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackBar = message => {
    setSnackBarNotification(true);
    setSnackbarMessage(message);
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
        <Grid container item xs={6} xl={6} justify="center">
          <Publications handleSnackBar={handleSnackBar} />
        </Grid>
        <Grid container item xs={3} xl={3} justify="center">
          <Notifications>
            <ModeratorInfo />
          </Notifications>
        </Grid>
      </Grid>
      <Snackbar
        open={snackBarNotification}
        setOpen={setSnackBarNotification}
        handleSnackBar={handleSnackBar}
        message={snackbarMessage}
      />
    </Layout>
  );
}
