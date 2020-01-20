import React, { useState } from "react";
import { Grid, Box, Snackbar } from "@material-ui/core";

import Layout from "../Layout/Layout";
import PostArticle from "../commonComponent/PostArticle";
import Publications from "../commonComponent/Publications";
import DisplayStories from "../commonComponent/DisplayStories";
import { useStyles } from "../commonComponent/useStyles";
import Sidebar from "../commonComponent/Sidebar";

export default function UserPage() {
  const classes = useStyles();
  const [snackBarNotification, setSnackBarNotification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackBar = message => {
    setSnackBarNotification(true);
    setSnackbarMessage(message);
  };

  return (
    <Layout>
      <Grid container style={{ marginTop: "80px" }}>
        <Grid container item xs={2} justify="center">
          <PostArticle handleSnackBar={handleSnackBar} classes={classes} />
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
          <Sidebar classes={classes} />
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
