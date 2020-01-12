import React, { useState } from "react";

import { PermIdentity } from "@material-ui/icons";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  Avatar,
  Typography,
  Grid,
  Box,
  Modal,
  Backdrop,
  Fade
} from "@material-ui/core";

function Storie({ classes, username, image }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box mx={2}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Card className={classes.storie}>
            <CardActionArea className={classes.storie} onClick={handleOpen}>
              <CardMedia className={classes.media} image={image} />
            </CardActionArea>
          </Card>
          <Typography className={classes.username}>{username}</Typography>
        </Grid>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        transition-modal-title
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Card className={classes.card} style={{ width: "50vw" }}>
              <div className="scroll-post">
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <PermIdentity />
                    </Avatar>
                  }
                  title={
                    <Typography className={classes.username}>
                      {username}
                    </Typography>
                  }
                />
                <CardMedia className={classes.media} image={image} />
              </div>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Storie;
