import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Loader({ isLoading }) {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        {isLoading ? <CircularProgress color="secondary" /> : <></>}
      </Grid>
    </Grid>
  );
}

export default Loader;
