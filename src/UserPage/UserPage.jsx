import React from "react";
import Grid from "@material-ui/core/Grid";

import Layout from "../Layout/Layout";
import PostArticle from "./PostArticle";
import Card from "./Card";

import Sidebar from "./Sidebar";

export default function UserPage() {
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
    </Layout>
  );
}
