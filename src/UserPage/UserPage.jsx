import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Layout from "../Layout/Layout";
import PostArticle from "./PostArticle";
import Card from "./Card";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(theme => ({}));

export default function UserPage() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid container item xs={2}>
          <PostArticle />
        </Grid>
        <Grid container item xs={6}>
          <Card />
        </Grid>
        <Grid container item xs={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </Layout>
  );
}
