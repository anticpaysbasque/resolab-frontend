import React, { useState, useEffect } from "react";

import { Box, Grid } from "@material-ui/core";

import Storie from "./Storie";
import { useStyles } from "./useStyles";

function DisplayStories() {
  const classes = useStyles();

  // useEffect(() => {
  //     const fetchDatas = async () => {
  //       const res = await apiCallAuth.get("/posts");
  //       setPublications(res.data);
  //       setTimeout(() => {
  //         fetchDatas();
  //       }, 10000);
  //     };
  //     fetchDatas();
  //   }, []);

  return (
    // <Box mt={13}>
    <Grid container direction="row" alignItems="center">
      {/** Faire un map pour afficher les stories **/}
      <Grid>
        <Storie classes={classes} />
      </Grid>
      <Grid>
        <Storie classes={classes} />
      </Grid>
      <Grid>
        <Storie classes={classes} />
      </Grid>
    </Grid>
    // </Box>
  );
}

export default DisplayStories;
