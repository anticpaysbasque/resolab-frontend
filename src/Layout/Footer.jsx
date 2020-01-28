import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Favorite from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  footer: {
    position: "fixed",
    bottom: "0px",
    width: "100%",
    textAlign: "center",
    height: "3rem",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  },
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
      width: 800,
      display: "flex"
    }
  }
}));

function StickyFooter({ isAuth }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      {!isAuth && (
        <div>
          <CssBaseline />
          <footer className={classes.footer}>
            <Container maxWidth="sm">
              <Button onClick={handleOpenModal}>
                <Typography variant="body1" className="footer">
                  <p>
                    Made with <Favorite color="Secondary" fontSize="small" /> by
                    Wild Code School Biarritz
                  </p>
                </Typography>
              </Button>
            </Container>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleCloseModal}
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
                    <Typography>À propos de nous</Typography>
                  </Box>
                  <Box
                    id="transition-modal-title"
                    textAlign="center"
                    p={4}
                    fontSize={24}
                    fontWeight="fontWeightBold"
                    style={{
                      dispay: "flex",
                      flexDirection: "row"
                    }}
                  >
                    <Typography>1</Typography>
                    <Typography>2</Typography>
                    <Typography>3</Typography>
                  </Box>
                  <Typography>4</Typography>
                  <Typography>5</Typography>
                </div>
              </Fade>
            </Modal>
          </footer>
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth
  };
};

export default connect(mapStateToProps)(StickyFooter);

// <Link
//     color="inherit"
//     href="https://www.wildcodeschool.com/fr-FR/campus/biarritz"
// >
// </Link>
