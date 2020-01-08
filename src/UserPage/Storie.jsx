import React from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Box
} from "@material-ui/core";

import img from "../Assets/logo-resolab.png";

function Storie({ classes }) {
  return (
    <Box mx={2}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className={classes.storie}>
          <CardActionArea className={classes.storie}>
            <CardMedia className={classes.media} image={img} />
          </CardActionArea>
        </Card>
        <Typography className={classes.username}>username</Typography>
      </Grid>
    </Box>
  );
}

export default Storie;
