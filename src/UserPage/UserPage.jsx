import React from "react";

import Layout from "../Layout/Layout";
import PostArticle from "./PostArticle";
import Publication from "./Publications";
import Sidebar from "./Sidebar";

export default function UserPage() {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid container item xs={2} justify="center" alignItems="center">
          <PostArticle />
        </Grid>
        <Grid container item xs={6} justify="center">
          <Publication />
        </Grid>
        <Grid container item xs={4} justify="center">
          <Sidebar />
        </Grid>
      </Grid>
    </Layout>
  );
}
