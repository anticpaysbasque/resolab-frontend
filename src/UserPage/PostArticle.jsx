import React, { useState } from "react";
import { connect } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import apiCallAuth from "../apiCallAuth";
import "../Layout/Scroll.css";
import "./UploadPicture";
import UploadImage from "./UploadPicture";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 600,
      display: "flex"
    }
  }
}));

const mapStateToProps = state => ({
  id: state.userReducer.id
});

function PostArticle({ id, token, handleSnackBar }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeImage = e => {
    setImage(e.target.files[0]);
  };

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = e => {
    console.log(description, image);
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

    apiCallAuth
      .post("/media_objects", formData)
      .then(res => {
        console.log(res);
        return apiCallAuth.post("/posts", {
          description: description,
          photo: "http://localhost:8089" + res.data.contentUrl,
          likes: 0,
          user: `/api/users/${id}`
        });
      })
      .then(res => {
        console.log(res);
        return handleSnackBar("Ta publication a bien été postée");
      })
      .catch(err => console.log(err))
      .finally(() => handleClose());
  };

  return (
    <div className="scroll-add-content">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Button>
          <AddCircleOutlineIcon style={{ fontSize: 80 }} onClick={handleOpen} />
        </Button>
        <p>Ajouter une nouvelle photo</p>
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
              Nouvelle publication
            </Box>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="outlined-full-width"
                label="Ajouter une photo"
                type="file"
                style={{ margin: 18 }}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                onChange={handleChangeImage}
              />
              <TextField
                id="outlined-full-width"
                label="Description"
                style={{ margin: 18 }}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                multiline
                rows="4"
                variant="outlined"
                value={description}
                onChange={handleChangeDescription}
              />
              <Button
                type="submit"
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

export default connect(mapStateToProps)(PostArticle);
