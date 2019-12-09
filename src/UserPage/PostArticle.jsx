import React, { useState } from "react";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

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

export default function PostArticle() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeImage = e => {
    setImage(e.target.value);
  };

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    axios.post("", {}).then();
    alert("Submit OK");
  };

  return (
    <div>
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
                value={image}
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
