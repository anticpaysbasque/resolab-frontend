import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button
} from "@material-ui/core";

import img from "../Assets/add.png";

function PostStorie({ classes }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeImage = e => {
    setImage(e.target.files[0]);
  };

  // const handleSubmit = e => {
  //   console.log(description, image);
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("file", image);

  //   apiCallAuth
  //     .post("/media_objects", formData)
  //     .then(res => {
  //       console.log(res);
  //       return apiCallAuth.post("/posts", {
  //         description: description,
  //         photo: "http://localhost:8089" + res.data.contentUrl,
  //         likes: 0,
  //         user: `/api/users/${id}`
  //       });
  //     })
  //     .then(res => {
  //       console.log(res);
  //       return handleSnackBar("Ta publication a bien été postée");
  //     })
  //     .catch(err => console.log(err))
  //     .finally(() => handleClose());
  // };

  return (
    <div>
      <Box mx={2}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Card className={classes.storie}>
            <CardActionArea className={classes.storie} onClick={handleOpen}>
              <CardMedia className={classes.media} image={img} />
            </CardActionArea>
          </Card>
          <Typography className={classes.username}>Ta storie</Typography>
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
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box
              id="transition-modal-title"
              textAlign="center"
              p={4}
              fontSize={24}
              fontWeight="fontWeightBold"
            >
              Nouvelle storie
            </Box>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              // onSubmit={handleSubmit}
            >
              <TextField
                id="outlined-full-width"
                label="Ajouter une photo à partir de tes fichiers"
                type="file"
                style={{ margin: 18 }}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                onChange={handleChangeImage}
              />
              <Button
                // type="submit"
                style={{ margin: 18 }}
                color="secondary"
                variant="contained"
              >
                Poster
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default PostStorie;
