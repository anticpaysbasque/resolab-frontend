import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import Layout from "../Layout/Layout";
import PostArticle from "./PostArticle";
import Publications from "./Publications";
import Sidebar from "./Sidebar";
import SnackBar from "./SnackBar";

export default function UserPage() {
  const [snackBarNotification, setSnackBarNotification] = useState(false);
  const [isErro, setIsErro] = useState(false);

  const handleSnackBar = () => {
    setSnackBarNotification(true);
  };

  const handleIsErro = () => {
    setIsErro(!isErro);
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid container item xs={2} justify="center">
          <PostArticle />
        </Grid>
        <Grid container item xs={6} justify="center">
          <Publications handleSnackBar={handleSnackBar} />
        </Grid>
        <Grid container item xs={4} justify="center">
          <Sidebar />
        </Grid>
      </Grid>

      <SnackBar
        open={snackBarNotification}
        setOpen={setSnackBarNotification}
        handleSnackBar={handleSnackBar}
      />
    </Layout>
  );
}
