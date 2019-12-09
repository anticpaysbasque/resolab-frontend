import React from "react";
import Grid from "@material-ui/core/Grid";

import logo from "../Assets/pictae.png";
import { Typography } from "@material-ui/core";

export default function HeaderSite() {
  return (
    <>
      <Grid
        container
        item
        spacing={2}
        justify="space-evenly"
        direction="row"
        alignItems="center"
      >
        <Grid item xs={2}>
          <img src={logo} width="50" spacing={2} justify="center" />
        </Grid>
        <Grid item xs={10} flex-direction="flex-start">
          <Typography>
            <h1>Résolab</h1>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
