import React, { useState } from "react";
import { Grid, Box, Snackbar } from "@material-ui/core";

import Layout from "../Layout/Layout";
import PostArticle from "./PostArticle";
import Publications from "./Publications";
import Notifications from "./Notifications";
import DisplayStories from "./DisplayStories";
import PostStorie from "./PostStorie";
import UserInfo from "./UserInfo";
import { useStyles } from "./useStyles";

export default function UserPage() {
  const classes = useStyles();
  const [snackBarNotification, setSnackBarNotification] = useState(false);
  // const [isErro, setIsErro] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackBar = message => {
    setSnackBarNotification(true);
    setSnackbarMessage(message);
  };

  // const handleIsErro = () => {
  //   setIsErro(!isErro);
  // };

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
            <UserInfo />
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
