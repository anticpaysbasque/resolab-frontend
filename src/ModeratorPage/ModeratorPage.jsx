import React, { useState } from "react";
import { Box, Grid, Snackbar } from "@material-ui/core";

import Layout from "../Layout/Layout";
import PostArticle from "../commonComponent/PostArticle";
import Publications from "../commonComponent/Publications";
import Notifications from "../commonComponent/Notifications";
import DisplayStories from "../commonComponent/DisplayStories";
import PostStorie from "../commonComponent/PostStorie";
import { useStyles } from "../commonComponent/useStyles";
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
