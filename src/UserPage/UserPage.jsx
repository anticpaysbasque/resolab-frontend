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
      <Grid container style={{ marginTop: "80px" }} spacing={3}>
        <Grid container item xs={2} justify="center">
          <PostArticle handleSnackBar={handleSnackBar} />
        </Grid>
        <Grid container item xs={6} xl={6} justify="center">
          <Box p={5} width="100%">
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                height: "150px",
                overflowX: "auto",
                overflowY: "visible"
              }}
            >
              <DisplayStories
                noWrap
                classes={classes}
                handleSnackBar={handleSnackBar}
              />
            </Box>
          </Box>
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
