import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import Layout from "../Layout/Layout";
import PostArticle from "./PostArticle";
import Card from "./Card";
import SnackBar from "./SnackBar";
import Sidebar from "./Sidebar";

export default function UserPage() {
  const [snackBarNotification, setSnackBarNotification] = useState(false);

  const handleSnackBar = () => {
    setSnackBarNotification(true);
  };
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid container item xs={2} justify="center" alignItems="center">
          <PostArticle />
        </Grid>
        <Grid container item xs={6} justify="center">
          <Card />
        </Grid>
        <Grid container item xs={4} justify="center">
          <Sidebar />
        </Grid>
      </Grid>
      <SnackBar postSuccess={handleSnackBar} />
    </Layout>
  );
}
