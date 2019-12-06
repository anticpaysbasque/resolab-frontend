import React from "react";
import { Settings, ExitToApp } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";

export default function HeaderIcons() {
  return (
    <>
      <Grid
        container
        spacing={5}
        direction="row"
        justify="space-around"
        align-items="baseline"
      >
        <Settings color="default" />
        <ExitToApp color="default" />
      </Grid>
    </>
  );
}