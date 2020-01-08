import React from "react";

import { Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";

import img from "../Assets/logo-resolab.png";

function Storie({ classes }) {
  return (
    <>
      <Card className={classes.storie}>
        <CardActionArea className={classes.storie}>
          <CardMedia className={classes.media} image={img} />
        </CardActionArea>
      </Card>
      <Typography>username</Typography>
    </>
  );
}

export default Storie;
