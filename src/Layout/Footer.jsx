import React from "react";

import { Paper, Grid, Typography, Link } from "@material-ui/core";
//import { makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import "./Footer.css";

export default function Footer() {
  return (
    <Paper square={true}>
      <Grid container className="ripple">
        <Grid item xs={12}>
          <Typography color="textPrimary">
            <Link href="#" underline="none" color="inherit" className="link">
              Made with <Favorite color="secondary" /> by Wild Code School
              Biarritz
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
