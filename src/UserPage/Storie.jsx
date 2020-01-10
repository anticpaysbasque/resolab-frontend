import React from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Box
} from "@material-ui/core";

function Storie({ classes, username, image }) {
  return (
    <Box mx={2}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className={classes.storie}>
          <CardActionArea className={classes.storie}>
            <CardMedia className={classes.media} image={image} />
          </CardActionArea>
        </Card>
        <Typography className={classes.username}>{username}</Typography>
      </Grid>
    </Box>
  );
}

export default Storie;
