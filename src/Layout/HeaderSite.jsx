import React from "react";
import Grid from "@material-ui/core/Grid";

import logo from "../Assets/resolab-simple-white.png";
import { Typography } from "@material-ui/core";

export default function HeaderSite() {
  return (
    <Grid item xs={9}>
      <img
        src={logo}
        width="170px"
        alt="RésoLab-logo"
        style={{ padding: "2px" }}
      />
      <h1
        style={{
          fontSize: "12px",
          marginTop: "-2px",
          padding: "2px",
          fontFamily: "Roboto"
        }}
      >
        Le réseau social pour expérimenter
      </h1>
    </Grid>
  );
}
