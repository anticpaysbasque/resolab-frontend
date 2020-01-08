import React from "react";

import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography
} from "@material-ui/core";

import img from "../Assets/add.png";

function PostStorie({ classes }) {
  return (
    <Box mx={2}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className={classes.storie}>
          <CardActionArea className={classes.storie}>
            <CardMedia className={classes.media} image={img} />
          </CardActionArea>
        </Card>
        <Typography className={classes.username}>Ta storie</Typography>
      </Grid>
    </Box>
  );
}

export default PostStorie;
